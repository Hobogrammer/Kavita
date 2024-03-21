using API.Entities;
using API.Entities.Enums.KeyBindings;
using API.Data;
using API.Helpers;
using AutoMapper;
using System.Threading.Tasks;
using System.Data.Common;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Xunit;
using API.Data.Repositories;
using Microsoft.AspNetCore.Identity;

namespace API.Tests.Repository;

public class AppUserKeyBindingRepositoryTests
{
    private readonly DataContext _context;
    private readonly AppUserKeyBindingRepository appUserKeyBindingRepository;
    private readonly UserRepository userRepo;
    private readonly UserManager<AppUser> userManager;
    private int userId;

    public AppUserKeyBindingRepositoryTests()
    {
        var contextOptions = new DbContextOptionsBuilder().UseSqlite(CreateInMemoryDatabase()).Options;
        _context = new DataContext(contextOptions);

        Task.Run(PrepareDb).GetAwaiter().GetResult();
        var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfiles>());
        var mapper = config.CreateMapper();
        userRepo = new UserRepository(_context, userManager, mapper); // This can be mocked out later
        appUserKeyBindingRepository = new AppUserKeyBindingRepository(_context, mapper);
    }

    private static DbConnection CreateInMemoryDatabase()
    {
        var connection = new SqliteConnection("Filename=:memory:");

        connection.Open();

        return connection;
    }

    private async Task<bool> PrepareDb()
    {
        await _context.Database.MigrateAsync();

        _context.AppUser.Add(new AppUser()
        {
            UserName = "admin"
        });

        _context.AppUser.Add(new AppUser()
        {
            UserName = "user01"
        });

        return await _context.SaveChangesAsync() > 0;
    }

    [Fact]
    public async Task GetAllDtosByUserId_ShouldReturnAllKeyBindingDtosForUser()
    {
        // Create some key bindings for both users
        var adminId = await userRepo.GetUserIdByUsernameAsync("admin");
        var user = await userRepo.GetUserByIdAsync(adminId, AppUserIncludes.KeyBindings);

        var bookBinding = new AppUserKeyBinding() { 
            Type = ReaderType.Book,
            AppUser = user,
            AppUserId = adminId,
            NextPage = 55,
            PreviousPage = 51,
            Close = 13,
            FullScreen = 49,
            ToggleMenu = 63
        };
        var mangaBinding = new AppUserKeyBinding() { 
            Type = ReaderType.Manga,
            AppUser = user,
            AppUserId = user.Id,
            NextPage = 55,
            PreviousPage = 51,
            Close = 13,
            FullScreen = 49,
            ToggleMenu = 63
        };
        var pdfBinding = new AppUserKeyBinding() { 
            AppUser = user,
            AppUserId = user.Id,
            Type = ReaderType.Pdf,
            Close = 13
        };
        user.KeyBindings.Add(bookBinding);
        user.KeyBindings.Add(mangaBinding);
        user.KeyBindings.Add(pdfBinding);
        await _context.SaveChangesAsync();

        userId = await userRepo.GetUserIdByUsernameAsync("user01");
        user = await userRepo.GetUserByIdAsync(userId, AppUserIncludes.KeyBindings);

        pdfBinding = new AppUserKeyBinding() { 
            Type = ReaderType.Pdf,
            AppUser = user,
            AppUserId = user.Id,
            Close = 13
        };

        user.KeyBindings.Add(pdfBinding);
        await _context.SaveChangesAsync();
        // Verify that all expected keybindings exist
        var dtos = await appUserKeyBindingRepository.GetAllDtosByUserId(adminId);
        Assert.Equal(3, dtos.Count);

        dtos = await appUserKeyBindingRepository.GetAllDtosByUserId(userId);
        Assert.Single(dtos);
    }

    [Fact]
    public async Task GetById_ShouldReturnExpectedObject()
    {
        //Create keybinging
        var adminId = await userRepo.GetUserIdByUsernameAsync("admin");
        var user = await userRepo.GetUserByIdAsync(adminId, AppUserIncludes.KeyBindings);

        var bookBinding = new AppUserKeyBinding() { 
            Type = ReaderType.Book,
            AppUser = user,
            AppUserId = user.Id,
            NextPage = 55,
            PreviousPage = 51,
            Close = 13,
            FullScreen = 49,
            ToggleMenu = 63
        };
        // save id
        user.KeyBindings.Add(bookBinding);
        await _context.SaveChangesAsync();
        // assert the correct keybinding is returned
        var keyBinding = await appUserKeyBindingRepository.GetById(1);

        Assert.Equal(bookBinding, keyBinding);
    }

    [Fact]
    public async Task GetByUserIdAndReaderType_ShouldReturnCorrectKeyBindingObjects()
    {
        // Create keybinding of multiple types for user
        // Call for binding of certain type
        var adminId = await userRepo.GetUserIdByUsernameAsync("admin");
        var user = await userRepo.GetUserByIdAsync(adminId, AppUserIncludes.KeyBindings);
        var bookBinding = new AppUserKeyBinding() { 
            Type = ReaderType.Book,
            AppUser = user,
            AppUserId = user.Id,
            NextPage = 55,
            PreviousPage = 51,
            Close = 13,
            FullScreen = 49,
            ToggleMenu = 63
        };
        var pdfBinding = new AppUserKeyBinding() { 
            Type = ReaderType.Pdf,
            AppUser = user,
            AppUserId = user.Id,
            Close = 13
        };
        user.KeyBindings.Add(bookBinding);
        user.KeyBindings.Add(pdfBinding);
        await _context.SaveChangesAsync();
        // Assert correct keybinding

        var keyBinding = await appUserKeyBindingRepository.GetByUserIdAndReaderType(adminId, ReaderType.Book);
        Assert.Equal(ReaderType.Book.ToString(), keyBinding.Type.ToString());
        keyBinding = await appUserKeyBindingRepository.GetByUserIdAndReaderType(adminId, ReaderType.Pdf);
        Assert.Equal(ReaderType.Pdf.ToString(), keyBinding.Type.ToString());
        keyBinding = await appUserKeyBindingRepository.GetByUserIdAndReaderType(adminId, ReaderType.Manga);
        Assert.Null(keyBinding);
    }

    [Fact]
    public async Task GetDtoByUserIdAndReaderType_ShouldReturnCorrectKeyBindingDTOs()
    {
        // Create keybinding of multiple types for user
        var bookBinding = new AppUserKeyBinding() { 
            Type = ReaderType.Book,
            NextPage = 55,
            PreviousPage = 51,
            Close = 13,
            FullScreen = 49,
            ToggleMenu = 63
        };
        var pdfBinding = new AppUserKeyBinding() { 
            Type = ReaderType.Pdf,
            Close = 13
        };
        // Call for binding of certain type
        var adminId = await userRepo.GetUserIdByUsernameAsync("admin");
        var user = await userRepo.GetUserByIdAsync(adminId, AppUserIncludes.KeyBindings);
        user.KeyBindings.Add(bookBinding);
        user.KeyBindings.Add(pdfBinding);
        // Assert correct keybinding
        await _context.SaveChangesAsync();
        var dto = await appUserKeyBindingRepository.GetDtoByUserIdAndReaderType(adminId, ReaderType.Book);
        Assert.Equal(ReaderType.Book, dto.Type);

        dto = await appUserKeyBindingRepository.GetDtoByUserIdAndReaderType(adminId, ReaderType.Manga);
        Assert.Null(dto);

        dto = await appUserKeyBindingRepository.GetDtoByUserIdAndReaderType(adminId, ReaderType.Pdf);
        Assert.Equal(ReaderType.Pdf, dto.Type);
    }
}
