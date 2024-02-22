using API.Constants;
using API.Entities;
using API.Entities.Enums;
using System;
using Xunit;

public class AppUserKeyBindingTests
{
    [Fact]
    public void ToKeyActionJson_ShouldReturnExpectedJsonString()
    {
        var keyBinding = new AppUserKeyBinding(ReaderType.Book);
        keyBinding.NextPage = "H";
        keyBinding.PreviousPage = "L";
        keyBinding.Close = "Escape";
        keyBinding.ToggleMenu = "M";
        keyBinding.GoToPage = "G";
        keyBinding.FullScreen = "F";

        expected = $"{{{keyBinding.NextPage}: {ReaderAction.NextPage},"
                + $"{keyBinding.PreviousPage}: {ReaderAction.NextPage},"
                + $"{keyBinding.Close}: {ReaderAction.Close},"
                + $"{keyBinding.ToggleMenu}: {ReaderAction.ToggleMenu},"
                + $"{keyBinding.GoToPage}: {ReaderAction.GoToPage},"
                + $"{keyBinding.FullScreen}: {ReaderAction.FullScreen}}}";

        Assert.Equal(expected, keyBinding.ToKeyActionJson());
    }

    [Fact]
    public void Validation_ShouldFailForUnsupportedReaderActions()
    {
        var keyBinding = new AppUserKeyBinding(ReaderType.Pdf);
        var actions = ReaderTypeActionSet.BookActions;

        keyBinding.GoToPage = "G";
        keyBinding.Close = "Escape";

        var expectedValidationError = new ValidationError("GoToPage is not allowed for ReaderType: ReaderType.Pdf");
        var validationErrors = Validator.ValidateObject(keyBinding, new ValidationContext(keyBinding), true);

        Assert.Equal(validationErrors[0], expectedValidationError); 
    }

    [Fact]
    public void Validation_ShouldFailForNonUniqueKeysAssignedToActions()
    {
        var keyBinding = new AppUserKeyBinding(ReaderType.Book);
        keyBinding.NextPage = "F";
        keyBinding.PreviousPage = "L";
        keyBinding.Close = "Escape";
        keyBinding.ToggleMenu = "M";
        keyBinding.GoToPage = "G";
        keyBinding.FullScreen = "F";

        var expectedValidationError = new ValidationError("All keys assigned to actions must be unique");
        var validationErrors = Validator.ValidateObject(keyBinding, new ValidationContext(keyBinding), true);

        Assert.Equal(validationErrors[0], expectedValidationError); 
    }

    //TODO: Convert to 3 fact test cause static values can't be parameters :shrug:
    [Theory]
    [InlineData(ReaderType.Pdf, ReaderTypeActionSet.PdfActions)]
    [InlineData(ReaderType.Manga, ReaderTypeActionSet.MangaActions)]
    [InlineData(ReaderType.Book, ReaderTypeActionSet.BookActions)]
    public void Validation_ShouldSucceedForSupportedReaderActions(ReaderType readerType, ReaderTypeActionSet actions)
    {
        var keyBinding = new AppUserKeyBinding(readerType);
        var validationErrors = new List<ValidationResult>();
        var usedKeys = [];

        foreach (ReaderAction action in actions)
        {
            var flag = true;
            var key = new string();

            while (flag)
            {
                key = GetRandomLetter();
                flag = usedKeys.Contains(key);    
            }

            AssignKeyToAction(keyBinding, action, key);
            usedKeys.Add(key);
        }

        validationErrors = Validator.ValidateObject(keyBinding, new ValidationContext(keyBinding), true);
        Assert.IsEmpty(validationErrors);
    }

    [Theory]
    [InlineData(ReaderType.Pdf)]
    [InlineData(ReaderType.Manga)]
    [InlineData(ReaderType.Book)]
    public void Validation_ShouldSucceedForUniqueKeysAssignedToActions()
    {
        var validationErrors = new List<ValidationResult>();

        validationErrors = Validator.ValidateObject(keyBinding, new ValidationContext(keyBinding), true);
        Assert.IsEmpty(validationErrors);
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
    
    private string GetRandomLetter()
    {
        Random random = new Random();
        return ((char)random.Next(97, 127)).toString();
    }
}
