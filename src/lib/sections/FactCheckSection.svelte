<!-- src/lib/components/FactCheckSection.svelte -->
<script>
  import { onMount } from "svelte";
  import { factCheckCases } from "$lib/data/factCheckCases.js";
  import FactSplitPanel from "$lib/components/FactSplitPanel.svelte";
  import FactCarousel from "$lib/components/FactCarousel.svelte";

  let isMobile = false;

  // detect only in browser
  onMount(() => {
    isMobile = window.innerWidth < 780;
  });
</script>

<section class="fact-wrap">
  <h2 class="title">
    OFFICIAL NARRATIVE vs OBSERVED EVIDENCE
  </h2>

  <p class="subtitle">
    A forensic breakdown of documented disproven military claims — satellite imagery and OSINT archives.
  </p>

  {#if typeof window !== "undefined"}
    {#each factCheckCases as fc}
      {#if !isMobile}
        <!-- Desktop Split Layout -->
        <FactSplitPanel {...fc} />
      {:else}
        <!-- Mobile Carousel -->
        <FactCarousel {...fc} />
      {/if}
    {/each}
  {/if}
</section>

<style>
.fact-wrap {
  width: min(860px, 92vw);
  margin: 0 auto;
  padding: 18vh 0;
  position: relative;
  color: #fff;
  z-index: 20;
  backdrop-filter: blur(3px);
}

.title {
  text-align: center;
  font-size: clamp(2.2rem, 4vw, 3rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.subtitle {
  text-align: center;
  font-size: 1rem;
  opacity: .75;
  margin-bottom: 8vh;
  max-width: 70ch;
  margin-inline: auto;
}

/* Fade-in on scroll */
.fact-wrap > :global(.fade-in) {
  opacity: 0;
  transform: translateY(26px);
  transition: all .6s ease;
}
.fact-wrap > :global(.fade-in.visible) {
  opacity: 1;
  transform: translateY(0);
}
</style>
