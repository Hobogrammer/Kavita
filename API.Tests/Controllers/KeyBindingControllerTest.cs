using Xunit;
using System.Data.Common;
using System.Threading.Tasks;
using API.Data;
using API.Data.Repositories;
using API.Entities;
using API.Entities.Enums.KeyBindings;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using AutoMapper;
using Microsoft.Data.Sqlite;
using API.Helpers;
using API.Controllers;

namespace API.Tests.Controllers;

public class KeyBindingControllerTests
{

    private readonly IUnitOfWork _unitOfWork;
    private readonly DbConnection? _connection;
    private readonly DataContext _context;
    private readonly AppUserKeyBindingRepository appUserKeyBindingRepository;
    private readonly UserRepository userRepo;
    private readonly UserManager<AppUser> userManager;
    private readonly KeyBindingController controller;

    public KeyBindingControllerTests()
    {
        var contextOptions = new DbContextOptionsBuilder().UseSqlite(CreateInMemoryDatabase()).Options;
        _connection = RelationalOptionsExtension.Extract(contextOptions).Connection;
        _context = new DataContext(contextOptions);

        Task.Run(PrepareDb).GetAwaiter().GetResult();
        var config = new MapperConfiguration(cfg => cfg.AddProfile<AutoMapperProfiles>());
        var mapper = config.CreateMapper();
        _unitOfWork = new UnitOfWork(_context, mapper, null!);
        userRepo = new UserRepository(_context, userManager, mapper); // This can be mocked out later
        appUserKeyBindingRepository = new AppUserKeyBindingRepository(_context, mapper);
        controller = new KeyBindingController(_unitOfWork);
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

    // TODO: Create a method to generate some default keybindings for the test

//    [Theory]
//    [InlineData(new KeyBindingDto() { Type = ReaderType.Book})]
//    public async Task CreatingKeyBinding_ShouldCreateDto(KeyBindingDto dto)
 //   {
 //       var result = await controller.CreateOrUpdateKeyBinding(1, dto);
 //       var okResult = result as OkObjectResult;
 //       Assert.Equal(200, okResult.StatusCode);
 //       Assert.Equal(dto, await appUserKeyBindingRepository.GetDtoByUserIdAndReaderType(1, dto.Type));
 //   }

    [Fact]
    public async Task UpdatingKeyBinding_ShouldOnlyChangeUpdatedFields()
    {

    }

    [Theory]
    [InlineData(ReaderType.Book, 0)] //TODO: Requires passing complex params https://code-maze.com/xunit-how-to-pass-complex-parameters-to-theory/
    [InlineData(ReaderType.Manga, 2)]
    [InlineData(ReaderType.Pdf, 3)]
    public async Task GetReaderKeyBinding_ShouldReturnCorrectKeyBinding(ReaderType readerType, int keyBindingId)
    {
        //Verify expected keybinding and readerType
        var result = controller.GetReaderKeybinding(keyBindingId, readerType);
        Assert.Equal(result.Value.Type, readerType);
    }

    [Fact]
    public async Task DeleteKeyBinding_ShouldRemoveKeyBinding()
    {
        var user = await userRepo.GetUserByIdAsync(1, AppUserIncludes.KeyBindings);
        var kB = new AppUserKeyBinding() {
            Type = ReaderType.Book,
            AppUser = user,
            AppUserId = user.Id,
            NextPage = 55,
            PreviousPage = 51,
            Close = 13,
            FullScreen = 49,
            ToggleMenu = 63
        };
        user.KeyBindings.Add(kB);
        await _unitOfWork.CommitAsync();

        Assert.Equal(kB, await appUserKeyBindingRepository.GetById(1));
        await controller.DeleteKeyBinding(1);
        Assert.Null(await appUserKeyBindingRepository.GetById(1));
    }
}
