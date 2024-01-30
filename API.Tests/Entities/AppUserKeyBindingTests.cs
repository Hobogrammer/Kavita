using System.Collections.Immutable;
using API.Constants.ReaderTypeActionSet;
using Xunit;

namespace API.Tests.Entities;

public class AppUserKeybBindingTests
{
    [Theory]
    [InlineData(ReaderType.Manga, ReaderTypeActionSet.MangaActions )]
    [InlineData(ReaderType.Book, ReaderTypeActionSet.BookActions )]
    [InlineData(ReaderType.Pdf, ReaderTypeActionSet.PdfActions )]
    public void getActionListForType_ShouldReturnExpectedActionList(ReaderType readerType, ImmutableList expectedActionList)
    {
        keyBinding = new AppUserKeyBinding(readerType);
        Assert.Equal(keyBinding.ApplicableActionList, expectedActionList);
    }
}
