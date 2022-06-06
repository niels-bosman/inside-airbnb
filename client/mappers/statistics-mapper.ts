import { ListingAmountPerNeighbourhood } from '../models/ListingAmountPerNeighbourhood'
import { PriceAveragePerNeighbourhood } from '../models/PriceAveragePerNeighbourhood'
import { RatingAveragePerNeighbourhood } from '../models/RatingAveragePerNeighbourhood'

export const listingAmountToPie = (statistics: ListingAmountPerNeighbourhood[]) => {
  return {
    labels: statistics.map(statistic => statistic.neighbourhood),
    datasets: [
      {
        data: statistics.map(statistic => statistic.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      }
    ]
  }
}

export const priceAverageToBar = (statistics: PriceAveragePerNeighbourhood[]) => {
  return {
    labels: statistics.map(statistic => statistic.neighbourhood),
    datasets: [
      {
        label: 'Average price',
        data: statistics.map(statistic => statistic.priceAverage),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  }
}

export const ratingAverageToBar = (statistics: RatingAveragePerNeighbourhood[]) => {
  return {
    labels: statistics.map(statistic => statistic.neighbourhood),
    datasets: [
      {
        label: 'Average rating',
        data: statistics.map(statistic => statistic.ratingAverage),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  }
}
