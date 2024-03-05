using API.Entities;
using API.Entities.Enums;
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
using API.DTOs;

namespace API.Tests.Repository;

public class AppUserKeyBindingRepositoryTests
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly DbConnection? _connection;
    private readonly DataContext _context;
    private readonly AppUserKeyBindingRepository appUserKeyBindingRepository;
    private readonly UserRepository userRepo;
    private readonly UserManager<AppUser> userManager;
    private int userId;

    public AppUserKeyBindingRepositoryTests()
    {
        var contextOptions = new DbContextOptionsBuilder().UseSqlite(CreateInMemoryDatabase()).Options;
        _connection = RelationalOptionsExtension.Extract(contextOptions).Connection;
        _context = new DataContext(contextOptions);

        Task.Run(PrepareDb).GetAwaiter().GetResult();
        var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfiles>());
        var mapper = config.CreateMapper();
        _unitOfWork = new UnitOfWork(_context, mapper, null!);
        userRepo = new UserRepository(_context, userManager, mapper); // This can be mocked out later
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
        var bookBinding = new AppUserKeyBinding() { 
            Type = ReaderType.Book,
            NextPage = "L",
            PreviousPage = "H",
            Close = "Escape",
            FullScreen = "F",
            ToggleMenu = "T"
        };
        var mangaBinding = new AppUserKeyBinding() { 
            Type = ReaderType.Manga,
            NextPage = "L",
            PreviousPage = "H",
            Close = "Escape",
            FullScreen = "F",
            ToggleMenu = "T"
        };
        var pdfBinding = new AppUserKeyBinding() { 
            Type = ReaderType.Pdf,
            Close = "Escape"
        };
        var adminId = await userRepo.GetUserIdByUsernameAsync("admin");
        var user = await userRepo.GetUserByIdAsync(adminId);
        user.KeyBindings.Add(bookBinding);
        user.KeyBindings.Add(mangaBinding);
        user.KeyBindings.Add(pdfBinding);

        userId = await userRepo.GetUserIdByUsernameAsync("user01");
        user = await userRepo.GetUserByIdAsync(userId);

        user.KeyBindings.Add(pdfBinding);
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
        // save id
        // assert the correct keybinding is returned
    }

    [Fact]
    public async Task GetByUserIdAndReaderType_ShouldReturnCorrectKeyBindingObjects()
    {
        // Create keybinding of multiple types for user
        // Call for binding of certain type

        // Assert correct keybinding
    }

    [Fact]
    public async Task GetDtoByUserIdAndReaderType_ShouldReturnCorrectKeyBindingDTOs()
    {
        // Create keybinding of multiple types for user
        var bookBinding = new AppUserKeyBinding() { 
            Type = ReaderType.Book,
            NextPage = "L",
            PreviousPage = "H",
            Close = "Escape",
            FullScreen = "F",
            ToggleMenu = "T"
        };
        var pdfBinding = new AppUserKeyBinding() { 
            Type = ReaderType.Pdf,
            Close = "Escape"
        };
        // Call for binding of certain type
        var adminId = await userRepo.GetUserIdByUsernameAsync("admin");
        var user = await userRepo.GetUserByIdAsync(adminId);
        user.KeyBindings.Add(bookBinding);
        user.KeyBindings.Add(pdfBinding);
        // Assert correct keybinding
        var dto = await appUserKeyBindingRepository.GetDtoByUserIdAndReaderType(adminId, ReaderType.Book);
        Assert.Equal(ReaderType.Book.ToString(), dto.Type);

        dto = await appUserKeyBindingRepository.GetDtoByUserIdAndReaderType(adminId, ReaderType.Manga);
        Assert.Null(dto);

        dto = await appUserKeyBindingRepository.GetDtoByUserIdAndReaderType(adminId, ReaderType.Pdf);
        Assert.Equal(ReaderType.Pdf.ToString(), dto.Type);
    }
}
