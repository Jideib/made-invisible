<script>
  export let before;
  export let after;
  export let position = 50;
  export let interactive = false;
  
  let sliderRef;
  
  function updateSlider(pos) {
    if (!sliderRef) return;
    sliderRef.style.clipPath = `inset(0 0 0 ${100 - pos}%)`;
  }
  
  $: updateSlider(position);
</script>

<div class="forensic-slider">
  <!-- Before image -->
  <div class="image-wrapper">
    <img src={before} alt="Before incident" class="image before-image" />
  </div>
  
  <!-- After image (clipped) -->
  <div 
    class="image-wrapper after-wrapper"
    bind:this={sliderRef}
  >
    <img src={after} alt="After incident" class="image after-image" />
  </div>
  
  <!-- Slider handle (only for interactive) -->
  {#if interactive}
    <div class="slider-handle" style="left: {position}%">
      <div class="handle-line"></div>
      <div class="handle-dot"></div>
    </div>
  {/if}
</div>

<style>
.forensic-slider {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  border-radius: 8px;
  background: #000;
}

.image-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.after-wrapper {
  clip-path: inset(0 0 0 50%);
}

.slider-handle {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 40px;
  transform: translateX(-50%);
  cursor: ew-resize;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}

.handle-line {
  width: 2px;
  height: 100%;
  background: #e10600;
}

.handle-dot {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #e10600;
  border: 2px solid white;
  box-shadow: 0 0 8px rgba(225, 6, 0, 0.5);
}
</style>