using System.ComponentModel;

namespace API.Entities.Enums.KeyBindings;

public enum ReaderType
{
    [Description("Book")]
    Book,
    [Description("Manga")]
    Manga,
    [Description("Pdf")]
    Pdf
}
