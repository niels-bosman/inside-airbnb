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
  token: string,
  onListingSelect: Function,
  API_URL: string,
}

const ListingsMap: React.FC<Props> = ({ listings, token, onListingSelect, API_URL }) => {
  const fetchListing = async (id: number): Promise<ExtendedListing> => (
    (await axios.get(`${API_URL}/listing/${id}`)).data
  )

  const handleMapClick = async (e: MapLayerMouseEvent) => {
    if (!e?.features) return

    const id = e.features[0].properties.id
    const listing = await fetchListing(id)

    onListingSelect(listing)
  }

  return (
    <Map
      interactiveLayerIds={[unclusteredPointLayer.id!]}
      mapboxAccessToken={token}
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
