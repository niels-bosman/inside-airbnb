using api.Dto;
using api.Models;

namespace api.Mappers;

public class ListingMapper : IMapper<Listing, ListingDto>
{
    public ListingDto ToDto(Listing model)
    {
        return new ListingDto
        {
            Id = model.Id,
            Latitude = model.Latitude,
            Longitude = model.Longitude,
            Name = model.Name,
            Price = model.Price
        };
    }

    public Listing ToModel(ListingDto dto)
    {
        return new Listing
        {
            Id = dto.Id,
            Latitude = dto.Latitude,
            Longitude = dto.Longitude,
            Name = dto.Name,
            Price = dto.Price
        };
    }
}