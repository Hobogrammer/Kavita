using API.Constants;
using API.Entities;
using API.Entities.Enums.KeyBindings;
using System;
using System.Text;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using Xunit;

public class AppUserKeyBindingTests
{
    [Fact]
    public void ToKeyActionJson_ShouldReturnExpectedJsonString()
    {
        var keyBinding = new AppUserKeyBinding
        {
            Type = ReaderType.Book,
            NextPage = 51, // H
            PreviousPage = 55, // L
            Close = 13, // Escape
            ToggleMenu = 56, // M
            GoToPage = 50, // G
            FullScreen = 49 // F
        };

        StringBuilder expected = new StringBuilder("{");
        expected.AppendFormat("\"{0}\":\"{1}\",", keyBinding.NextPage, ReaderAction.NextPage.ToString());
        expected.AppendFormat("\"{0}\":\"{1}\",", keyBinding.PreviousPage, ReaderAction.PreviousPage.ToString());
        expected.AppendFormat("\"{0}\":\"{1}\",", keyBinding.Close, ReaderAction.Close.ToString());
        expected.AppendFormat("\"{0}\":\"{1}\",", keyBinding.ToggleMenu, ReaderAction.ToggleMenu.ToString());
        expected.AppendFormat("\"{0}\":\"{1}\",", keyBinding.GoToPage, ReaderAction.GoToPage.ToString());
        expected.AppendFormat("\"{0}\":\"{1}\"", keyBinding.FullScreen, ReaderAction.FullScreen.ToString());
        expected.Append("}");

        Assert.Equal(expected.ToString(), keyBinding.ToKeyActionJson());
    }

    [Fact]
    public void Validation_ShouldFailForUnsupportedReaderActions()
    {
        var keyBinding = new AppUserKeyBinding() { Type = ReaderType.Pdf };
        var validationErrors = new List<ValidationResult>();

        keyBinding.GoToPage = 50; // G
        keyBinding.Close = 13; // Escape

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
            NextPage = 20, // PageDown
            PreviousPage = 19, // PageUp
            Close = 13, // Escape
            ToggleMenu = 56, // M
            GoToPage = 50, // G
            FullScreen = 56 // M
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
        List<int> usedKeys = new List<int>();

        foreach (ReaderAction action in actions)
        {
            var flag = true;
            var key = 0;

            while (flag)
            {
                key = GetRandomKeyInt();
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
        List<int> usedKeys = new List<int>();

        foreach (ReaderAction action in actions)
        {
            var flag = true;
            var key = 0;

            while (flag)
            {
                key = GetRandomKeyInt();
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
        List<int> usedKeys = new List<int>();

        foreach (ReaderAction action in actions)
        {
            var flag = true;
            var key = 0;

            while (flag)
            {
                key = GetRandomKeyInt();
                flag = usedKeys.Contains(key);
            }

            AssignKeyToAction(keyBinding, action, key);
            usedKeys.Add(key);
        }

        var validationErrors = new List<ValidationResult>();
        Validator.TryValidateObject(keyBinding, new ValidationContext(keyBinding), validationErrors);
        Assert.Empty(validationErrors);
    }

    private void AssignKeyToAction(AppUserKeyBinding binding, ReaderAction action, int key)
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
    
    private int GetRandomKeyInt()
    {
        Random random = new Random();
        return random.Next(13, 127);
    }
}
