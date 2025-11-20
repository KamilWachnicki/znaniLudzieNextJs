"use client";

import { useEffect } from "react";

export default function LoadLeaflet() {
  useEffect(() => {
    import("leaflet").then((L) => {
      import("leaflet/dist/leaflet.css");

      const icon = require("leaflet/dist/images/marker-icon.png");
      const iconShadow = require("leaflet/dist/images/marker-shadow.png");

      const DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      L.Marker.prototype.setIcon(DefaultIcon);
    });
  }, []);

  return null;
}
