using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using API.Entities.Enums.KeyBindings;

namespace API.DTOs;
#nullable enable

public class KeyBindingDto
{
    public Dictionary<string, string> Bindings { get; set; }

    [Required]
    public ReaderType Type { get; set; }
}
