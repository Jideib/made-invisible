<script>
  import { forensicCases } from "$lib/data/forensicCases.js";
  import ForensicSlider from "$lib/components/ForensicSlider.svelte";

  let reveal = {};

  function checkScroll() {
    const y = window.scrollY;

    forensicCases.forEach((c, caseIndex) => {
      if (y > window.innerHeight * (0.9 + caseIndex * 1.1)) {
        reveal[`slider-${caseIndex}`] = true;
      }
    });
  }

  import { onMount } from "svelte";
  onMount(() => {
    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => window.removeEventListener("scroll", checkScroll);
  });
</script>

<section class="forensics">
  {#each forensicCases as c, i}
    <div class="case-block">
      <h2>{c.title}</h2>
      <p class="summary">{c.summary}</p>

      <div class="slider-wrap" class:visible={reveal[`slider-${i}`]}>
        <ForensicSlider before={c.before} after={c.after} />
      </div>
    </div>
  {/each}
</section>

<style>
.forensics {
  padding: 12vh 10vw;
}

.case-block {
  margin-bottom: 28vh;
}

.case-block h2 {
  font-size: 2.3rem;
  color: #3a2f21;
  margin-bottom: 1rem;
}
.summary {
  color: #6a5942;
  opacity: 0.9;
  font-size: 1.2rem;
  max-width: 520px;
  margin-bottom: 2.4rem;
}

.slider-wrap {
  opacity: 0;
  transform: translateY(42px);
  transition: all .6s ease;
}
.slider-wrap.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
