<script>
  import { onMount } from 'svelte';

  let div;

  onMount(() => {
    // SSR-safe – no DOM manipulation needed
  });
</script>

<div bind:this={div} class="spotlight"></div>

<style>
.spotlight {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 2;
  pointer-events: none;

  /* radial vignette */
  background:
    radial-gradient(
      circle at 55% 50%,      /* shifted slightly right to center on map */
      rgba(255,255,255,0.12) 0%,
      rgba(0,0,0,0.85) 50%,
      rgba(0,0,0,1) 85%
    );
}
</style>
