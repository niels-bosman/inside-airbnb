using api.Dto;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Extensions;

public static class ListingSetExtension
{
    public static IQueryable<ListingDto> AsDto(this DbSet<Listing> listings)
    {
        return listings.Select(listing => new ListingDto {
            Id = listing.Id,
            Latitude = listing.Latitude,
            Longitude = listing.Longitude,
            Name = listing.Name,
            Price = listing.Price,
            Neighbourhood = listing.NeighbourhoodCleansed,
            NumberOfReviews = listing.NumberOfReviews,
        });
    }
}