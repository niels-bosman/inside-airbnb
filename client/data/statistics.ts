import { Listing } from '../models/Listing'

export const getUniqueNeighbourhoods = (listings: Listing[]): string[] => {
  return listings
    .map(item => item.neighbourhood)
    .filter((value, index, self) => self.indexOf(value) === index)
}
