<script>
  export let activeIndex = -1;
  import { incidents } from "$lib/data/incidents.js";
</script>

<div class="scene-text">
  {#each incidents as item, i}
    <p class:item-active={activeIndex === i}>
      {item.year}. {item.title}. {item.description}
    </p>
  {/each}

  {#if activeIndex === incidents.length - 1}
    <p class="summary fade">
      Since 1999, we've tracked dozens of major incidents...
    </p>
  {/if}
</div>

<style>
.scene-text {
  position: relative;
  height: 100vh;          /* lock to map height */
  max-height: 100vh;
  overflow-y: auto;       /* internal scroll if needed */
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
  transform: translateY(4px);
  color: #e6e6e6;   
}

p.item-active {
  opacity: 1;
  font-weight: 700;
  transform: translateY(0);
}

.summary.fade {
  opacity: 1;
  font-weight: 700;
  margin-top: 5vh;
  font-size: 1.7rem;
}
</style>
