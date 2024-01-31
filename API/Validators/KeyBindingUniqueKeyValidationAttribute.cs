using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using API.Entities.Enums;

namespace API.Validators;

// Validate that all keys tied to actions are unique and non-repeating
public class UniqueKeysAttribute : ValidationAttribute
{
    public const string ErrorMessage = "Keys cannot be assigned to multiple actions.";
    public Dictionary<ReaderAction, string> Bindings { get; }

    public UniqueKeysAttribute(Dictionary<ReaderAction, string> bindings)
    {
        Bindings = bindings;
    }

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (!Bindings.Values.Distinct().Count() == Bindings.Count)
        {
            return new ValidationResult(ErrorMessage);
        }

        return ValidationResult.Success;
    }
}
