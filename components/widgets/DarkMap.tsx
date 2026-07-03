'use client';

import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';

interface DarkMapProps {
  lat: number;
  lon: number;
  zoom?: number;
  className?: string;
}

const TILE_URL =
  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';

function createMarkerHtml() {
  return `<div style="
    width:16px;height:16px;
    background:#ffb000;
    border:3px solid #141311;
    border-radius:50%;
    box-shadow:0 0 0 4px rgba(255,176,0,0.25);
  "></div>`;
}

export default function DarkMap({
  lat,
  lon,
  zoom = 13,
  className = '',
}: DarkMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import('leaflet').Map | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let map: import('leaflet').Map;

    import('leaflet').then(L => {
      // Guard: if container already has a leaflet instance, skip
      if (mapRef.current) return;

      // Suppress default icon resolution errors
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '',
        iconUrl: '',
        shadowUrl: '',
      });

      map = L.map(containerRef.current!, {
        center: [lat, lon],
        zoom,
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        touchZoom: false,
        keyboard: false,
        boxZoom: false,
      });

      const tileLayer = L.tileLayer(TILE_URL, { maxZoom: 19 }).addTo(map);

      L.marker([lat, lon], {
        icon: L.divIcon({
          className: '',
          html: createMarkerHtml(),
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        }),
      }).addTo(map);

      // Fix gray tile flash: invalidate on tile load and at staggered intervals
      tileLayer.on('load', () => map.invalidateSize());
      setTimeout(() => map.invalidateSize(), 100);
      setTimeout(() => map.invalidateSize(), 500);

      mapRef.current = map;
    });

    return () => {
      // Full teardown so the next mount always starts clean
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // Props are stable (SITE.lat/lon never change), safe to omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className={`${className} bg-muted`} />;
}
