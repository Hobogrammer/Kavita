using System.Linq;
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
    Task<KeyBindingDto?> GetByUserId(int userId);
    Task<KeyBindingDto?> GetById(int keyBindingId);
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

    public async Task<KeyBindingDto?> GetByUserId(int userId)
    {
        return await _context.AppUserKeyBinding
            .Where(b => b.AppUserId == userId)
            .ProjectTo<KeyBindingDto>(_mapper.ConfigurationProvider)
            .FirstOrDefaultAsync();
    }

    public async Task<KeyBindingDto?> GetById(int keyBindingId)
    {
        return await _context.AppUserKeyBinding
            .FirstOrDefaultAsync(k => k.Id == keyBindingId)
            .ProjectTo<KeyBindingDto>(_mapper.ConfigurationProvider);
    }
}

