using System.Collections.Immutable;
using System.Collections.Generic;
using System.ComponentModel;
using Microsoft.EntityFrameworkCore;
using Kavita.Common;
using API.Constants.ReaderTypeActionSet;
using API.Validators;

namespace API.Entities;

public class AppUserKeyBinding
{
    public int Id { get; set; }
    public AppUser AppUser { get; set; }
    public int AppUserId { get; set; }
    [Required]
    public ReaderType Type { get; set; }

    [UniqueKeys]
    [ValidReaderActions]
    public Dictionary<ReaderAction, string> Bindings { get; } //TODO: This fucking variable name
}
