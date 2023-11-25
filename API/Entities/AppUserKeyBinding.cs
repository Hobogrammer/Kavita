using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text.Json;
using API.Constants;

namespace API.Entities;

public class AppUserKeyBinding
{
    public string _readerType;
    public string Next;
    public string Previous;
    public string Close;
    public string ToggleMenu;
    public string GoToPage;
    public string Fullscreen;
   
    public AppUserKeyBinding(string readerType)
    {
        // Probably the incorrect syntax
        if(ReaderType[readerType] != null)
        {
            _readerType = readerType;
        }
        else
        {
            throw new; // Bad request exception prease
        }
    }

    public void mapActionKey(string actionString, string keyCode)
    {
        if (isValidActionForReader(actionString))
        {
            // handle setting keymap
        }

    }

    public bool isValidActionForReader(string actionString)
    {
      switch(_readerType)
      {
          case ReaderType.Book
              return ReaderConstants.BookReaderActionList.include(actionString);
              break;
          case ReaderType.Manga
              return ReaderConstants.MangaReaderActionList.include(actionString);
          case ReaderType.Pdf
              return ReaderConstants.PdfReaderActionList.include(actionString);
      }

      return false;
    }
}
