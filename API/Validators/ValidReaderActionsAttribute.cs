using System.Collections.Generic;
using System.Collections.Immutable;
using System.ComponentModel.DataAnnotations;
using API.Constants;
using API.Entities.Enums;
using API.Entities;

namespace API.Validators;

// Validate that actions used are allowed for given ReaderType
public class ValidReaderActionsAttribute: ValidationAttribute
{
    private ImmutableHashSet<ReaderAction> ValidActions;

    protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
    {
        var bindings = (Dictionary<ReaderAction, string>)value;
        var actions = bindings.Keys;
        var keyBinding = (AppUserKeyBinding)validationContext.ObjectInstance;
        var readerType = keyBinding.Type;

        switch(readerType)
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

        foreach(ReaderAction action in actions)
        {
            if (!ValidActions.Contains(action))
            {
                return new ValidationResult($"{action} is not allowed for ReaderType {readerType}");
            }
        }

        return ValidationResult.Success;
    }
}
