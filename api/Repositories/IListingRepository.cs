using api.Dto;
using api.Models;

namespace api.Repositories;

public interface IListingRepository
{
     Task<IEnumerable<ListingDto>> GetAll();

     Task<Listing?> Get(int id);
}