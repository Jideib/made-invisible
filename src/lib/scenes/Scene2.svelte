<script>
  import ForensicCases from "$lib/components/ForensicCase.svelte";

  let titleVisible = false;
  import { onMount } from "svelte";
  function checkScroll() {
    if (window.scrollY > 15) titleVisible = true;
  }
  onMount(() => {
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  });
</script>

<section id="scene2">
  <h1 class:visible={titleVisible}>
    When the earth reveals what the state denies.
  </h1>
  <ForensicCases />
</section>

<style>
#scene2 {
  background: #f8f1df;
  min-height: 200vh;
  padding-top: 12vh;
}
h1 {
  opacity: 0;
  transform: translateY(40px);
  transition: all .7s ease;
  font-size: 3rem;
  padding: 0 10vw;
  line-height: 1.1;
  color: #3b2c1b;
}
h1.visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
