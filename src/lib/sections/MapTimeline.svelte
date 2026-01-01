<script>
  import { onMount } from "svelte";
  import Map from "$lib/components/Map.svelte";
  import FallingDots from "$lib/components/FallingDots.svelte";
  import IncidentLabel from "$lib/components/IncidentLabel.svelte";
  import ScrollWatcher from "$lib/components/ScrollWatcher.svelte";
  import { incidentCases } from "$lib/data/incidentCases.js";

  export let onDim;      // triggers dimming outward → +page.svelte
  let map;
  let activeIndex = -1;
  let mounted = false;

  const labelPositions = {};

  onMount(() => {
    mounted = true;
  });

  function enter(i) {
    activeIndex = i;
    // when user reaches the 1st meaningful incident → dim map
    if (i === 1) onDim?.();
  }

  function exit(i) {
    if (activeIndex === i) activeIndex = -1;
  }

  function registerLabel({ index, x, y }) {
    labelPositions[index] = { x, y };
  }
</script>

<div class="timeline">
  <!-- MAP: only create once, never inside {#if} to avoid recursion -->
  <Map bind:map dimmed={false} />

  <!-- falling dots only when browser + map exists -->
  {#if mounted && map}
    <FallingDots {map} {activeIndex} on:position={registerLabel} />
  {/if}

  <!-- scroll list -->
  <div class="scroll">
    {#each incidentCases as item, i}
      <ScrollWatcher index={i} on:enter={() => enter(i)} on:exit={() => exit(i)}>
        <div class="step">
          <h3 class:item-active={activeIndex === i}>
            {item.year} — {item.title}
          </h3>
          <p>{item.summary}</p>
        </div>
      </ScrollWatcher>
    {/each}
  </div>

  <!-- floating incident label -->
  {#if activeIndex >= 0 && labelPositions[activeIndex]}
    <IncidentLabel
      text={incidentCases[activeIndex].title}
      x={labelPositions[activeIndex].x}
      y={labelPositions[activeIndex].y}
      active
    />
  {/if}
</div>

<style>
.timeline {
  position: relative;
  height: 100vh;
}
.scroll {
  position: relative;
  width: 42%;
  padding-left: 2.4rem;
  z-index: 10;
}
.step {
  min-height: 120vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
h3 {
  font-size: 2rem;
  opacity: .25;
  transition: opacity .35s, transform .35s;
}
h3.item-active {
  opacity: 1;
  transform: translateX(.4rem);
  font-weight: 700;
}
p { opacity: .7; font-size: 1.05rem; margin-top: .4rem; }
</style>
