using api.Models;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StatisticsController : ControllerBase
{
    private readonly IDistributedCache _cache;
    private readonly IStatisticsService _service;
    private readonly TimeSpan _cacheTimeout = TimeSpan.FromMinutes(15);

    public StatisticsController(IStatisticsService service, IDistributedCache cache)
    {
        _service = service;
        _cache = cache;
    }

    [HttpGet("listing-amount-per-neighbourhood")]
    [Authorize(Policy = "ReadStatisticsAccess")]
    public async Task<IActionResult> GetListingAmountPerNeighbourhood()
    {
        const string cacheKey = "listing-amount-per-neighbourhood";
        var cached = await _cache.GetStringAsync(cacheKey);
        
        if (cached != null)
        {
            return Ok(JsonConvert.DeserializeObject<IEnumerable<NeighbourhoodListingAmount>>(cached));
        }
            
        var statistics = await _service.GetListingAmountPerNeighbourhood();
        
        await _cache.SetStringAsync(
            cacheKey,
            JsonConvert.SerializeObject(statistics),
            new DistributedCacheEntryOptions().SetSlidingExpiration(_cacheTimeout)
        );
        
        return Ok(statistics);
    }

    [HttpGet("average-price-per-neighbourhood")]
    [Authorize(Policy = "ReadStatisticsAccess")]
    public async Task<IActionResult> GetAveragePricePerNeighbourhood()
    {
        const string cacheKey = "average-price-per-neighbourhood";
        var cached = await _cache.GetStringAsync(cacheKey);
        
        if (cached != null)
        {
            return Ok(JsonConvert.DeserializeObject<IEnumerable<NeighbourhoodPriceAverage>>(cached));
        }
            
        var statistics = await _service.GetAveragePricePerNeighbourhood();
        
        await _cache.SetStringAsync(
            cacheKey,
            JsonConvert.SerializeObject(statistics),
            new DistributedCacheEntryOptions().SetSlidingExpiration(_cacheTimeout)
        );
        
        return Ok(statistics);
    }

    [HttpGet("average-rating-per-neighbourhood")]
    [Authorize(Policy = "ReadStatisticsAccess")]
    public async Task<IActionResult> GetAverageRatingPerNeighbourhood()
    {
        const string cacheKey = "average-rating-per-neighbourhood";
        var cached = await _cache.GetStringAsync(cacheKey);
        
        if (cached != null)
        {
            return Ok(JsonConvert.DeserializeObject<IEnumerable<NeighbourhoodRatingAverage>>(cached));
        }
            
        var statistics = await _service.GetAverageRatingPerNeighbourhood();
        
        await _cache.SetStringAsync(
            cacheKey,
            JsonConvert.SerializeObject(statistics),
            new DistributedCacheEntryOptions().SetSlidingExpiration(_cacheTimeout)
        );
        
        return Ok(statistics);
    }
}