<script>
  import ScrollWatcher from "$lib/components/ScrollWatcher.svelte";
  import DenialRow from "$lib/components/DenialRow.svelte";
  import { denialCases } from "$lib/data/denialCases.js";

  let activeIndex = -1;
</script>

<section class="scene3">

  {#each denialCases as item, i}
    <ScrollWatcher index={i} on:enter={() => activeIndex = i}>
      <DenialRow
        official={item.official}
        evidence={item.evidence}
        active={activeIndex === i}
        faded={activeIndex > i}
      />
    </ScrollWatcher>
  {/each}

  <!-- Expert interpretation (only once, at end) -->
  <ScrollWatcher on:enter={() => activeIndex = denialCases.length}>
    <div class="expert">
      <p class="role">Legal Advocate</p>
      <blockquote>
        “By naming victims as ‘insurgents’ or ‘unknown gunmen,’ the State resolves
        the case linguistically before any investigation begins.”
      </blockquote>
    </div>
  </ScrollWatcher>

</section>

<style>
.scene3 {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  padding: 20vh 4rem;
  z-index: 40;
}

.expert {
  margin: 30vh auto;
  max-width: 600px;
  opacity: 0.85;
}

.role {
  font-weight: 700;
  margin-bottom: 0.5rem;
}
</style>
