<script>
  import { onMount, createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  export let spotlight = null;

  let mapDiv;
  let mapInstance = null;
  let smooth = { x: 0, y: 0, r: 120 };

  function radiusFromDeaths(deaths = 0) {
    const min = 80;
    const max = 260;
    const capped = Math.min(deaths, 1000);
    return min + (capped / 1000) * (max - min);
  }

  function lerp(a, b, t = 0.12) {
    return a + (b - a) * t;
  }

  onMount(async () => {
    const maplibregl = await import("maplibre-gl");
    
    mapInstance = new maplibregl.default.Map({
      container: mapDiv,
      style: {
        "version": 8,
        "sources": {
          // Nigeria states GeoJSON ONLY - no world map
          "nigeria-states": {
            "type": "geojson",
            "data": "/nigeria-states.geojson"
          }
        },
        "layers": [
          // Black background
          {
            "id": "background",
            "type": "background",
            "paint": {
              "background-color": "#111111"
            }
          },
          // Nigeria states fill
          {
            "id": "nigeria-fill",
            "type": "fill",
            "source": "nigeria-states",
            "paint": {
              "fill-color": "#111111",
              "fill-opacity": 0.4
            }
          },
          // Nigeria boundaries
          {
            "id": "nigeria-boundaries",
            "type": "line",
            "source": "nigeria-states",
            "paint": {
              "line-color": "#333333",
              "line-width": 1.5,
              "line-opacity": 0.3
            }
          }
        ]
      },
      center: [8.6753, 9.0820],
      zoom: 5.5,
      maxZoom: 8,
      minZoom: 5,
      interactive: false,
      attributionControl: false,
      preserveDrawingBuffer: true
    });

    // Fit map to Nigeria bounds (approximate)
    mapInstance.on('load', () => {
      // Fit to Nigeria's approximate bounds
      const nigeriaBounds = [
        [2.67, 4.24],  // Southwest
        [14.68, 13.89]  // Northeast
      ];
      
      mapInstance.fitBounds(nigeriaBounds, {
        padding: 50,
        duration: 0
      });
      
      dispatch("ready", { detail: mapInstance });
    });

    return () => {
      if (mapInstance) mapInstance.remove();
    };
  });

  $: {
    if (spotlight && window.innerWidth > 0) {
      smooth.x = lerp(smooth.x, spotlight.x);
      smooth.y = lerp(smooth.y, spotlight.y);
      smooth.r = lerp(smooth.r, radiusFromDeaths(spotlight.deaths));
    } else if (window.innerWidth > 0) {
      smooth.x = lerp(smooth.x, window.innerWidth / 2);
      smooth.y = lerp(smooth.y, window.innerHeight / 2);
      smooth.r = lerp(smooth.r, 120);
    }
  }
</script>

<div class="map-wrap">
  <div bind:this={mapDiv} class="map"></div>

  <div
    class="spotlight"
    style="
      --x:{smooth.x}px;
      --y:{smooth.y}px;
      --r:{smooth.r}px;
    "
  ></div>
</div>

<style>
.map-wrap {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: #111;
}

.map {
  width: 100%;
  height: 100%;
}

.spotlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 4;
  background: radial-gradient(
    circle var(--r) at var(--x) var(--y),
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0.08) 40%,
    rgba(17, 17, 17, 0.95) 100%
  );
  transition: background 0.4s ease-out;
  mix-blend-mode: screen;
}
</style>