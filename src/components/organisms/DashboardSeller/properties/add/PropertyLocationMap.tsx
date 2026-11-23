
"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "@neshan-maps-platform/maplibre-sdk";
import "@neshan-maps-platform/maplibre-sdk/style.css";

interface ILocation {
  lat: number;
  lng: number;
}

interface ISearchResult {
  title: string;
  address: string;
  location: {
    x: number;
    y: number;
  };
}

interface IProps {
  location: ILocation | null;
  address: string;
  onLocationChange: (location: ILocation) => void;
  onAddressChange: (address: string) => void;
}

const INITIAL_LOCATION: ILocation = {
 lat: 35.6892,
  lng: 51.389,
};

const PropertyLocationMap = ({
  location,
  address,
  onLocationChange,
  onAddressChange,
}: IProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markerRef = useRef<maplibregl.Marker | null>(null);

  const skipNextSearchRef = useRef(false);
  const callbacksRef = useRef({
    onLocationChange,
    onAddressChange,
  });

  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  callbacksRef.current = {
    onLocationChange,
    onAddressChange,
  };

  const updateMarker = (loc: ILocation) => {
    const map = mapRef.current;

    if (!map) return;

    const coordinates: [number, number] = [loc.lng, loc.lat];

    if (markerRef.current) {
      markerRef.current.setLngLat(coordinates);
    } else {
      markerRef.current = new maplibregl.Marker({
        color: "#91FF45",
      })
        .setLngLat(coordinates)
        .addTo(map);
    }
  };

  const reverseGeocode = async (loc: ILocation) => {
    try {
      const params = new URLSearchParams({
        type: "reverse",
        lat: String(loc.lat),
        lng: String(loc.lng),
      });

      const response = await fetch(`/api/neshan?${params}`);

      if (!response.ok) {
        throw new Error("Reverse geocoding failed");
      }

      const data = await response.json();

      const resolvedAddress = [
        data.neighbourhood,
        data.address,
        data.city,
        data.state,
      ]
        .filter(Boolean)
        .filter(
          (value: string, index: number, array: string[]) =>
            array.indexOf(value) === index
        )
        .join("، ");

      if (resolvedAddress) {
        skipNextSearchRef.current = true;
        callbacksRef.current.onAddressChange(resolvedAddress);
      }
    } catch {
      setSearchError("دریافت آدرس این موقعیت با خطا مواجه شد");
    }
  };

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const initialLocation = location ?? INITIAL_LOCATION;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: "https://static.neshan.org/sdk/maplibre/styles/light.json",
      center: [initialLocation.lng, initialLocation.lat],
      zoom: location ? 15 : 5,
      apiKey: process.env.NEXT_PUBLIC_NESHAN_MAP_KEY,
    });

    mapRef.current = map;

    map.on("load", () => {
      if (location) {
        updateMarker(location);
      }
    });

    map.on("click", async (event) => {
      const loc = {
        lat: event.lngLat.lat,
        lng: event.lngLat.lng,
      };

      updateMarker(loc);
      callbacksRef.current.onLocationChange(loc);

      setSearchResults([]);
      setSearchError("");

      await reverseGeocode(loc);
    });

    return () => {
      markerRef.current?.remove();
      markerRef.current = null;

      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!location || !mapRef.current) return;

    updateMarker(location);
  }, [location?.lat, location?.lng]);

  useEffect(() => {
    const term = address.trim();

    if (skipNextSearchRef.current) {
      skipNextSearchRef.current = false;
      return;
    }

    if (term.length < 3) {
      setSearchResults([]);
      setSearchError("");
      return;
    }

    const controller = new AbortController();

    const timeout = setTimeout(async () => {
      try {
        setSearchLoading(true);
        setSearchError("");

        const center = location ?? INITIAL_LOCATION;

        const params = new URLSearchParams({
          type: "search",
          term,
          lat: String(center.lat),
          lng: String(center.lng),
        });

        const response = await fetch(`/api/neshan?${params}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const data = await response.json();

        setSearchResults(data.items ?? []);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setSearchError("جستجوی مکان با خطا مواجه شد");
        }
      } finally {
        if (!controller.signal.aborted) {
          setSearchLoading(false);
        }
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [address, location?.lat, location?.lng]);

  const handleSelectResult = (result: ISearchResult) => {
    const loc = {
      lat: result.location.y,
      lng: result.location.x,
    };

    skipNextSearchRef.current = true;

    updateMarker(loc);

    mapRef.current?.flyTo({
      center: [loc.lng, loc.lat],
      zoom: 16,
      essential: true,
    });

    callbacksRef.current.onLocationChange(loc);
    callbacksRef.current.onAddressChange(
      result.address || result.title
    );

    setSearchResults([]);
    setSearchError("");
  };

  return (
    <div className="relative h-full w-full">
      <div
        ref={mapContainerRef}
        className="h-full w-full"
      />

      {(searchLoading || searchResults.length > 0 || searchError) && (
        <div
          dir="rtl"
          className="absolute left-3 right-3 top-3 z-10 max-h-[220px] overflow-y-auto rounded-xl border border-border bg-background shadow-lg"
        >
          {searchLoading && (
            <p className="p-3 text-xs text-muted">
              در حال جستجوی مکان...
            </p>
          )}

          {searchError && (
            <p className="p-3 text-xs text-red-500">
              {searchError}
            </p>
          )}

          {searchResults.map((result, index) => (
            <button
              key={`${result.location.x}-${result.location.y}-${index}`}
              type="button"
              onClick={() => handleSelectResult(result)}
              className="flex w-full flex-col gap-1 border-b border-border px-3 py-3 text-right transition last:border-none hover:bg-card"
            >
              <span className="text-xs font-semibold text-foreground">
                {result.title}
              </span>

              <span className="text-[10px] text-muted">
                {result.address}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyLocationMap;
