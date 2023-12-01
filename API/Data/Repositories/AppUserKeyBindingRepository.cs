using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data.Repositories;

public interface IAppUserKeyBindingRepository
{
    void Update(AppUserKeyBinding keyBinding);
    void Delete(AppUserKeyBinding keyBinding);
    Task<IList<KeyBindingDto?>> GetAllDtosByUserId(int userId);
    Task<AppUserKeyBinding?> GetById(int keyBindingId);
    Task<AppUserKeyBinding?> GetByUserIdAndReaderType(int userid, int readerType);
}

public class AppUserKeyBindingRepository : IAppUserKeyBindingRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public AppUserKeyBindingRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public void Update(AppUserKeyBinding keyBinding)
    {
        _context.Entry(keyBinding).State = EntityState.Modified;
    }

    public void Delete(AppUserKeyBinding keyBinding)
    {
        _context.AppUserKeyBinding.Remove(keyBinding);
    }

    public async Task<IList<KeyBindingDto?>> GetAllDtosByUserId(int userId)
    {
        return await _context.AppUserKeyBinding
            .Where(k => k.AppUserId == userId)
            .ProjectTo<KeyBindingDto>(_mapper.ConfigurationProvider)
            .ToListAsync();
    }

    public async Task<AppUserKeyBinding?> GetById(int keyBindingId)
    {
        return await _context.AppUserKeyBinding
            .Where(k => k.Id == keyBindingId)
            .FirstOrDefaultAsync();
    }

    public async Task<AppUserKeyBinding?> GetByUserIdAndReaderType(int userId, int readerType)
    {
        return await _context.AppUserKeyBinding
            .Where(u => u.AppUserId == userId)
            .Where(k => k.Type == readerType)
            .FirstOrDefaultAsync();
    }

}

