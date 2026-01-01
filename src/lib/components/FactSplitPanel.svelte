<script>
  import ForensicSlider from "$lib/components/ForensicSlider.svelte";
  export let official;
  export let evidence = [];
  export let before;
  export let after;
  export let links = [];
</script>

<div class="panel">
  <div class="left">
    <h3>Official Narrative</h3>
    <p class="narrative">{official}</p>
  </div>

  <div class="right">
    <h3>Observed Evidence</h3>
    <ul>
      {#each evidence as e}<li>{e}</li>{/each}
    </ul>

    <div class="slider-wrap">
      <ForensicSlider {before} {after} />
    </div>

    {#if links.length}
    <div class="sources">
      {#each links as l}
        <a href={l} target="_blank" rel="noopener">Source ↗</a>
      {/each}
    </div>
    {/if}
  </div>
</div>

<style>
.panel {
  display:flex;
  gap:5vw;
  padding:12vh 6vw;
  animation:fadeIn .7s ease forwards;
}
.left, .right { width:50%; }
h3 { font-size:1.45rem; margin-bottom:1rem; }
.narrative { font-weight:500; line-height:1.55; }
ul li { margin-bottom:.5rem; }
.slider-wrap { margin:2rem 0; }
.sources a {
  display:block; font-size:.9rem; opacity:.75;
  margin-bottom:.3rem;
}
@keyframes fadeIn {
  from { opacity:0; transform:translateY(30px); }
  to { opacity:1; transform:translateY(0); }
}
@media(max-width:820px){
  .panel { display:block; padding:4vh 4vw; }
  .left, .right { width:100%; }
}
</style>
