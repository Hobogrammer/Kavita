using System;

namespace API.Entities;

public class Shortcut
{
    public int Id { get; set; }
    /// <summary>
    /// The key button pressed
    /// </summary>
    public required string KeyCode { get; set; }
    /// <summary>
    /// The action the key press should activate
    /// </summary>
    public required string Action { get; set; }
    /// <summary>
    /// The reader the shortcut is for
    /// Book | Manga
    /// </summary>
    public required string Reader { get; set; }
    public require userId { get; set; } 
    public DateTime Created { get; set; }
    public DateTime LastModified { get; set; }
    public DateTime CreatedUtc { get; set; }
    public DateTime LastModifiedUtc { get; set; }
}
