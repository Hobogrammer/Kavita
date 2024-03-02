using API.Constants;
using API.Entities;
using API.Entities.Enums;
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
        var keyBinding = new AppUserKeyBinding() { Type = ReaderType.Book };
        keyBinding.NextPage = "H";
        keyBinding.PreviousPage = "L";
        keyBinding.Close = "Escape";
        keyBinding.ToggleMenu = "M";
        keyBinding.GoToPage = "G";
        keyBinding.FullScreen = "F";

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
        var actions = ReaderTypeActionSet.BookActions;
        var validationErrors = new List<ValidationResult>();

        keyBinding.GoToPage = "G";
        keyBinding.Close = "Escape";

        var expectedValidationError = new ValidationResult(String.Format("GoToPage is not allowed for ReaderType: {0}", ReaderType.Pdf.ToString()));
        Validator.TryValidateObject(keyBinding, new ValidationContext(keyBinding), validationErrors);

        Assert.Equal(validationErrors[0].ErrorMessage, expectedValidationError.ErrorMessage); 
    }

    [Fact]
    public void Validation_ShouldFailForNonUniqueKeysAssignedToActions()
    {
        var keyBinding = new AppUserKeyBinding() { Type = ReaderType.Book};
        keyBinding.NextPage = "F";
        keyBinding.PreviousPage = "L";
        keyBinding.Close = "Escape";
        keyBinding.ToggleMenu = "M";
        keyBinding.GoToPage = "G";
        keyBinding.FullScreen = "F";

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
        List<char> usedKeys = new List<char>();

        foreach (ReaderAction action in actions)
        {
            var flag = true;
            var key = '\0';

            while (flag)
            {
                key = GetRandomLetter();
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
        List<char> usedKeys = new List<char>();

        foreach (ReaderAction action in actions)
        {
            var flag = true;
            var key = '\0';

            while (flag)
            {
                key = GetRandomLetter();
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
        List<char> usedKeys = new List<char>();

        foreach (ReaderAction action in actions)
        {
            var flag = true;
            var key = '\0';

            while (flag)
            {
                key = GetRandomLetter();
                flag = usedKeys.Contains(key);
            }

            AssignKeyToAction(keyBinding, action, key);
            usedKeys.Add(key);
        }

        var validationErrors = new List<ValidationResult>();
        Validator.TryValidateObject(keyBinding, new ValidationContext(keyBinding), validationErrors);
        Assert.Empty(validationErrors);
    }

    private void AssignKeyToAction(AppUserKeyBinding binding, ReaderAction action, char key)
    {
        var keyString = Convert.ToString(key);

        switch (action)
        {
            case ReaderAction.NextPage:
                binding.NextPage = keyString;
                break;
            case ReaderAction.PreviousPage:
                binding.PreviousPage = keyString;
                break;
            case ReaderAction.Close:
                binding.Close = keyString;
                break;
            case ReaderAction.GoToPage:
                binding.GoToPage = keyString;
                break;
            case ReaderAction.ToggleMenu:
                binding.ToggleMenu = keyString;
                break;
            case ReaderAction.FullScreen:
                binding.FullScreen = keyString;
                break;
        }
    }
    
    private char GetRandomLetter()
    {
        Random random = new Random();
        return (char)random.Next(97, 127);
    }
}
