<!-- src/lib/components/FallingDots.svelte -->
<script>
  import { tick } from "svelte";
  import { incidentCases } from "$lib/data/incidentCases.js";
  import { projectToScreen } from "$lib/utils/geoProject.js";

  export let map;
  export let activeIndex = -1;
  export let onPosition;

  let dots = [];

  $: if (map && activeIndex >= 0) {
    const group = incidentCases.filter(d => d.group === incidentCases[activeIndex].group);
    group.forEach((dot, i) => {
      const realIndex = incidentCases.findIndex(x => x.id === dot.id);
      drop(realIndex, i * 400);
    });
  }

  async function drop(idx, delay = 0) {
    const dot = dots[idx];
    if (!dot) return;
    dot.visible = true;
    const pos = projectToScreen(map, incidentCases[idx]);
    dot.x = pos.x; dot.y = -50;
    dot.target = pos.y;
    await new Promise(r => setTimeout(r, delay));
    while (dot.y < dot.target) {
      dot.y += 10;
      dots = [...dots];
      if (onPosition) onPosition({ index: idx, x: dot.x, y: dot.y });
      await tick();
    }
  }

  // Setup
  onMount(() => {
    const w = window.innerWidth;
    dots = incidentCases.map(i => ({ x: w*0.55, y: -50, visible: false }));
  });
</script>

{#each dots as d, i}
  <div class="dot" style="left:{d.x}px; top:{d.y}px; opacity:{d.visible?1:0}"></div>
{/each}

<style>
.dot {
  position: fixed;
  width: 14px;
  height: 14px;
  background: #b50000;
  border-radius: 50%;
  z-index: 25;
  pointer-events: none;
  transition: opacity 0.4s ease;
}
</style>
