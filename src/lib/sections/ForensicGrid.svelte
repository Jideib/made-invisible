
<script>
  import { forensicCases } from "$lib/data/forensicCases.js";
  import ForensicSlider from "$lib/components/ForensicSlider.svelte";
</script>

<section class="grid">
  {#each forensicCases as c}
    <div class="cell">
      <h3>{c.title}</h3>
      <ForensicSlider before={c.before} after={c.after} />
    </div>
  {/each}
</section>

<style>
.grid {
  background:#f7f1e5;
  padding:6vh 4vw;
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(320px,1fr));
  gap:2rem;
}
.cell h3 { font-size:1.4rem; margin-bottom:1rem; color:#222; }
</style>
