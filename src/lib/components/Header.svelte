<script>
  import BDLogo from "$lib/components/BDLogo.svelte";
  export let totalIncidents = 0;
  export let totalDeaths = "0+";
  export let prosecutions = 0;

  const newsroom = "/icons/newsroom-pulse.svg";
</script>

<header class="hdr">
  <div class="left">
    <img src={newsroom} alt="newsroom signal" class="pulse" />
    <BDLogo size={38} />
  </div>

  <div class="mid">
    <h1 class="ttl">MADE INVISIBLE</h1>
    <p class="meta">
      By <strong>Ibraheem Alawode</strong> — January 1, 2026
    </p>
  </div>

  <div class="right">
    <a href="https://twitter.com/share" target="_blank" aria-label="Share on X">𝕏</a>
    <a href="https://facebook.com/sharer/sharer.php" target="_blank" aria-label="Share on Facebook">f</a>
    <a href="https://wa.me/?text=Check%20this%20story" target="_blank" aria-label="Share on WhatsApp">🟢</a>
    <a href="https://linkedin.com/shareArticle" target="_blank" aria-label="Share on LinkedIn">in</a>
  </div>
</header>

<!-- 🧮 Sticky Counter Bar -->
<div class="counter">
  <div><strong>{totalIncidents}</strong> incidents</div>
  <span class="dot"></span>
  <div><strong>{totalDeaths}</strong> deaths documented</div>
  <span class="dot"></span>
  <div><strong>{prosecutions}</strong> prosecutions</div>
</div>

<style>
/* HEADER BAR */
.hdr {
  position:sticky;
  top:0;
  width:100%;
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:0.7rem 1.4rem;
  z-index:1000;
  background:#111; 
  border-bottom:2px solid #e10600;
}

.left .pulse {
  width:42px;
  opacity:0.9;
  animation: loopPulse 2.7s ease-in-out infinite;
}

.ttl {
  color:#fff;
  font-size:1.2rem;
  margin:0;
  font-weight:700;
  letter-spacing:.5px;
}

.meta {
  font-size:.8rem;
  margin-top:.15rem;
  opacity:.7;
  color:#eee;
}

.right a {
  color:white;
  text-decoration:none;
  margin-left:1rem;
  opacity:.8;
  font-size:1.05rem;
}
.right a:hover { opacity:1; }

/* METRICS STICKY BAR */
.counter {
  position:sticky;
  top:52px;
  z-index:999;
  padding:0.5rem 1.3rem;
  background:rgba(0,0,0,0.7);
  backdrop-filter: blur(6px);
  display:flex;
  align-items:center;
  gap:.6rem;
  color:#fff;
  font-size:.9rem;
  border-bottom:1px solid rgba(255,255,255,0.08);
}
.counter strong {
  color:#fff;
  font-weight:700;
}
.dot {
  width:4px; height:4px;
  background:#e10600;
  border-radius:50%;
  display:inline-block;
}

/* Pulse anim */
@keyframes loopPulse {
  0% { opacity:0.2; transform:scale(.85); }
  50% { opacity:1; transform:scale(1.1); }
  100% { opacity:0.2; transform:scale(.85); }
}

@media(max-width:740px){
  .hdr { flex-direction:column; gap:.35rem; }
  .right { margin-top:.3rem; }
  .counter { top:66px; font-size:.8rem; padding:.4rem 1rem; }
}
</style>
