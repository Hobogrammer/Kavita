using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Kavita.Common;
using API.Entities.Enums;
using API.Validators;

namespace API.Entities;

public class AppUserKeyBinding : IValidateableObject
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

    // Convert action fields and values to shortcut key action pair for front end use
    public string ToKeyActionJson()
    {
        Dictionary<String, ReaderAction> keyActionMap;

        if (NextPage != null ) keyActionMap.Add(NextPage, ReaderAction.NextPage);
        if (PreviousPage != null ) keyActionMap.Add(PreviousPage, ReaderAction.PreviousPage);
        if (Close != null ) keyActionMap.Add(Close, ReaderAction.Close);
        if (ToggleMenu != null ) keyActionMap.Add(ToggleMenu, ReaderAction.ToggleMenu);
        if (GoToPage != null ) keyActionMap.Add(GoToPage, ReaderAction.GoToPage);
        if (FullScreen != null ) keyActionMap.Add(FullScreen, ReaderAction.FullScreen);

        return JsonSerializer.Serialize(ToKeyActionMap(), option);
    }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        ImmutableHashSet ValidActions;

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
                yield return new ValidationResult($"{action} is not allowed for ReaderType {Type}");
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
        Dictionary<ReaderAction, string> actionKeyDictionary;

        if (NextPage != null ) actionKeyDictionary.Add(NextPage, ReaderAction.NextPage);
        if (PreviousPage != null ) actionKeyDictionary.Add(PreviousPage, ReaderAction.PreviousPage);
        if (Close != null ) actionKeyDictionary.Add(Close, ReaderAction.Close);
        if (ToggleMenu != null ) actionKeyDictionary.Add(ToggleMenu, ReaderAction.ToggleMenu);
        if (GoToPage != null ) actionKeyDictionary.Add(GoToPage, ReaderAction.GoToPage);
        if (FullScreen != null ) actionKeyDictionary.Add(FullScreen, ReaderAction.FullScreen);

        return actionKeyDictionary;
    }
}
