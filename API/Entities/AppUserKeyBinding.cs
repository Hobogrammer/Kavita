using System.Collections.Generic;
using System.Collections.Immutable;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json;
using API.Constants;
using API.Entities.Enums.KeyBindings;

namespace API.Entities;

public class AppUserKeyBinding : IValidatableObject
{
    public int Id { get; set; }
    public AppUser AppUser { get; set; }
    public int AppUserId { get; set; }
    public required ReaderType Type { get; set; }

    public int NextPage { get; set; }
    public int PreviousPage { get; set; }
    public int Close { get; set; }
    public int ToggleMenu { get; set; }
    public int GoToPage { get; set; }
    public int FullScreen { get; set; }

    // Convert action fields and values to shortcut key action pair for front end use
    public string ToKeyActionJson()
    {
        Dictionary<int, string> keyActionMap = new Dictionary<int, string>();

        if (NextPage != 0 ) keyActionMap.Add(NextPage, ReaderAction.NextPage.ToString());
        if (PreviousPage != 0 ) keyActionMap.Add(PreviousPage, ReaderAction.PreviousPage.ToString());
        if (Close != 0 ) keyActionMap.Add(Close, ReaderAction.Close.ToString());
        if (ToggleMenu != 0 ) keyActionMap.Add(ToggleMenu, ReaderAction.ToggleMenu.ToString());
        if (GoToPage != 0 ) keyActionMap.Add(GoToPage, ReaderAction.GoToPage.ToString());
        if (FullScreen != 0 ) keyActionMap.Add(FullScreen, ReaderAction.FullScreen.ToString());

        return JsonSerializer.Serialize(keyActionMap);
    }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        ImmutableHashSet<ReaderAction> ValidActions = ImmutableHashSet.Create<ReaderAction>();

        switch(Type)
        {
            case ReaderType.Book:
                ValidActions = ReaderTypeActionSet.BookActions;
                break;
            case ReaderType.Manga:
                ValidActions = ReaderTypeActionSet.MangaActions;
                break;
            case ReaderType.Pdf:
                ValidActions = ReaderTypeActionSet.PdfActions;
                break;
        }

        var actionDic = ToActionKeyDictionary();
        var actions = actionDic.Keys;

        // Validate that actions used are allowed for given ReaderType
        foreach(ReaderAction action in actions)
        {
            if (!ValidActions.Contains(action))
            {
                yield return new ValidationResult($"{action} action is not valid for ReaderType: {Type}");
            }
        }

        // Validate that all keys tied to actions are unique and non-repeating
        var keys = actionDic.Values;

        if (actionDic.Values.Distinct().Count() != keys.Count)
        {
            yield return new ValidationResult("All keys assigned to actions must be unique.");
        }
    }

    // Convert action fields and values to dictionary for validation
    private Dictionary<ReaderAction, int> ToActionKeyDictionary()
    {
        Dictionary<ReaderAction, int> actionKeyDictionary = new Dictionary<ReaderAction, int>();

        if (NextPage != 0 ) actionKeyDictionary.Add(ReaderAction.NextPage, NextPage);
        if (PreviousPage != 0 ) actionKeyDictionary.Add(ReaderAction.PreviousPage, PreviousPage);
        if (Close != 0 ) actionKeyDictionary.Add(ReaderAction.Close, Close);
        if (ToggleMenu != 0 ) actionKeyDictionary.Add(ReaderAction.ToggleMenu, ToggleMenu);
        if (GoToPage != 0 ) actionKeyDictionary.Add(ReaderAction.GoToPage, GoToPage);
        if (FullScreen != 0 ) actionKeyDictionary.Add(ReaderAction.FullScreen, FullScreen);

        return actionKeyDictionary;
    }
}
