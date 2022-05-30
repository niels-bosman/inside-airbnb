#nullable disable
using api.Dto;
using Microsoft.AspNetCore.Mvc;
using api.Repositories;
using Microsoft.Extensions.Caching.Distributed;
using Newtonsoft.Json;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ListingController : ControllerBase
    {
        private readonly IListingRepository _repository;
        private readonly IDistributedCache _cache;
        private readonly TimeSpan _cacheTimeout = TimeSpan.FromDays(1);

        public ListingController(IListingRepository repository, IDistributedCache cache)
        {
            _repository = repository;
            _cache = cache;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ListingDto>>> GetListing()
        {
            const string cacheKey = "all-listings";
            var cachedListings = await _cache.GetStringAsync(cacheKey);

            if (cachedListings != null)
            {
                return Ok(JsonConvert.DeserializeObject<List<ListingDto>>(cachedListings));
            }
            
            var listings = await _repository.GetAll();

            await _cache.SetStringAsync(
                cacheKey,
                JsonConvert.SerializeObject(listings),
                new DistributedCacheEntryOptions().SetSlidingExpiration(_cacheTimeout)
            );
            
            return Ok(listings);
        }
    }
}
