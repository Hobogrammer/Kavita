using System.ComponentModel;

namespace API.Entities.Enums;

public enum ReaderType
{
    [Description("Book")]
    Book,
    [Description("Manga")]
    Manga,
    [Description("Pdf")]
    Pdf
}
