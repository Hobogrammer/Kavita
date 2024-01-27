using System.Dynamic;
using System.Collections.Immutable;
using System.Collections.Generic;
using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using Kavita.Common;
using API.Entities.Enums;

namespace API.Entities;

public class AppUserKeyBinding : DynamicObject
{
    private HashSet<ReaderAction> UsedActions { get; } // Probably don't need this here. Maybe front end
    private HashSet<string> UsedKeys { get; } // ditto maybe here for validations?

    public int Id { get; set; }
    public AppUser AppUser { get; set; }
    public int AppUserId { get; set; }
    public required ReaderType Type { get; set; }
    public Dictionary<ReaderAction, string> Bindings { get; } //TODO: This fucking variable name

    public ImmutableList<ReaderAction> ApplicableActionList { get; }

    public AppUserKeyBinding(ReaderType readerType)
    {
        Type = readerType;
        ApplicableActionList = getActionListForType();
    }

    public void Add(ReaderAction action, string key)
    {
        // Check if ReaderAction is valid for ReaderType
        if (ApplicableActionList.Exists(action)
        {
            Bindings.Add(action, key);
        }
        else
        {
        // Throw invalid action exception
        }
    }

    public List<ReaderAction> Values()
    {

    }

    public List<string> Keys()
    {

    }

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
            default:
                // Throw new exception
                break;
        }
        return ImmutableList.Create(new ReaderAction[] {});
    }
}
