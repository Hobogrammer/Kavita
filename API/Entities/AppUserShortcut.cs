using System;

namespace API.Entities;

public class AppUserShortcut
{
    public int Id { get; set; }
    /// <summary>
    /// Seralized JSON map of keycodes and their action
    /// <KeyCode, Action>
    /// </summary>
    public required string KeyActionSet { get; set; }
    /// <summary>
    /// The reader type the shortcut is for
    /// Book | Manga
    /// </summary>
    public required string ReaderType { get; set; }
    public required int AppUserId { get; set; } 
    public DateTime Created { get; set; }
    public DateTime LastModified { get; set; }
    public DateTime CreatedUtc { get; set; }
    public DateTime LastModifiedUtc { get; set; }
}
