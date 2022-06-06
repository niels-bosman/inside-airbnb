namespace api.Models;

public class NeighbourhoodListingAmount
{
    public string? Neighbourhood { get; set; }
    public int Amount { get; set; }
}

public class NeighbourhoodPriceAverage
{
    public string? Neighbourhood { get; set; }
    public double? PriceAverage { get; set; }
}

public class NeighbourhoodRatingAverage
{
    public string? Neighbourhood { get; set; }
    public double? RatingAverage { get; set; }
}