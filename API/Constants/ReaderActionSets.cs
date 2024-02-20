using System.Collections.Immutable;
using API.Entities.Enums;

namespace API.Constants;

public static class ReaderTypeActionSet
{
    /// <summary>
    /// Actions available to the Epub reader
    /// </summary>
    public static readonly ImmutableHashSet<ReaderAction> BookActions = ImmutableHashSet.Create(new ReaderAction[] {
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
    public static readonly ImmutableHashSet<ReaderAction> MangaActions = ImmutableHashSet.Create(new ReaderAction[] {
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
    public static readonly ImmutableHashSet<ReaderAction> PdfActions = ImmutableHashSet.Create(new ReaderAction[] {
            ReaderAction.Close
    });
}
