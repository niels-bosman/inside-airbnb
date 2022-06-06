using api.Dto;
using api.Models;
using api.Repositories;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace api.Services;

public class StatisticsService : IStatisticsService
{
    private readonly IDistributedCache _cache;
    private readonly IListingRepository _repository;

    public StatisticsService(IListingRepository repository, IDistributedCache cache)
    {
        _repository = repository;
        _cache = cache;
    }
    
    public async Task<IEnumerable<NeighbourhoodListingAmount>> GetListingAmountPerNeighbourhood()
    {
        var listings = await _repository.GetAll();
        
        return listings
            .GroupBy(listing => listing.Neighbourhood)
            .Select(listing => new NeighbourhoodListingAmount
            {
                Neighbourhood = listing.Key, 
                Amount = listing.Count()
            });
    }

    public async Task<IEnumerable<NeighbourhoodPriceAverage>> GetAveragePricePerNeighbourhood()
    {
        var listings = await _repository.GetAll();

        return listings
            .GroupBy(listing => listing.Neighbourhood)
            .Select(neighbourhood => new NeighbourhoodPriceAverage
            {
                Neighbourhood = neighbourhood.Key,
                PriceAverage = neighbourhood.Average(listing => Convert.ToDouble(listing.Price?.Replace("$", "")))
            });
    }

    public async Task<IEnumerable<NeighbourhoodRatingAverage>> GetAverageRatingPerNeighbourhood()
    {
        var listings = await _repository.GetAll();

        return listings
            .GroupBy(listing => listing.Neighbourhood)
            .Select(neighbourhood => new NeighbourhoodRatingAverage
            {
                Neighbourhood = neighbourhood.Key,
                RatingAverage = neighbourhood.Average(listing => listing.ReviewScoresRating / 10)
            });
    }
}