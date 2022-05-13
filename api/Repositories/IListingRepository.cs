using api.Models;

namespace api.Repositories;

public interface IListingRepository
{
     Task<IEnumerable<Listing>> GetAll();
     Task<Listing> Get(int id);
     Task<Listing> Update(int id, Listing listing);
     Task<Listing> Create(Listing listing);
     Task Delete(int id);
     Task<bool> Exists(int id);
}