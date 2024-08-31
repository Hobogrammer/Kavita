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

    public string NextPage { get; set; }
    public string PreviousPage { get; set; }
    public string Close { get; set; }
    public string ToggleMenu { get; set; }
    public string GoToPage { get; set; }
    public string FullScreen { get; set; }

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
    private Dictionary<ReaderAction, string> ToActionKeyDictionary()
    {
        Dictionary<ReaderAction, string> actionKeyDictionary = new Dictionary<ReaderAction, string>();

        if (NextPage != "") actionKeyDictionary.Add(ReaderAction.NextPage, NextPage);
        if (PreviousPage != "") actionKeyDictionary.Add(ReaderAction.PreviousPage, PreviousPage);
        if (Close != "") actionKeyDictionary.Add(ReaderAction.Close, Close);
        if (ToggleMenu != "") actionKeyDictionary.Add(ReaderAction.ToggleMenu, ToggleMenu);
        if (GoToPage != "") actionKeyDictionary.Add(ReaderAction.GoToPage, GoToPage);
        if (FullScreen != "") actionKeyDictionary.Add(ReaderAction.FullScreen, FullScreen);

        return actionKeyDictionary;
    }
}
