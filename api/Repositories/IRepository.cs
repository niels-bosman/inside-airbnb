namespace api.Repositories;

public interface IRepository<T>
{
     Task<IEnumerable<T>> GetAll();
     Task<T> Get(int id);
     Task<T> Update(int id, T model);
     Task<T> Create(T model);
     Task Delete(int id);
     Task<bool> Exists(int id);
}