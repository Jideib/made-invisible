<script>
  import { createEventDispatcher, onMount, onDestroy } from "svelte";

  export let index;
  let el;
  let observer;
  const dispatch = createEventDispatcher();

  onMount(() => {
    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          dispatch("enter", index);
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
  });

  onDestroy(() => observer && observer.disconnect());
</script>

<div bind:this={el} class="watch">
  <slot />
</div>

<style>
.watch {
  min-height: 80vh;        /* controls scroll spacing */
  display: flex;
  align-items: flex-end;
}
</style>
