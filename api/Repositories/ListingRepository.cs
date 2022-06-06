using api.Dto;
using api.Extensions;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class ListingRepository : IListingRepository
{
    private readonly DbSet<Listing> _listings;
    
    public ListingRepository(Airbnb2022Context context)
    {
        _listings = context.Set<Listing>();
    }

    public async Task<IEnumerable<ListingDto>?> GetAll()
    {
        return await _listings
            .AsDto()
            .AsNoTracking()
            .ToListAsync();
    }
    
    public async Task<Listing?> Get(int id)
    {
        return await _listings
            .AsNoTracking()
            .FirstOrDefaultAsync(listing => listing.Id == id);
    }
}