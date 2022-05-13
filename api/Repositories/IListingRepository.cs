using api.Models;

namespace api.Repositories;

public interface IListingRepository
{
     Task<IEnumerable<Listing>> GetAll();
}