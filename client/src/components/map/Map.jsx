// import { MapContainer, TileLayer } from "react-leaflet";
// import "./map.scss";
// import "leaflet/dist/leaflet.css";
// import Pin from "../pin/Pin";

// function Map({ items }) {
//   return (
//     <MapContainer
//       center={
//         items.length === 1
//           ? [items[0].latitude, items[0].longitude]
//           : [52.4797, -1.90269]
//       }
//       zoom={7}
//       scrollWheelZoom={false}
//       className="map"
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {items.map((item) => (
//         <Pin item={item} key={item.id} />
//       ))}
//     </MapContainer>
//   );
// }

// export default Map;

import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import "./map.scss";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";
import L from "leaflet";

function Map({ items }) {
  const [bounds, setBounds] = useState(null);

  // Recalculate bounds when items change
  useEffect(() => {
    if (items.length > 0) {
      const newBounds = items.map((item) => [item.latitude, item.longitude]);
      setBounds(newBounds);
    }
  }, [items]);

  // Custom component to update map bounds
  const MapUpdater = () => {
    const map = useMap();
    useEffect(() => {
      if (bounds) {
        map.fitBounds(L.latLngBounds(bounds));
      }
    }, [bounds, map]);
    return null;
  };

  return (
    <MapContainer
      center={items.length === 1 ? [items[0].latitude, items[0].longitude] : [52.4797, -1.90269]}
      zoom={items.length === 1 ? 13 : 7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapUpdater />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;

