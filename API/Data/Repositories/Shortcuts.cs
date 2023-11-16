using System;

namespace API.Data.Repositories;

public interface IShortcutRepository
{
   void Update(Shortcut shortcut);
}

public class ShortcutRepository : IShortcutRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public ShortcutRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public void Update(Shortcut shortcut)
    {
        _context.Entry(shortcut).State = EntityState.Modified;
    }
    
}
