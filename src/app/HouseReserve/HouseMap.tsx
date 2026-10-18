"use client";

import { useEffect, useRef, useState } from "react";
import type nmp_mapboxgl from "@neshan-maps-platform/mapbox-gl";
import "@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css";

type NmpMap = InstanceType<typeof nmp_mapboxgl.Map>;
type NmpMarker = InstanceType<typeof nmp_mapboxgl.Marker>;

export interface MapMarker {
    id: string | number;
    lat: number;
    lng: number;
    title?: string;
}

interface HouseMapProps {
    markers: MapMarker[];
}

const MAP_KEY = process.env.NEXT_PUBLIC_NESHAN_MAP_KEY;

const INITIAL_CENTER: [number, number] = [53.688, 32.4279]; // [lng, lat]
const INITIAL_ZOOM = 5;
const SINGLE_MARKER_ZOOM = 14;

export const HouseMap = ({ markers }: HouseMapProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const nmpRef = useRef<typeof nmp_mapboxgl | null>(null);
    const markersRef = useRef<NmpMarker[]>([]);

    const [map, setMap] = useState<NmpMap | null>(null);

    // ساخت نقشه (فقط یک بار)
    useEffect(() => {
        let cancelled = false;
        let instance: NmpMap | null = null;

        const init = async () => {
            if (!MAP_KEY) {
                console.error("NEXT_PUBLIC_NESHAN_MAP_KEY تنظیم نشده");
                return;
            }

            const nmp = (await import("@neshan-maps-platform/mapbox-gl")).default;

            if (cancelled || !containerRef.current) return;

            nmpRef.current = nmp;

            instance = new nmp.Map({
                mapType: nmp.Map.mapTypes.neshanVector,
                container: containerRef.current,
                mapKey: MAP_KEY,
                center: INITIAL_CENTER,
                zoom: INITIAL_ZOOM,
                poi: true,
                traffic: false,
                trackResize: true,
            });

            setMap(instance);
        };

        init();

        return () => {
            cancelled = true;
            markersRef.current.forEach((marker) => marker.remove());
            markersRef.current = [];
            instance?.remove();
        };
    }, []);

    useEffect(() => {
        const nmp = nmpRef.current;
        if (!map || !nmp) return;

        markersRef.current.forEach((marker) => marker.remove());

        markersRef.current = markers.map((item) => {
            const marker = new nmp.Marker().setLngLat([item.lng, item.lat]);

            if (item.title) {
                marker.setPopup(new nmp.Popup({ offset: 25 }).setText(item.title));
            }

            return marker.addTo(map);
        });
    }, [map, markers]);

    useEffect(() => {
        if (!map || markers.length === 0) return;

        if (markers.length === 1) {
            map.flyTo({
                center: [markers[0].lng, markers[0].lat],
                zoom: SINGLE_MARKER_ZOOM,
                essential: true,
            });
            return;
        }

        const lngs = markers.map((item) => item.lng);
        const lats = markers.map((item) => item.lat);

        map.fitBounds(
            [
                [Math.min(...lngs), Math.min(...lats)],
                [Math.max(...lngs), Math.max(...lats)],
            ],
            { padding: 50, maxZoom: 15, duration: 800 },
        );
    }, [map, markers]);

    return <div ref={containerRef} className="h-full w-full" />;
};