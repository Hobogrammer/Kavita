using API.Data;
using AutoMapper;
using System.Threading.Tasks;
using Xunit;

namespace API.Tests.Repository;

public class AppUserKeyBindingRepositoryTests
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly DbConnection? _connection;
    private readonly DataContext _context;

    public AppUserKeybindingRepositoryTests()
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

    [Theory]
    public async Task GetAllDtosByUserId_ShouldReturnAllKeybindingsForUser(int userId)
    {
        // Verify that all expected keybindings exist
        // Verify all keybindings belong to the specified user
    }

    [Theory]
    public async Task GetById_ShouldReturnExpectedObject(int keyBindingId)
    {
    }

    [Theory]
    public async Task GetByUserIdAndReaderType_ShouldReturnCorrectKeyBindingObjects(int userId, ReaderType readerType)
    {
    }

    [Theory]
    public async Task GetDtoByUserIdAndReaderType_ShouldReturnCorrectKeyBindingDTOs(int userId, ReaderType readerType)
    {
    }
}
