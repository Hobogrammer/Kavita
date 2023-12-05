using System.Collections.Immutable;
using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using Kavita.Common;
using API.Entities.Enums;

namespace API.Entities;

public class AppUserKeyBinding
{
    public int Id { get; set; }
    public AppUser AppUser { get; set; }
    public int AppUserId { get; set; }
    public required ReaderType Type { get; set; }

    public string Next { get; set; }
    public string Previous { get; set; }
    public string Close { get; set; }
    public string ToggleMenu { get; set; }
    public string GoToPage { get; set; }
    public string FullScreen { get; set; }
    public ImmutableList<ReaderAction> ApplicableActionList { get; }

    private ImmutableList<ReaderAction> getActionListForType()
    {
        switch(this.Type)
        {
            case ReaderType.Book:
            case ReaderType.Manga:
                return ImmutableList.Create(new ReaderAction[] { ReaderAction.NextPage, ReaderAction.PreviousPage, ReaderAction.Close,
                ReaderAction.ToggleMenu, ReaderAction.GoToPage, ReaderAction.FullScreen });
                break;
            case ReaderType.Pdf:
                return ImmutableList.Create(new ReaderAction[] { ReaderAction.Close });
                break;
        }
        return ImmutableList.Create(new ReaderAction[] {});
    }
}
