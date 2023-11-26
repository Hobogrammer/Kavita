using System;
using API.Constants;

namespace API.DTOs;

public class KeyBindingDto
{
    public char? Close { get; set; }
    public char? FullScreen { get; set; }
    public char? GoToPage { get; set; }
    public char? Previous { get; set; }
    public char? Next { get; set; }
    public char? ToggleMenu { get; set; }

    [required]
    public string ReaderType { get; set; }
}
