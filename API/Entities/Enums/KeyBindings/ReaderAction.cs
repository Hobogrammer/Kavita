using System.ComponentModel;

namespace API.Entities.Enums;

public enum ReaderAction
{
    [Description("NextPage")]
    NextPage,
    [Description("PreviousPage")]
    PreviousPage,
    [Description("Close")]
    Close,
    [Description("ToggleMenu")]
    ToggleMenu,
    [Description("GoToPage")]
    GoToPage,
    [Description("FullScreen")]
    FullScreen
}
