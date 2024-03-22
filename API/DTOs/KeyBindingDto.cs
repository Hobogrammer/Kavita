using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using API.Entities.Enums.KeyBindings;
using System.Text.Json;

namespace API.DTOs;
#nullable enable

public class KeyBindingDto
{
    public int AppUserId { get; set; }
    public required ReaderType Type { get; set; }
    public int NextPage { get; set; }
    public int PreviousPage { get; set; }
    public int Close { get; set; }
    public int ToggleMenu { get; set; }
    public int GoToPage { get; set; }
    public int FullScreen { get; set; }
}
