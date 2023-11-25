using System;
using System.Collections.Generic;

namespace API.Constants;

public enum ReaderType
{
    Book,
    Manga,
    Pdf
}

public static class ReaderConstants
{
    public const string NextPage = "NextPage";
    public const string PreviousPage = "PrevPage";
    public const string Close = "Close";
    public const string ToggleMenu = "ToggleMenu";
    public const string GoToPage = "GoToPage";
    public const string Fullscreen = "Fullscreen";

    public List<string> BookReaderActionList =[NextPage, PreviousPage, Close, ToggleMenu, GoToPage, Fullscreen];
    public List<string> MangaReaderActionList = [NextPage, PreviousPage, Close, ToggleMenu, GoToPage, Fullscreen];
    public List<string> PdfReaderActionList = [Close];
}
