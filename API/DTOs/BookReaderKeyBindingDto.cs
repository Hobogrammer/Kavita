using System;

namespace API.DTOs;

public class BookReaderKeyBindingDto
{
    public int Id { get; init; }
    public DateTime CreatedUtc { get; set; }
    public DateTime Created { get; set; }
    public DateTime LastModifiedUtc { get; set; }
    public string Close { get; set; }
    public string FullScreen { get; set; }
    public string GoToPage { get; set; }
    public string Previous { get; set; }
    public string Next { get; set; }
    public string ToggleMenu { get; set; }
}
