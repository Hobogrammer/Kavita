using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using AutoMapper;
using Automapper.QueryableExtensions;

namespace API.Data.Repositories;

public interface IAppUserBookReaderKeyBindingRepository
{
    void Update(AppUserBookReaderKeyBinding keyBinding);
    void Delete(AppUserBookReaderKeyBinding keyBinding);
    Task<BookReaderKeyBindingDto?> GetByUserId(int userId);
    Task<BookReaderKeyBindingDto?> GetById(int keyBindingId);
}

public class AppUserBookReaderKeyBindingRepository : IAppUserBookReaderKeyBindingRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public AppUserBookReaderKeyBindingRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public void Update(AppUserBookReaderKeyBinding keyBinding)
    {
        _context.Entry(keyBinding).State = EntityState.Modified;
    }

    public void Delete(AppUserBookReaderKeyBinding keyBinding)
    {
        _context.AppUserBookReaderKeyBinding.Remove(keyBinding);
    }

    public async Task<BookReaderKeyBindingDto?> GetByUserId(int userId)
    {
        return await _context.BookReaderKeyBinding
            .Where(b => b.AppUserId == userId)
            .ProjectTo<BookReaderKeyBindingDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();
    }

    public async Task<BookReaderKeyBindingDto?> GetById(int keyBindingId)
    {
        return await _context.AppUserBookReaderKeyBinding.FirstOrDefaultAsync(k => k.Id == keyBindingId);
    }
}

