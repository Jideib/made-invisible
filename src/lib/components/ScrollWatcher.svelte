<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";

  export let index;
  const dispatch = createEventDispatcher();

  let observer;
  let el;

  onMount(() => {
    // prevent SSR crash
    if (typeof window === "undefined" || !el) return;

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) dispatch("enter", { index });
        else dispatch("exit", { index });
      },
      {
        root: null,
        threshold: 0.4,
      }
    );

    observer.observe(el);

    return () => observer?.disconnect();
  });

  onDestroy(() => {
    observer?.disconnect();
  });
</script>

<div bind:this={el}>
  <slot />
</div>
