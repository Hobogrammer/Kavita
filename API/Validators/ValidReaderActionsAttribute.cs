using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using API.Constants;
using API.Entities.Enums;

namespace API.Validators;

// Validate that actions used are allowed for given ReaderType
public class ValidReaderActionsAttribute: ValidationAttribute
{
    public Dictionary<ReaderAction, string> Bindings { get; }

    public ValidReaderActions(Dictionary<ReaderAction, string> bindings)
    {
        Bindings = bindings;
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        var actions = Bindings.Keys;
        var keyBinding = (AppUserKeyBinding)validationContext.ObjectInstance;
        var readerType = keyBinding.Type;
        ImmutableSet<ReaderAction> validActions;

        switch(readerType)
        {
            case ReaderType.Book:
                validActions = ReaderTypeActionSet.BookActions;
                break;
            case ReaderType.Manga:
                validActions = ReaderTypeActionSet.MangaActions;
                break;
            case ReaderType.Pdf:
                validActions = ReaderTypeActionSet.PdfActions;
                break;
        }

        foreach(ReaderAction action in actions)
        {
            if (!validActions.Contains(action))
            {
                return new ValidationResult($"{action} is not allowed for ReaderType {readerType}");
            }
        }

        return ValidationResult.Success;
    }
}
