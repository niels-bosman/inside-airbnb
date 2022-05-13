namespace api.Mappers;

public interface IMapper<T1, T2>
{
    public T2 ToDto(T1 model);
    
    public T1 ToModel(T2 dto);
}