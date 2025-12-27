<script>
  import { incidents } from '$lib/data/incidents';
  import { scrollProgress } from '$lib/stores/scrollStore';

  let count = 0;

  $: scrollProgress.subscribe(p => {
    count = Math.floor(p * incidents.length);
  });
</script>

<div class="counter">
  {count} incidents documented
</div>

<style>
.counter {
  position: fixed;
  top: 1.5rem;
  right: 2rem;
  z-index: 10;
  font-size: 1.3rem;
  background: rgba(0,0,0,0.4);
  padding: .5rem .75rem;
  color: white;
  border-radius: 6px;
}
</style>
