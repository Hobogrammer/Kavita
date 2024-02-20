using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using API.Entities.Enums;

namespace API.Validators;

// Validate that all keys tied to actions are unique and non-repeating
public class UniqueKeysAttribute : ValidationAttribute
{
    public const string ErrorMessage = "Keys cannot be assigned to multiple actions.";

    protected override ValidationResult IsValid(object? value, ValidationContext validationContext)
    {
        var bindings = (Dictionary<ReaderAction, string>)value;

        if (bindings.Values.Distinct().Count() != bindings.Count)
        {
            return new ValidationResult(ErrorMessage);
        }

        return ValidationResult.Success;
    }
}
