<script>
  import { onMount } from "svelte";

  export let beforeImage;
  export let afterImage;
  export let labelBefore = "Before";
  export let labelAfter = "After";

  let container;
  let handle;
  let overlay;
  let dragging = false;
  let width = 0;

  function setPosition(x) {
    const rect = container.getBoundingClientRect();
    let pos = Math.max(0, Math.min(x - rect.left, rect.width));
    overlay.style.width = `${pos}px`;
    handle.style.left = `${pos}px`;
  }

  onMount(() => {
    if (!container) return;
    width = container.offsetWidth;
    setPosition(width * 0.5);

    const start = () => (dragging = true);
    const end = () => (dragging = false);

    const move = (e) => {
      if (!dragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      setPosition(x);
    };

    handle.addEventListener("mousedown", start);
    window.addEventListener("mouseup", end);
    window.addEventListener("mousemove", move);

    handle.addEventListener("touchstart", start);
    window.addEventListener("touchend", end);
    window.addEventListener("touchmove", move);

    return () => {
      window.removeEventListener("mouseup", end);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchend", end);
      window.removeEventListener("touchmove", move);
    };
  });
</script>

<div bind:this={container} class="slider">
  <img class="after" src={afterImage} alt="After" />
  <div class="overlay" bind:this={overlay}>
    <img class="before" src={beforeImage} alt="Before" />
  </div>

  <div class="handle" bind:this={handle}>
    <div class="bar"></div>
  </div>

  <span class="label before-label">{labelBefore}</span>
  <span class="label after-label">{labelAfter}</span>
</div>

<style>
.slider {
  position: relative;
  width: 100%;
  height: 75vh;
  overflow: hidden;
  user-select: none;
  touch-action: none;
  border-radius: 6px;
}

.slider img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  height: 100%;
  overflow: hidden;
}

.handle {
  position: absolute;
  top: 0;
  width: 2px;
  height: 100%;
  cursor: grab;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
}

.handle .bar {
  width: 16px;
  height: 16px;
  background: white;
  border: 2px solid black;
  border-radius: 50%;
}

.label {
  position: absolute;
  top: 1rem;
  padding: .3rem .7rem;
  background: rgba(0,0,0,.45);
  color: white;
  border-radius: 4px;
  font-size: .9rem;
}

.before-label {
  left: 1rem;
}
.after-label {
  right: 1rem;
}
</style>
