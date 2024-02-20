using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using API.Constants;
using Microsoft.EntityFrameworkCore;
using API.Entities.Enums;

namespace API.DTOs;
#nullable enable

public class KeyBindingDto
{
    public Dictionary<ReaderAction, string> Bindings { get; set; }

    [Required]
    public string Type { get; set; }
}
