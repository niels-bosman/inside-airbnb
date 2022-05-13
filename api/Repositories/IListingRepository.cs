using api.Dto;

namespace api.Repositories;

public interface IListingRepository
{
     Task<IEnumerable<ListingDto>> GetAll();
}