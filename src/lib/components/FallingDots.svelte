<script>
  import { onMount, tick } from "svelte";
  import { incidents } from "$lib/data/incidents.js";
  import { projectToScreen } from "$lib/utils/geoProject.js";

  export let map;
  export let activeIndex = -1;
  export let onPosition = null;


  let dots = [];

  onMount(() => {
    const w = window.innerWidth;
    
    // Initialize dots for all incidents
    dots = incidents.map((_, i) => ({
      i,  // This is i, not index
      x: w * 0.55,
      y: -50,
      targetY: null,
      landed: false,
      visible: false
    }));
  });

  $: if (map && activeIndex >= 0 && activeIndex < incidents.length) {
    const dot = dots[activeIndex];
    if (dot && !dot.landed) {
      drop(dot);
    }
  }

  // Make dots invisible when not active
  $: if (activeIndex === -1) {
    // Hide all dots
    dots.forEach(d => {
      if (d.landed) {
        d.visible = false;
        d.landed = false;
      }
    });
    dots = [...dots];
  }

  async function drop(dot) {
  dot.visible = true;

  const pos = projectToScreen(map, incidents[dot.i].coords);
  if (!pos) return;

  dot.x = pos.x;
  dot.targetY = pos.y;
  dot.y = -50;

  while (dot.y < dot.targetY) {
    dot.y += 12;
    dots = [...dots];

    // LIVE POSITION
    if (onPosition) {
      onPosition({ index: dot.i, x: dot.x, y: dot.y });
    }

    await tick();
  }

  dot.landed = true;
  dots = [...dots];

  // FINAL POSITION
  if (onPosition) {
    onPosition({ index: dot.i, x: dot.x, y: dot.targetY });
  }
}

</script>

{#each dots as d (d.i)}
  <!-- FIX: Use d.i for comparison, not d.index -->
  <div
    class="dot"
    class:active={d.visible && d.i === activeIndex}
    style="left:{d.x}px; top:{d.y}px"
  ></div>
{/each}

<style>
.dot {
  position: fixed;
  width: 14px;
  height: 14px;
  background: #b50000;
  border-radius: 50%;
  z-index: 20;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.dot.active {
  opacity: 1;
}

.dot::after {
  content: "";
  position: absolute;
  inset: -8px;
  border-radius: 50%;
  border: 1px solid rgba(181, 0, 0, 0.6);
  opacity: 0;
  transform: scale(0.6);
}

.dot.active::after {
  animation: pulse 700ms ease-out;
}

@keyframes pulse {
  0% {
    opacity: 0.8;
    transform: scale(0.6);
  }
  100% {
    opacity: 0;
    transform: scale(1.4);
  }
}

</style>