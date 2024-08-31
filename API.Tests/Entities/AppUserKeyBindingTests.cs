using API.Constants;
using API.Entities;
using API.Entities.Enums.KeyBindings;
using System;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Xunit;

public class AppUserKeyBindingTests
{
    [Fact]
    public void Validation_ShouldFailForUnsupportedReaderActions()
    {
        var keyBinding = new AppUserKeyBinding() { Type = ReaderType.Pdf };
        var validationErrors = new List<ValidationResult>();

        keyBinding.GoToPage = "G";
        keyBinding.Close = "Escape";

        var expectedValidationError = new ValidationResult(string.Format("GoToPage action is not valid for ReaderType: {0}", ReaderType.Pdf.ToString()));
        Validator.TryValidateObject(keyBinding, new ValidationContext(keyBinding), validationErrors);

        Assert.Equal(validationErrors[0].ErrorMessage, expectedValidationError.ErrorMessage); 
    }

    [Fact]
    public void Validation_ShouldFailForNonUniqueKeysAssignedToActions()
    {
        var keyBinding = new AppUserKeyBinding
        {
            Type = ReaderType.Book,
            NextPage = "PageDown",
            PreviousPage = "PageUp",
            Close = "Escape",
            ToggleMenu = "M",
            GoToPage = "G",
            FullScreen = "M"
        };

        var validationErrors = new List<ValidationResult>();
        var expectedValidationError = new ValidationResult("All keys assigned to actions must be unique");
        Validator.TryValidateObject(keyBinding, new ValidationContext(keyBinding), validationErrors);

        Assert.StartsWith("All keys", validationErrors[0].ErrorMessage);
    }

    [Fact]
    public void Validation_ShouldSucceedForSupportedPdfReaderActions()
    {
        var keyBinding = new AppUserKeyBinding(){ Type = ReaderType.Pdf};
        var actions = ReaderTypeActionSet.PdfActions;
        var validationErrors = new List<ValidationResult>();
        List<string> usedKeys = new List<string>();

        foreach (ReaderAction action in actions)
        {
            var flag = true;
            var key = "";

            while (flag)
            {
                key = GetRandomKey();
                flag = usedKeys.Contains(key);    
            }

            AssignKeyToAction(keyBinding, action, key);
            usedKeys.Add(key);
        }

        Validator.TryValidateObject(keyBinding, new ValidationContext(keyBinding), validationErrors);
        Assert.Empty(validationErrors);
    }

    [Fact]
    public void Validation_ShouldSucceedForSupportedMangaReaderActions()
    {
        var keyBinding = new AppUserKeyBinding(){ Type = ReaderType.Manga};
        var actions = ReaderTypeActionSet.MangaActions;
        List<string> usedKeys = new List<string>();

        foreach (ReaderAction action in actions)
        {
            var flag = true;
            var key = "";

            while (flag)
            {
                key = GetRandomKey();
                flag = usedKeys.Contains(key);
            }

            AssignKeyToAction(keyBinding, action, key);
            usedKeys.Add(key);
        }

        var validationErrors = new List<ValidationResult>();
        Validator.TryValidateObject(keyBinding, new ValidationContext(keyBinding), validationErrors);
        Assert.Empty(validationErrors);
    }

    [Fact]
    public void Validation_ShouldSucceedForSupportedBookReaderActions()
    {
        var keyBinding = new AppUserKeyBinding(){ Type = ReaderType.Book};
        var actions = ReaderTypeActionSet.BookActions;
        List<string> usedKeys = new List<string>();

        foreach (ReaderAction action in actions)
        {
            var flag = true;
            var key = "";

            while (flag)
            {
                key = GetRandomKey();
                flag = usedKeys.Contains(key);
            }

            AssignKeyToAction(keyBinding, action, key);
            usedKeys.Add(key);
        }

        var validationErrors = new List<ValidationResult>();
        Validator.TryValidateObject(keyBinding, new ValidationContext(keyBinding), validationErrors);
        Assert.Empty(validationErrors);
    }

    private void AssignKeyToAction(AppUserKeyBinding binding, ReaderAction action, string key)
    {
        switch (action)
        {
            case ReaderAction.NextPage:
                binding.NextPage = key;
                break;
            case ReaderAction.PreviousPage:
                binding.PreviousPage = key;
                break;
            case ReaderAction.Close:
                binding.Close = key;
                break;
            case ReaderAction.GoToPage:
                binding.GoToPage = key;
                break;
            case ReaderAction.ToggleMenu:
                binding.ToggleMenu = key;
                break;
            case ReaderAction.FullScreen:
                binding.FullScreen = key;
                break;
        }
    }
    
    private string GetRandomKey()
    {
        var keyList = new List<string> {"0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
            "Escape", " ", "PageUp", "PageDown", "Alt", "Control", "Enter", "Tab", "ArrowDown",
            "ArrowUp", "ArrowLeft", "ArrowRight", "A", "B", "C", "D", "E", "F", "G", "H", "I",
            "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
            "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q",
            "r", "s", "t", "u", "v", "w", "x", "y", "z"
        };

        Random random = new Random();
        return keyList[random.Next(0, keyList.Count)];
    }
}
