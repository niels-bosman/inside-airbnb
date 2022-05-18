import Map, { Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { clusterCountLayer, clusterLayer, unclusteredPointLayer } from '../data/layers';

const ListingsMap = ({ listings, token }) => {
  const formatCoordinate = (coordinate, dotOffset) => (
    parseFloat(coordinate.toString().substring(0, dotOffset) + '.' + coordinate.toString().substring(dotOffset))
  )

  const data = {
    type: 'FeatureCollection',
    features: listings.map(({ longitude, latitude, id, name, hostname, neighbourhood, price, numberOfReviews }) => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [formatCoordinate(longitude, 1), formatCoordinate(latitude, 2)]
      },
      properties: { id, name, hostname, neighbourhood, price, numberOfReviews, }
    }))
  };

  return (
    <Map
      mapboxAccessToken={token}
      initialViewState={{ latitude: 52.37, longitude: 4.90, zoom: 10, pitch: 45 }}
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, left: 0}}
      mapStyle="mapbox://styles/mapbox/dark-v10"
    >
      <Source
        id="earthquakes"
        type="geojson"
        data={data}
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
