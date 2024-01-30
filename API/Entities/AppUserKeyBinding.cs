using System.Collections.Immutable;
using System.Collections.Generic;
using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using Kavita.Common;
using API.Constants.ReaderTypeActionSet;

namespace API.Entities;

public class AppUserKeyBinding
{
    public int Id { get; set; }
    public AppUser AppUser { get; set; }
    public int AppUserId { get; set; }
    public required ReaderType Type { get; set; }

    [KeyBindingUniqueKey]
    [KeyBindingTypeAction]
    public Dictionary<ReaderAction, string> Bindings { get; } //TODO: This fucking variable name

    private ImmutableList<ReaderAction> getActionListForType()
    {
        switch(this.Type)
        {
            case ReaderType.Book:
                return ReaderTypeActionSet.BookActions;
                break;
            case ReaderType.Manga:
                return ReaderTypeActionSet.MangaActions;
                break;
            case ReaderType.Pdf:
                return ReaderTypeActionSet.PdfActions;
                break;
            default:
                // Throw new exception
                break;
        }
        return ImmutableList.Create(new ReaderAction[] {});
    }
}
