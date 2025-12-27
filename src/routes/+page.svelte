<script>
  import Map from "$lib/components/Map.svelte";
  import Spotlight from "$lib/components/Spotlight.svelte";
  import FallingDots from "$lib/components/FallingDots.svelte";
  import ScrollWatcher from "$lib/components/ScrollWatcher.svelte";
  import Scene1 from "$lib/scenes/Scene1.svelte";
  import SummaryScene from "$lib/scenes/SummaryScene.svelte"; 
  import IncidentLabel from "$lib/components/IncidentLabel.svelte";
  import { incidents } from "$lib/data/incidents.js";

  let mapRef;
  let activeIndex = -1;
  let showSummary = false;

  // 🔑 index → { x, y }
  let labelPositions = {};

  function handlePosition({ index, x, y }) {
  labelPositions[index] = { x, y };
  }

  function enterIncident(i) {
    activeIndex = i;
    showSummary = false;
  }

  function exitIncident(i) {
    // let dot fade naturally
    if (activeIndex === i) {
      activeIndex = -1;
    }
  }

  function enterSummary() {
    activeIndex = -1;
    showSummary = true;
  }

</script>

<!-- MAP LAYER -->
<Map 
  bind:map={mapRef}
  dimmed={activeIndex === -1 && !showSummary}/>

<Spotlight />

{#if mapRef}
  <FallingDots
    map={mapRef}
    {activeIndex}
    onPosition={handlePosition}
  />

  <!-- Active label only -->
  {#if activeIndex >= 0 && labelPositions[activeIndex]}
    <IncidentLabel
      text={`${incidents[activeIndex].year}: ${incidents[activeIndex].title}`}
      x={labelPositions[activeIndex].x}
      y={labelPositions[activeIndex].y}
      active
    />
  {/if}
{/if}

<!-- SCROLL STORY -->
<div class="scroll-container">

  {#each incidents as incident, i}
    <ScrollWatcher
      index={i}
      on:enter={() => enterIncident(i)}
      on:exit={() => exitIncident(i)}
    >
      <div class="step">
        <div class="scene-text">
          <p class:item-active={activeIndex === i}>
            {incident.year}. {incident.title}. {incident.description}
          </p>
        </div>
      </div>
    </ScrollWatcher>
  {/each}

  <!-- SUMMARY -->
  <ScrollWatcher on:enter={enterSummary}>
    <div class="step summary-step">
      <SummaryScene {showSummary} />
    </div>
  </ScrollWatcher>

</div>

<style>
.scroll-container {
  position: relative;
  z-index: 50;
  width: 45%;
  padding-left: 2rem;
}

.step {
  min-height: 120vh;
  display: flex;
  align-items: center;
}

.scene-text {
  height: 100vh;
  padding-left: 4rem;
  padding-top: 20vh;
  padding-bottom: 10vh;
  z-index: 40;
}

p {
  opacity: 0.25;
  font-size: 1.6rem;
  transition: opacity .4s ease, transform .4s ease;
  margin-bottom: 3rem;
  transform: translateY(6px);
  color: #e6e6e6;
  max-width: 80%;
}

p.item-active {
  opacity: 1;
  font-weight: 700;
  transform: translateY(0);
}

.summary-step {
  min-height: 120vh;
}
</style>

