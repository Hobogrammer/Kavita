using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text.Json;
using API.Constants;

namespace API.Entities;

public class AppUserBookReaderKeyBinding
{
    // Initialize the hashset with the default key shortcuts
    public HashSet<string, string> set = new HashSet<string, string>()
    {
        { "ArrowRight" , BookReaderActions.Forward},
        { "ArrowLeft" , BookReaderActions.Backward},
        { "Escape" , BookReaderActions.Close},
        { " " , BookReaderActions.ToggleMenu},
        { "g" , BookReaderActions.GoToPage},
        { "f" , BookReaderActions.Fullscreen}
    };

    public override string ToString() => JsonSerializer.Serialize(set);
    
    public void UpdateShortcut(string KeyCode, string Action)
    {
        if (set.TryGetValue(KeyCode)) {
            set.Remove(KeyCode);
            set.Add(KeyValuePair<KeyCode, Action>);
        } else {
            set.Add(KeyValuePair<KeyCode, Action>);
        }
    }
}
