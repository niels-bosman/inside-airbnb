import { Listing } from '../models/Listing'

export const getListingsPerNeighbourhood = (listings: Listing[]) => {
  const uniqueNeighbourhoods = getUniqueNeighbourhoods(listings)

  const amount = uniqueNeighbourhoods.map((neighbourhood) => {
    return listings.filter((listing) => listing.neighbourhood == neighbourhood).length
  })

  return {
    labels: uniqueNeighbourhoods,
    datasets: [
      {
        data: amount,
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

export const getAveragePricePerNeighbourhood = (listings: Listing[]) => {
  let neighbourhoods = {}

  listings.forEach((listing) => {
    if (neighbourhoods[listing.neighbourhood] == undefined) {
      neighbourhoods[listing.neighbourhood] = {
        total: 0,
        count: 0,
      }
    }

    neighbourhoods[listing.neighbourhood].total += parseInt(listing.price.replace('$', ''))
    neighbourhoods[listing.neighbourhood].count++
  })

  Object.keys(neighbourhoods).forEach((neighbourhood) => {
    neighbourhoods[neighbourhood].average = neighbourhoods[neighbourhood].total / neighbourhoods[neighbourhood].count
  })

  return {
    labels: Object.keys(neighbourhoods),
    datasets: [
      {
        label: 'Average value',
        data: Object.keys(neighbourhoods).map((neighbourhood) => neighbourhoods[neighbourhood].average),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  }
}

export const getAverageRatingPerNeighbourhood = (listings: Listing[]) => {
  let neighbourhoods = {}

  listings.forEach((listing) => {
    if (neighbourhoods[listing.neighbourhood] == undefined) {
      neighbourhoods[listing.neighbourhood] = {
        total: 0,
        count: 0,
      }
    }

    neighbourhoods[listing.neighbourhood].total += listing.reviewScoresRating / 10
    neighbourhoods[listing.neighbourhood].count++
  })

  Object.keys(neighbourhoods).forEach((neighbourhood) => {
    neighbourhoods[neighbourhood].average = neighbourhoods[neighbourhood].total / neighbourhoods[neighbourhood].count
  })

  return {
    labels: Object.keys(neighbourhoods),
    datasets: [
      {
        label: 'Average rating',
        data: Object.keys(neighbourhoods).map((neighbourhood) => neighbourhoods[neighbourhood].average),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }
    ]
  }
}

export const getUniqueNeighbourhoods = (listings: Listing[]): string[] => {
  return listings
    .map(item => item.neighbourhood)
    .filter((value, index, self) => self.indexOf(value) === index)
}
