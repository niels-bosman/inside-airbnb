namespace api.Dto;

public class ListingDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string? Price { get; set; }
    public string? Neighbourhood { get; set; }
    public int NumberOfReviews { get; set; }
}