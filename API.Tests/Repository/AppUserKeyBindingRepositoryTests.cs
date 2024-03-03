using API.Entities;
using API.Data;
using API.Helpers;
using AutoMapper;
using System.Threading.Tasks;
using System.Data.Common;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Xunit;

namespace API.Tests.Repository;

public class AppUserKeyBindingRepositoryTests
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly DbConnection? _connection;
    private readonly DataContext _context;

    public AppUserKeyBindingRepositoryTests()
    {
        var contextOptions = new DbContextOptionsBuilder().UseSqlite(CreateInMemoryDatabase()).Options;
        _connection = RelationalOptionsExtension.Extract(contextOptions).Connection;
        _context = new DataContext(contextOptions);

        Task.Run(PrepareDb).GetAwaiter().GetResult();
        var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfiles>());
        var mapper = config.CreateMapper();
        _unitOfWork = new UnitOfWork(_context, mapper, null!);
    }

    private static DbConnection CreateInMemoryDatabase()
    {
        var connection = new SqliteConnection("Filename=:memory:");

        connection.Open();

        return connection;
    }

    private async Task<bool> PrepareDb() // Needs a new name
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
    public async Task GetAllDtosByUserId_ShouldReturnAllKeybindingsForUser()
    {
        // Create some key bindings for both users
        // Verify that all expected keybindings exist
        // Verify all keybindings belong to the specified user
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
        // Call for binding of certain type
        // Assert correct keybinding
    }
}
