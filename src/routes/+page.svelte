<script>
  import { onMount } from "svelte";
  import Scene1Block from "$lib/scenes/Scene1Block.svelte";
  import Scene2 from "$lib/scenes/Scene2.svelte";

  let summaryMarker;
  let scrolledPastSummary = false;

  function handleScroll() {
    if (!summaryMarker) return;

    const rect = summaryMarker.getBoundingClientRect();
    // Fade to Scene 2 only after summary scroll fully leaves viewport
    scrolledPastSummary = rect.top < -window.innerHeight * 0.25;
  }

  onMount(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  });
</script>

<div id="page">
  <!-- SCENE 1 (Map & Falling Dots) -->
  <div id="scene1" class:fade-out={scrolledPastSummary}>
    <Scene1Block bind:summaryMarker />
  </div>

  <!-- SCENE 2 -->
  {#if scrolledPastSummary}
    <div id="scene2"> 
      <Scene2 />
    </div>

  {/if}
</div>

<style>
#page {
  width: 100%;
  overflow-x: hidden;
}

/* Scene 1 fades completely away to BLACK (transition Style A) */
.fade-out {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.7s ease;
}

/* Ensure Scene2 starts IMMEDIATELY after Scene1 with NO gap */
#scene2 {
  min-height: 100vh;
  display: block;
  margin: 0;
  padding: 0;
}
</style>
