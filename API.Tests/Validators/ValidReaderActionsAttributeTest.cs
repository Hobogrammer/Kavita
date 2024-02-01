using System.ComponentModel.DataAnnotations;
using API.Entities;
using API.Entities.Enums;
using API.Constants;
using Xunit;

public class ValidReaderActionsAttributeTests
{

    [Fact]
    public void KeyBinding_FailsValidationForInvalidReaderActions()
    {
        var keyBinding = new AppUserKeyBinding(ReaderType.Pdf);
        keyBinding.Bindings.Add(ReaderAction.NextPage, "K");

        var context = new ValidationContext(keyBinding);
        var results = new List<ValidationResult>();
        var isValid = Validator.TryValidateObject(keyBinding, context, results, true);
        Assert.True(isValid);
    }
}
