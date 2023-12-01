using System.Collections.Immutable;
using System.ComponentModel;
using API.Constants;
using API.Entities;
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
    private const string FullScreenAction = "FullScreen";

    public int Id { get; set; }
    public AppUser AppUser { get; set; }
    public int AppUserId { get; set; }
    public required int Type { get; set; }

    public string Next { get; set; }
    public string Previous { get; set; }
    public string Close { get; set; }
    public string ToggleMenu { get; set; }
    public string GoToPage { get; set; }
    public string FullScreen { get; set; }
    public ImmutableArray<string> ApplicableActionList { get; }

    public AppUserKeyBinding(int type)
    {
        Type = type;
        ApplicableActionList = getActionListForType();
    }

    private ImmutableArray<string> getActionListForType()
    {
        switch(this.Type)
        {
            case ReaderType.Book:
            case ReaderType.Manga:
                return ImmutableArray.Create(new string[] { NextPageAction, PreviousPageAction, CloseAction,
                ToggleMenuAction, GoToPageAction, FullScreenAction });
                break;

            case ReaderType.Pdf:
                return ImmutableArray.Create(new string[] { CloseAction });
                break;
            default:
                // Unrecognized reader type
                break;
        }
    }
}
