<script>
  export let x;
  export let y;
  export let active = false;
</script>

<div class="pin" class:active style="left:{x}px; top:{y}px"></div>

<style>
.pin {
  position: fixed;
  width: 14px;
  height: 14px;
  background: #c40000;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.3);
  transition: opacity .6s ease, transform .6s ease;
  z-index: 20;
  pointer-events: none;
}

.pin.active {
  opacity: 1;
  transform: scale(1);
}
</style>
