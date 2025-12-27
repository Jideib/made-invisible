<script>
  import { onMount } from "svelte";
  import maplibregl from "maplibre-gl";

  export let map;        // bound outward
  export let dimmed = true; // 👈 NEW

  let mapDiv;

  onMount(() => {
    if (typeof window === "undefined") return;

    const instance = new maplibregl.Map({
      container: mapDiv,
      style: "/map-style-dark.json",
      center: [8.6753, 9.0820],
      zoom: 5,
      dragPan: false,
      scrollZoom: false,
      dragRotate: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      touchZoomRotate: false,
      attributionControl: false
    });

    map = instance;
  });
</script>

<!-- wrap mapDiv so we can animate safely -->
<div class="map-wrap" class:dimmed>
  <div bind:this={mapDiv} class="map"></div>
</div>

<style>
.map-wrap {
  position: fixed;
  inset: 0;
  z-index: 1;
  transition: opacity 0.8s ease;
}

.map-wrap.dimmed {
  opacity: 0.82;
}

.map {
  width: 100vw;
  height: 100vh;
  filter: brightness(0.75) contrast(1.1);
}

.map-wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 2;

  background: radial-gradient(
    ellipse at center,
    rgba(0, 0, 0, 0) 45%,
    rgba(0, 0, 0, 0.28) 100%
  );
}

</style>
