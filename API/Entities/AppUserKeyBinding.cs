using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text.Json;
using API.Constants;

namespace API.Entities;

public class AppUserKeyBinding
{
    public enum _readerType;
    public char Next;
    public char Previous;
    public char Close;
    public char ToggleMenu;
    public char GoToPage;
    public char Fullscreen;
}
