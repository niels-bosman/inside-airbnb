import Map, { Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { clusterCountLayer, clusterLayer, unclusteredPointLayer } from '../data/layers';
import React from "react";
import { Listing } from "../models/Listing";
import { toGeoJson } from "../mappers/listings-mapper";

type Props = {
  listings: Listing[],
  token: string,
}

const ListingsMap: React.FC<Props> = ({ listings, token }) => (
  <Map
    mapboxAccessToken={token}
    initialViewState={{ latitude: 52.36, longitude: 4.90, zoom: 11 }}
    style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0}}
    mapStyle="mapbox://styles/mapbox/dark-v10"
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

export default ListingsMap
