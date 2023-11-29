using System.ComponentModel.DataAnnotations;
using API.Constants;
using Microsoft.EntityFrameworkCore;

namespace API.DTOs;
#nullable enable

public class KeyBindingDto
{
    public string? Close { get; set; }
    public string? FullScreen { get; set; }
    public string? GoToPage { get; set; }
    public string? Previous { get; set; }
    public string? Next { get; set; }
    public string? ToggleMenu { get; set; }

    [Required]
    public string ReaderType { get; set; }
}
