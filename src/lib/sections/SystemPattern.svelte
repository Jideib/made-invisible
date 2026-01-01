<script>
  import { onMount, onDestroy } from "svelte";
  import { systemPatterns } from "$lib/data/systemPatterns.js";

  let active = 0;
  let blocks = [];

  function setBlock(el, index) {
    if (el) blocks[index] = el;
  }

  function trackScroll() {
    const t = window.innerHeight * 0.35;
    for (let i = 0; i < blocks.length; i++) {
      const el = blocks[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top < t && rect.bottom > 80) {
        active = i;
        break;
      }
    }
  }

  let raf;
  function throttled() {
    if (!raf) {
      raf = requestAnimationFrame(() => {
        trackScroll();
        raf = null;
      });
    }
  }

  onMount(() => {
    if (typeof window !== "undefined") {
    setTimeout(trackScroll, 40);
    window.addEventListener("scroll", throttled, { passive: true });
    }
  });


 onDestroy(() => {
    if (typeof window !== "undefined") {
    window.removeEventListener("scroll", throttled);
    }
    if (raf) cancelAnimationFrame(raf);
  });


  function pct(num, arr) {
    const max = Math.max(...arr.map(d => d.deaths));
    return max > 0 ? (num / max) * 100 : 0;
  }
</script>

<div class="pattern-wrapper">
  <div class="pattern-list">
    {#each systemPatterns as p, i (p.id)}
      <section
        bind:this={blocks[i]}
        use:setBlock={i}
        class="item"
        class:active={active === i}
      >
        <h3>{p.title}</h3>

        {#if p.finding}
          <p class="finding">{p.finding}</p>
        {/if}

        <ul>
          {#each systemPatterns[active].dataPoints as d}
            <li>{d.incident} — <strong>{d.deaths}+</strong></li>
          {/each}
        </ul>

        {#if p.implication}
          <p class="implication">{p.implication}</p>
        {/if}
      </section>
    {/each}
  </div>

  <div class="pattern-graph">
    {#each systemPatterns[active].dataPoints as d}
      <div class="bar">
        <div class="fill"
          style="height:{pct(d.deaths, systemPatterns[active].dataPoints)}%">
        </div>
        <span>{d.incident}</span>
      </div>
    {/each}
  </div>
</div>

<style>
.pattern-wrapper {
  display:flex;
  gap:4vw;
  padding:12vh 6vw;
  min-height:100vh;
  position:relative;
  z-index:40;
  color:#fff;
}
.pattern-list {
  width:40%;
  display:flex;
  flex-direction:column;
  gap:14vh;
}
.item {
  opacity:.35;
  transition:opacity .35s, transform .45s;
}
.item.active {
  opacity:1;
  transform:translateX(.6rem);
}
.finding {
  opacity:.8;
  font-style:italic;
}
.pattern-graph {
  width:55%;
  display:flex;
  gap:1.5rem;
  align-items:flex-end;
}
.fill {
  width:100%;
  background:#e63946;
  transition:height .6s ease;
}
</style>
