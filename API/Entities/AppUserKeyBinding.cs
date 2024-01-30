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
}
