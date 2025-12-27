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

    // Slight delay after dot lands (feels intentional)
    timeoutId = setTimeout(() => {
      visible = true;
    }, 180);
  } else {
    // Fade out faster than dot for clarity
    timeoutId = setTimeout(() => {
      visible = false;
    }, 200);
  }
}

</script>

<div
  class="label"
  class:active={active}
  style="left:{x + 18}px; top:{y - 8}px;"
>
  {text}
</div>

<style>
.label {
  position: fixed;
  z-index: 30;
  pointer-events: none;
  z-index: 30;
  outline: 2px solid wheat;
  background: solid rebeccapurple;
  color: #ffffff;
  font-size: 0.9rem;
  padding: 6px 10px;
  border-radius: 6px;
  white-space: nowrap;
  backdrop-filter: blur(6px);
  letter-spacing: 0.02em;
  opacity: 0;
  transform: translateY(-6px);
  transition: opacity 0.25s ease, transform 0.25s ease;
  transform-origin: left center;
}

.label.active {
  opacity: 1;
  transform: translateY(0);
  animation: labelIn 260ms ease-out;
}

@keyframes labelIn {
  from {
    opacity: 0;
    transform: translateX(-6px) translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
}

</style>
