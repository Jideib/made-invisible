<script>
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { incidents } from '$lib/data/incidents';
  import { scrollProgress } from '$lib/stores/scrollStore';

  let canvas;
  let ctx;
  let dots = [];
  let unsubScroll;

  function initDots() {
    dots = incidents.map((d, i) => ({
      x: Math.random() * window.innerWidth,
      y: -50 - i * 40
    }));
  }

  function draw() {
    if (!ctx) return;            // safety
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    dots.forEach(dot => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(210, 20, 20, 0.9)";
      ctx.fill();
    });
  }

  function animate(progress) {
    if (!ctx) return;            // safety
    dots.forEach((dot, i) => {
      dot.y = gsap.utils.interpolate(-100, window.innerHeight * 0.8, progress);
    });
    draw();
  }

  onMount(() => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx = canvas.getContext("2d");
    initDots();
    draw();

    unsubScroll = scrollProgress.subscribe(p => animate(p));

    return () => {
      if (unsubScroll) unsubScroll();
    };
  });
</script>

<canvas bind:this={canvas} class="bloob"></canvas>

<style>
.bloob {
  position: fixed;
  top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 3;
}
</style>
