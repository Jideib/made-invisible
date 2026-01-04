<script>
  export let text = "";
  export let x = 0;
  export let y = 0;
  export let active = false;

  let visible = false;
  let timeoutId;

  $: {
    if (active) {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        visible = true;
      }, 200);
    } else {
      if (timeoutId) clearTimeout(timeoutId);
      visible = false;
    }
  }
</script>

{#if visible}
  <div
    class="label"
    style="left:{x + 20}px; top:{y - 40}px;" 
  >
    <div class="label-arrow"></div>
    <div class="label-text">{text}</div>
  </div>
{/if}

<style>
.label {
  position: absolute;
  z-index: 30;
  pointer-events: none;
  animation: labelIn 0.3s ease-out;
  transform: translateY(-100%);
}

.label-arrow {
  position: absolute;
  left: 50%;
  bottom: -6px;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgba(0, 0, 0, 0.9);
}

.label-text {
  background: rgba(0, 0, 0, 0.9);
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 8px 12px;
  border-radius: 6px;
  white-space: nowrap;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  font-family: sans-serif;
}

@keyframes labelIn {
  from {
    opacity: 0;
    transform: translateY(-90%);
  }
  to {
    opacity: 1;
    transform: translateY(-100%);
  }
}
</style>