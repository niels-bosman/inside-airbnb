import { Listing } from "../models/Listing";
import { Feature, Geometry } from "geojson";

export const toGeoJson = (listing: Listing): Feature<Geometry, { [name: string]: any; }> => {
  const formatCoordinate = (coordinate: number, dotOffset: number): number => (
    parseFloat(coordinate.toString().substring(0, dotOffset) + '.' + coordinate.toString().substring(dotOffset))
  )

  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [formatCoordinate(listing.longitude, 1), formatCoordinate(listing.latitude, 2)]
    },
    properties: { id: listing.id, name: listing.name, price: listing.price }
  }
}
