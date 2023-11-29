using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.ComponentModel;
using API.Constants;
using Microsoft.EntityFrameworkCore;

namespace API.Entities;

public enum ReaderType
{
    Book,
    Manga,
    Pdf
}

public class AppUserKeyBinding
{
    private const string NextPageAction = "NextPage";
    private const string PreviousPageAction = "PrevPage";
    private const string CloseAction = "Close";
    private const string ToggleMenuAction = "ToggleMenu";
    private const string GoToPageAction = "GoToPage";
    private const string FullscreenAction = "Fullscreen";

    public ImmutableArray<string> BookReaderActionList =  ImmutableArray
        .Create(new string[] {
                NextPageAction,
                PreviousPageAction,
                CloseAction,
                ToggleMenuAction, 
                GoToPageAction, 
                FullscreenAction });
    public ImmutableArray<string> MangaReaderActionList = ImmutableArray
        .Create(new string[] {
                NextPageAction,
                PreviousPageAction,
                CloseAction,
                ToggleMenuAction, 
                GoToPageAction, 
                FullscreenAction });
    public ImmutableArray<string> PdfReaderActionList = ImmutableArray.Create(new string[] { CloseAction });

    public int Id { get; set; }
    public required int ReaderType { get; set; }

    public string Next { get; set; }
    public string Previous { get; set; }
    public string Close { get; set; }
    public string ToggleMenu { get; set; }
    public string GoToPage { get; set; }
    public string Fullscreen { get; set; }
}
