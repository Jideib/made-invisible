<script>
  import { onMount } from "svelte";

  export let before;
  export let after;

  let pos = 50;
  let dragging = false;
  let container;

  function start(e) {
    dragging = true;
  }
  function end() {
    dragging = false;
  }
  function drag(e) {
    if (!dragging) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    pos = Math.min(100, Math.max(0, ((x - rect.left) / rect.width) * 100));
  }

  function handleKey(e) {
    if (e.key === "ArrowLeft") pos = Math.max(0, pos - 2);
    if (e.key === "ArrowRight") pos = Math.min(100, pos + 2);
  }

  onMount(() => {
    pos = 0;
    setTimeout(() => pos = 50, 400);
  });
</script>

<div
  class="slider"
  bind:this={container}
  role="slider"
  aria-valuemin="0"
  aria-valuemax="100"
  aria-valuenow={pos}
  tabindex="0"
  on:keydown={handleKey}
  on:pointerdown={start}
  on:pointerup={end}
  on:pointerleave={end}
  on:pointermove={drag}
  on:touchstart={start}
  on:touchend={end}
  on:touchmove={drag}
>
  <img
  class="before"
  src={before}
  alt="Damage before the event"
/>

<img
  class="after"
  src={after}
  alt=""
  aria-hidden="true"
  style="clip-path: inset(0 0 0 {100 - pos}%);"
/>


  <div class="divider" style="left:{pos}%">
    <div class="knob" aria-hidden="true">⇆</div>
  </div>
</div>

<style>
.slider {
  position: relative;
  width: 100%;
  max-width: 900px;
  aspect-ratio: 16/9;
  overflow: hidden;
  border-radius: 10px;
  background: #111;
  cursor: ew-resize;
  user-select: none;
  outline: none;
}

.slider:focus {
  outline: 2px solid #fff;
}

img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.divider {
  position: absolute;
  top: 0;
  height: 100%;
  width: 2px;
  background: rgba(255,255,255,0.4);
  transform: translateX(-1px);
}

.knob {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 8px 10px;
  background: #fff;
  border-radius: 50%;
  font-size: 16px;
  color: #000;
  pointer-events: none;
  box-shadow: 0 0 8px rgba(0,0,0,0.4);
}
</style>
