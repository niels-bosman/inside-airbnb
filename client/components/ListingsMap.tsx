import Map, { Layer, MapLayerMouseEvent, Source } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { clusterCountLayer, clusterLayer, unclusteredPointLayer } from '../data/layers'
import React from 'react'
import { Listing } from '../models/Listing'
import { toGeoJson } from '../mappers/listings-mapper'
import { ExtendedListing } from '../models/ExtendedListing'
import axios from 'axios'

type Props = {
  listings: Listing[],
  onListingSelect: Function,
}

const ListingsMap: React.FC<Props> = ({ listings, onListingSelect }) => {
  const fetchListing = async (id: number): Promise<ExtendedListing> => {
    const { NEXT_PUBLIC_API_URL } = process.env
    return (await axios.get(`${NEXT_PUBLIC_API_URL}/listing/${id}`)).data
  }

  const handleMapClick = async (e: MapLayerMouseEvent) => {
    if (!e?.features) return

    const id = e.features[0].properties.id
    const listing = await fetchListing(id)

    onListingSelect(listing)
  }

  return (
    <Map
      interactiveLayerIds={[unclusteredPointLayer.id!]}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
      initialViewState={{ latitude: 52.36, longitude: 4.90, zoom: 11 }}
      style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }}
      mapStyle="mapbox://styles/mapbox/dark-v10"
      onClick={handleMapClick}
    >
      <Source
        id="earthquakes"
        type="geojson"
        data={{
          type: 'FeatureCollection',
          features: listings.map(toGeoJson)
        }}
        cluster={true}
        clusterMaxZoom={14}
        clusterRadius={50}
      >
        <Layer {...clusterLayer} />
        <Layer {...clusterCountLayer} />
        <Layer {...unclusteredPointLayer} />
      </Source>
    </Map>
  )
}

export default ListingsMap
