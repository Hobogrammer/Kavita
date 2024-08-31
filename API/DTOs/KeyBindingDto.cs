using API.Entities.Enums.KeyBindings;

namespace API.DTOs;
#nullable enable

public class KeyBindingDto
{
    public int AppUserId { get; set; }
    public required ReaderType Type { get; set; }
    public string? NextPage { get; set; }
    public string? PreviousPage { get; set; }
    public string? Close { get; set; }
    public string? ToggleMenu { get; set; }
    public string? GoToPage { get; set; }
    public string? FullScreen { get; set; }
}
