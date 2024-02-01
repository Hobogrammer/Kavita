using System.Collections.Immutable;
using API.Entities.Enums;

namespace API.Constants;

public static class ReaderTypeActionSet
{
    /// <summary>
    /// Actions available to the Epub reader
    /// </summary>
    public const ImmutableHashSet<ReaderAction> BookActions = ImmutableHashSet.Create(new ReaderAction[] {
            ReaderAction.NextPage, 
            ReaderAction.PreviousPage,
            ReaderAction.Close,
            ReaderAction.ToggleMenu,
            ReaderAction.GoToPage,
            ReaderAction.FullScreen
    });

    /// <summary>
    /// Actions available to the manga reader
    /// </summary>
    public const ImmutableHashSet<ReaderAction> MangaActions = ImmutableHashSet.Create(new ReaderAction[] {
            ReaderAction.NextPage, 
            ReaderAction.PreviousPage,
            ReaderAction.Close,
            ReaderAction.ToggleMenu,
            ReaderAction.GoToPage,
            ReaderAction.FullScreen
    });

    /// <summary>
    /// Actions available to the Pdf reader
    /// </summary>
    public const ImmutableHashSet<ReaderAction> PdfActions = ImmutableHashSet.Create(new ReaderAction[] {
            ReaderAction.Close
    });
}
