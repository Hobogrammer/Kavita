using API.Entities;
using API.Data;
using API.Helpers;
using AutoMapper;
using System.Threading.Tasks;
using System.Linq;
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

        Task.Run(SeedDb).GetAwaiter().GetResult();
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

    private async Task<bool> SeedDb() // Needs a new name
    {
        await _context.Database.MigrateAsync();

        _context.AppUser.Add(new AppUser()
        {
            UserName = "majora2007"
        });

        return await _context.SaveChangesAsync() > 0;
    }

    [Fact]
    public async Task GetAllDtosByUserId_ShouldReturnAllKeybindingsForUser()
    {
        // Verify that all expected keybindings exist
        // Verify all keybindings belong to the specified user
    }

    [Fact]
    public async Task GetById_ShouldReturnExpectedObject()
    {
    }

    [Fact]
    public async Task GetByUserIdAndReaderType_ShouldReturnCorrectKeyBindingObjects()
    {
    }

    [Fact]
    public async Task GetDtoByUserIdAndReaderType_ShouldReturnCorrectKeyBindingDTOs()
    {
    }
}
