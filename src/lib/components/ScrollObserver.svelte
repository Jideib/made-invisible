<script>
  import { createEventDispatcher, onMount } from "svelte";

  const dispatch = createEventDispatcher();
  export let threshold = 0.6;     // % of element visible before triggering
  export let once = false;        // auto-unobserve after first trigger
  let el;                         // DOM element reference

  onMount(() => {
    if (typeof window === "undefined") return; // SSR guard
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch("enter", { el });

            if (once) observer.unobserve(el);
          }
        });
      },
      {
        threshold
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  });
</script>

<div bind:this={el}>
  <slot />
</div>
