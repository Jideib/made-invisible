<script>
  export let showSummary = false;
</script>

<div class="scene-text">
  {#if showSummary}
    <p class="summary fade">
      Since 1999, we've tracked dozens of major incidents...
    </p>
  {/if}
</div>

<style>
.scene-text {
  position: relative;
  height: 100vh;
  max-height: 100vh;
  padding-left: 4rem;
  padding-top: 20vh;
  padding-bottom: 10vh;
  z-index: 40;
}

.summary {
  opacity: 0;
  font-size: 1.7rem;
  color: #e6e6e6;
  max-width: 80%;
  transition: opacity 1s ease;
}

.summary.fade {
  opacity: 1;
  font-weight: 700;
}
</style>