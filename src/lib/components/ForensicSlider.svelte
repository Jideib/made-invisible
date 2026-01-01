<script>
  import { onMount } from "svelte";

  export let before;
  export let after;
  export let captionBefore = "Before";
  export let captionAfter = "After";

  let pos = 50;
  let dragging = false;
  let container;

  function start() { dragging = true; }
  function end() { dragging = false; }
  function drag(e) {
    if (!dragging) return;
    const rect = container.getBoundingClientRect();
    const x = e.clientX ?? e.touches?.[0]?.clientX;
    pos = Math.min(100, Math.max(0, ((x - rect.left) / rect.width) * 100));
  }

  function handleKey(e) {
    if (e.key === "ArrowLeft") pos = Math.max(0, pos - 3);
    if (e.key === "ArrowRight") pos = Math.min(100, pos + 3);
  }

  onMount(() => {
    pos = 0;
    setTimeout(() => pos = 50, 500);
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
  <img class="before-img" src={before} alt={captionBefore} loading="lazy" />
  <img class="after-img" src={after} alt={captionAfter} loading="lazy" style="clip-path: inset(0 0 0 {100-pos}%);" />

  <div class="divider" style="left:{pos}%">
    <div class="knob">⇆</div>
  </div>
</div>

<style>
.slider {
  position:relative;
  width:100%;
  aspect-ratio:16/9;
  overflow:hidden;
  border-radius:10px;
  background:#111;
  user-select:none;
  cursor:ew-resize;
  outline:none;
}
.slider:focus { outline:2px solid #e63946; }
img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
.divider { position:absolute; height:100%; width:2px; background:white; transform:translateX(-1px); }
.knob {
  position:absolute; top:50%; left:50%;
  transform:translate(-50%,-50%);
  background:#fff; padding:10px 12px;
  border-radius:50%; font-size:16px;
  color:#000; box-shadow:0 0 8px rgba(0,0,0,.4);
}
</style>
