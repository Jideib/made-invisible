<script>
  import Map from "$lib/components/Map.svelte";
  import Spotlight from "$lib/components/Spotlight.svelte";
  import FallingDots from "$lib/components/FallingDots.svelte";
  import ScrollWatcher from "$lib/components/ScrollWatcher.svelte";
  import SummaryScene from "$lib/scenes/SummaryScene.svelte";
  import IncidentLabel from "$lib/components/IncidentLabel.svelte";
  import { incidents } from "$lib/data/incidents.js";

  export let summaryMarker;

  let mapRef;
  let activeIndex = -1;
  let showSummary = false;
  let showAllDots = false;
  let forceDropAll = false;
  let labelPositions = {};

  function handlePosition({ index, x, y }) {
    labelPositions[index] = { x, y };
  }

  function enterIncident(i) {
    activeIndex = i;
    showSummary = false;
    showAllDots = false;
    forceDropAll = false;
  }

  function exitIncident(i) {
    if (activeIndex === i) activeIndex = -1;
  }

  function enterSummary() {
    activeIndex = -1;
    showSummary = true;
    showAllDots = true;
    forceDropAll = true;   // trigger constellation
  }

  function exitSummary() {
    showSummary = false;
    showAllDots = false;
    forceDropAll = false;
  }
</script>

<div class="scene1">
  <Map bind:map={mapRef} dimmed={activeIndex === -1 && !showSummary} />
  <Spotlight />

  {#if mapRef}
    <FallingDots
      map={mapRef}
      {activeIndex}
      {showAllDots}
      {forceDropAll}
      onPosition={handlePosition}
    />

    {#if activeIndex >= 0 && labelPositions[activeIndex]}
      <IncidentLabel
        text={`${incidents[activeIndex].year}: ${incidents[activeIndex].title}`}
        x={labelPositions[activeIndex].x}
        y={labelPositions[activeIndex].y}
        active
      />
    {/if}
  {/if}

  <div class="scroll-container">

    {#each incidents as incident, i}
      <ScrollWatcher index={i} on:enter={() => enterIncident(i)} on:exit={() => exitIncident(i)}>
        <div class="step">
          <p class:item-active={activeIndex === i}>
            {incident.year}. {incident.title}. {incident.description}
          </p>
        </div>
      </ScrollWatcher>
    {/each}

    <ScrollWatcher index={incidents.length} on:enter={enterSummary} on:exit={exitSummary}>
      <div bind:this={summaryMarker} class="step summary">
        <SummaryScene {showSummary} />
      </div>
    </ScrollWatcher>

  </div>
</div>

<style>
.scene1 {
  position: relative;
  width: 100%;
}

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

p {
  opacity: 0.25;
  font-size: 1.6rem;
  transition: opacity .4s ease, transform .4s ease;
  color: #e6e6e6;
  max-width: 80%;
  transform: translateY(6px);
}

p.item-active {
  opacity: 1;
  font-weight: 700;
  transform: translateY(0);
}

.summary {
  min-height: 120vh;
  display: flex;
  align-items: center;
}
</style>
