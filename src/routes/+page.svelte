<script>
  /* ---- COMPONENT IMPORTS ---- */
  import Header from "$lib/components/Header.svelte";
  import Map from "$lib/components/Map.svelte";
  import MapTimeline from "$lib/sections/MapTimeline.svelte";
  import ForensicGrid from "$lib/sections/ForensicGrid.svelte";
  import FactCheckSection from "$lib/sections/FactCheckSection.svelte";
  import SystemPattern from "$lib/sections/SystemPattern.svelte";
  import Accountability from "$lib/sections/Accountability.svelte";
  import FooterCredits from "$lib/sections/FooterCredits.svelte";
  import { incidentCases } from "$lib/data/incidentCases.js";


  const totalIncidents = incidentCases.length;
  const totalDeaths = incidentCases.reduce((n,c)=>n+(c.victimsMin||0),0);

  let mapDim = false;

  /** Fired by MapTimeline when user scrolls past falling-dot stage */
  function handleDim() {
    mapDim = true;
  }
</script>

<!-- 📰 STORY WRAPPER -->

<div id="story">

  <!-- 🌍 FIXED MAP BG -->
  <div id="map-bg" class:dimmed={mapDim}>
    <MapTimeline on:dim={handleDim} />
  </div>

  <!-- 🧱 CONTENT STACK -->
  <Header 
  {totalIncidents}
  totalDeaths={`${totalDeaths}+`}
  prosecutions={0}
/>

  <!-- SECTION 1 — TIMELINE MAP -->
  <section id="timeline" class="block">
    <!-- Timeline is visually in background -->
  </section>

  <!-- SECTION 2 — FORENSIC SATELLITE EVIDENCE -->
  <section id="forensics" class="block">
    <ForensicGrid />
  </section>

  <!-- SECTION 3 — SYSTEM PATTERNS -->
  <section id="patterns" class="block">
    <SystemPattern />
  </section>

  <!-- SECTION 4 — FACT CHECK -->
  <section id="factcheck" class="block">
    <FactCheckSection />
  </section>

  <!-- SECTION 5 — ACCOUNTABILITY -->
  <section id="accountability" class="block">
    <Accountability />
  </section>

  <!-- FOOTER -->
  <section id="footer" class="block">
    <FooterCredits />
  </section>
</div>

<style>
/* Root */
#story {
  position: relative;
  width: 100%;
  overflow-x: hidden;
  z-index: 10;
  color: white;
}

/* Fixed BG Map */
#map-bg {
  position: fixed;
  inset: 0;
  z-index: -1;       /* BEHIND content */
  opacity: 0.48;
  pointer-events: none;
  transition: opacity .6s ease, filter .6s ease;
}
#map-bg.dimmed {
  opacity: 0.16;
  filter: blur(1.8px) grayscale(90%);
}

/* Block sections */
.block {
  position: relative;
  width: min(820px, 88vw);
  margin: 0 auto;
  padding: 22vh 0;
  z-index: 5;
}

/* Dark backgrounds layering */
#forensics { background: rgba(0,0,0,0.54); backdrop-filter: blur(4px); }
#patterns  { background: rgba(0,0,0,0.38); backdrop-filter: blur(3px); }
#factcheck { background: rgba(0,0,0,0.32); backdrop-filter: blur(3px); }
#accountability { background: rgba(0,0,0,0.25); backdrop-filter: blur(2px); }

#forensics {
  scroll-margin-top: 100px;
}


/* Footer resets color */
#footer {
  background: #fff;
  color: #000;
}

/* Mobile */
@media(max-width: 750px) {
  .block { padding: 18vh 0; }
}
</style>
