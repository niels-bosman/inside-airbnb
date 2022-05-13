using api.Models;

namespace api.Repositories;

public class ListingRepository : IListingRepository
{
    public Task<IEnumerable<Listing>> GetAll()
    {
        throw new NotImplementedException();
    }

    public Task<Listing> Get(int id)
    {
        throw new NotImplementedException();
    }

    public Task<Listing> Update(int id, Listing listing)
    {
        throw new NotImplementedException();
    }

    public Task<Listing> Create(Listing listing)
    {
        throw new NotImplementedException();
    }

    public Task Delete(int id)
    {
        throw new NotImplementedException();
    }

    public Task<bool> Exists(int id)
    {
        throw new NotImplementedException();
    }
}