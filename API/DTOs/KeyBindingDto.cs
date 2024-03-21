using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using API.Entities.Enums.KeyBindings;
using System.Text.Json;

namespace API.DTOs;
#nullable enable

public class KeyBindingDto
{
    public Dictionary<int, string>? Bindings { get; set; }

    [Required]
    public ReaderType Type { get; set; }

    public KeyBindingDto(ReaderType type, string keyActionJson)
    {
        Type = type;
        Bindings = JsonSerializer.Deserialize<Dictionary<int, string>>(keyActionJson);
    }

    // Probably need to add the other fields (nextpage etc) and move the Jsonstring method here from the entity. 
    // feels like that be sending extra data over the wire but the mapper seems to require it
}
