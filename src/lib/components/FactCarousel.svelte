<script>
  import ForensicSlider from "$lib/components/ForensicSlider.svelte";
  export let official;
  export let evidence = [];
  export let before;
  export let after;
  export let links = [];

  let index = 0;
  function next(){ index = Math.min(index+1, 2); }
  function prev(){ index = Math.max(index-1, 0); }

  function keyNav(e) {
    if (e.key === "ArrowRight") index = Math.min(index + 1, 2);
    if (e.key === "ArrowLeft") index = Math.max(index - 1, 0);
  }
</script>

<div class="carousel">
  <div class="track" style="transform: translateX(-{index * 100}%);">
    
    <div class="card">
      <h3>Official Narrative</h3>
      <p>{official}</p>
    </div>

    <div class="card">
      <h3>Observed Evidence</h3>
      <ul>{#each evidence as e}<li>{e}</li>{/each}</ul>
      {#if links.length}
      <div class="links">
        {#each links as l}<a href={l} target="_blank">Source ↗</a>{/each}
      </div>
      {/if}
    </div>

    <div class="card slider-card">
      <ForensicSlider {before} {after} />
    </div>
  </div>

  <div class="nav">
    <button on:click={prev}>‹</button>
    <button on:click={next}>›</button>
  </div>

 <div class="dots">
  {#each [0,1,2] as d}
    <button
      class:selected={index === d}
      on:click={() => index = d}
      aria-label="Go to slide {d + 1}"
    ></button>
  {/each}
  </div>
  
</div>

<style>
.carousel { width:100%; overflow:hidden; }
.track { display:flex; transition:transform .35s ease; }
.card { flex:0 0 100%; padding:9vh 6vw; }
.nav { display:flex; justify-content:center; gap:1rem; margin-top:1.2rem; }
button { border:none; padding:.6rem 1rem; border-radius:6px; background:#e63946; color:white; }
.dots { text-align:center; margin-top:.5rem; }
.dots button {
  width:12px; height:12px; border-radius:50%;
  border:none; margin:0 .3rem;
  background:rgba(230,57,70,0.5);
  transition:background .3s;
}
.dots button.selected {
  background:rgba(230,57,70,1);
}
.slider-card { display:flex; justify-content:center; align-items:center; }
</style>
