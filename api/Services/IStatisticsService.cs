using api.Models;

namespace api.Services;

public interface IStatisticsService
{
    Task<IEnumerable<NeighbourhoodListingAmount>> GetListingAmountPerNeighbourhood();
    
    Task<IEnumerable<NeighbourhoodPriceAverage>> GetAveragePricePerNeighbourhood();
    
    Task<IEnumerable<NeighbourhoodRatingAverage>> GetAverageRatingPerNeighbourhood();
}