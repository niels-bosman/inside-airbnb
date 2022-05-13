using api.Dto;
using api.Mappers;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories;

public class ListingRepository : IListingRepository
{
    private readonly DbSet<Listing> _listings;
    private readonly ListingMapper _listingMapper;
    
    public ListingRepository(Airbnb2022Context context, ListingMapper listingMapper)
    {
        _listings = context.Set<Listing>();
        _listingMapper = listingMapper;
    }

    public async Task<IEnumerable<ListingDto>> GetAll()
    {
        // TODO: Run benchmark with slow variant.
        // return await _listings.ToListAsync();

        return await _listings
            .Select(listing => _listingMapper.ToDto(listing))
            .AsNoTracking()
            .ToListAsync();
    }
}