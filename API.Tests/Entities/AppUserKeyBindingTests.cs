using System.Collections.Immutable;
using API.Entities.Enums;
using Xunit;

namespace API.Tests.Entities;

public class AppUserKeybBindingTests
{
    private ImmutableList<ReaderAction> ExpectedBookAndMangaActions = ImmutableList.Create(new ReaderAction[] { ReaderAction.NextPage, ReaderAction.PreviousPage, ReaderAction.Close,ReaderAction.ToggleMenu, ReaderAction.GoToPage, ReaderAction.FullScreen });

    [Theory]
    [InlineData(ReaderType.Manga, ExpectedBookAndMangaActions)]
    [InlineData(ReaderType.Book, ExpectedBookAndMangaActions)]
    [InlineData(ReaderType.Pdf, ImmutableList.Create(new ReaderAction[] { ReaderAction.Close }))]
    public void getActionListForType_ShouldReturnExpectedActionList(ReaderType readerType, ImmutableList expectedActionList)
    {
        keyBinding = new AppUserKeyBinding(readerType);
        Assert.Equal(keyBinding.ApplicableActionList, expectedActionList);
    }
}
