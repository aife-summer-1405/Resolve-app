"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface ILocation {
  lat: number;
  lng: number;
}

interface IProps {
  location: ILocation | null;
  onLocationChange: (location: ILocation) => void;
}

const markerIcon = L.divIcon({
  className: "",
  html: `<div style="width:26px;height:26px;background:#91FF45;border:3px solid #202020;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 2px 6px rgba(0,0,0,0.3)"></div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 26],
});

function MapClickHandler({
  onLocationChange,
}: {
  onLocationChange: (location: ILocation) => void;
}) {
  useMapEvents({
    click(event) {
      onLocationChange({
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      });
    },
  });

  return null;
}

export default function PropertyLocationMap({
  location,
  onLocationChange,
}: IProps) {
  return (
    <MapContainer
  key="property-location-map"
  center={[32.4279, 53.688]}
  zoom={5}
  minZoom={4}
  maxZoom={19}
  scrollWheelZoom
  className="h-full w-full"
>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClickHandler onLocationChange={onLocationChange} />

      {location && (
        <Marker
          position={[location.lat, location.lng]}
          icon={markerIcon}
        />
      )}
    </MapContainer>
  );
}