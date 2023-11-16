using System.ComponentModel;

namespace API.Entities.Enums;

public enum ReaderActions
{
    [Description("Go forward in reader")]
    Forward = 0,
    [Description("Go backward in reader")]
    Backward = 1,
    [Description("Go close reader")]
    Close = 2,
    [Description("Toggle settings menu in reader")]
    ToggleMenu = 3,
    [Description("Jump to page in reader")]
    GoToPage = 4,
    [Description("Toggle fullscreen in reader")]
    Fullscreen = 5
}
