using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class ListingRepository : IListingRepository
{
    private readonly Airbnb2022Context _context;
    private readonly DbSet<Listing> _listings;
    public ListingRepository(Airbnb2022Context context)
    {
        _context = context;
        _listings = context.Set<Listing>();
    }

    public async Task<IEnumerable<Listing>> GetAll()
    {
        return await _listings.ToListAsync();
    }
}