<script>
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import Header from "$lib/components/Header.svelte";
  import MapTimeline from "$lib/sections/MapTimeline.svelte";
  import ForensicRail from "$lib/sections/ForensicRail.svelte";
  import SystemPattern from "$lib/sections/SystemPattern.svelte";
  import Accountability from "$lib/sections/Accountability.svelte";
  import FooterCredits from "$lib/sections/FooterCredits.svelte";
  
  let ledeOpacity = 1;
  let headerCollapsed = false;
  let scrollHandler = null;

  onMount(() => {
    if (!browser) return;
    
    // Handle header collapse on scroll
    const handleHeaderScroll = () => {
      const y = window.scrollY;
      headerCollapsed = y > 120;
    };
    
    // Handle lede fade on scroll - matches spec
    const handleLedeScroll = () => {
      const y = window.scrollY;
      const fadeStart = 50;
      const fadeEnd = 320; // As specified in original: 320px fade range
      
      if (y < fadeStart) {
        ledeOpacity = 1;
      } else if (y > fadeEnd) {
        ledeOpacity = 0.15; // Minimum opacity as per spec
      } else {
        const progress = (y - fadeStart) / (fadeEnd - fadeStart);
        ledeOpacity = Math.max(0.15, 1 - progress);
      }
    };
    
    // Combined scroll handler
    const handleScroll = () => {
      handleHeaderScroll();
      handleLedeScroll();
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    scrollHandler = handleScroll;
    
    // Initial check
    handleScroll();
  });

  onDestroy(() => {
    if (browser && scrollHandler) {
      window.removeEventListener('scroll', scrollHandler);
    }
  });
</script>

<!-- White background for entire page -->
<div class="page-wrapper">
  <!-- 📰 STORY WRAPPER -->
  <Header {headerCollapsed} />

  <!-- 🧾 LEDE -->
  <section class="lede" style="opacity: {ledeOpacity}">
    <p>
      <strong>For more than two decades, Nigeria's military has carried out internal
      security operations across the country.</strong>
    </p>

    <p>
      In dozens of documented cases, civilians have been killed during these
      operations — incidents the Army has consistently described as lawful
      engagements with armed groups.
    </p>

    <p>
      Using satellite imagery, eyewitness accounts, human rights investigations,
      and official military statements, this investigation reconstructs where force
      was used, what the Army said happened, and what the available evidence shows
      instead.
    </p>
  </section>

  <!-- 🧭 SCENE 1 — MAP TIMELINE -->
  <!-- Update the scene-1 section to match scrollManager section ID -->
  <section class="map-section" id="scene-1" data-scroll-section="scene1">
    <div class="map-container">
      {#if browser}
        <MapTimeline />
      {:else}
        <!-- SSR placeholder -->
        <div class="map-placeholder">
          <div class="placeholder-content">
            <h3>Nigeria Military Operations Timeline</h3>
            <p>Scroll to explore incidents from 1999 to 2025</p>
            <div class="loading-indicator">
              <div class="loading-dot"></div>
              <div class="loading-dot"></div>
              <div class="loading-dot"></div>
            </div>
          </div>
        </div>
      {/if}
    </div>
  </section>

  <!-- 🔍 FORENSIC + FACT CHECK (RAIL) -->
  <section class="forensic-section block wide" id="forensic-rail">
  {#if browser}
    <ForensicRail />
  {:else}
    <!-- SSR fallback -->
    <div class="forensic-ssr">
      <h3>Forensic Evidence Analysis</h3>
      <p>Loading comparative analysis of official narratives vs. documented evidence...</p>
      <div class="ssr-placeholder">
        <div class="placeholder-slider"></div>
        <div class="placeholder-panels">
          <div class="placeholder-panel"></div>
          <div class="placeholder-panel"></div>
        </div>
      </div>
    </div>
  {/if}
  </section>

  <!-- 📊 SYSTEM PATTERNS -->
  <section class="patterns-section block wide" id="system-patterns">
    {#if browser}
      <SystemPattern />
    {:else}
      <div class="section-placeholder">
        <div class="placeholder-content">
          <h4>Systemic Pattern Analysis</h4>
          <p>Identifying recurring operational behaviors</p>
        </div>
      </div>
    {/if}
  </section>

  <!-- ⚖️ ACCOUNTABILITY -->
  <section class="accountability-section block" id="accountability">
    {#if browser}
      <Accountability />
    {:else}
      <div class="section-placeholder">
        <div class="placeholder-content">
          <h4>Accountability & Legal Analysis</h4>
          <p>Examining command responsibility and legal violations</p>
        </div>
      </div>
    {/if}
  </section>

  <!-- 🧱 FOOTER -->
  <section class="footer" id="credits">
    <FooterCredits />
  </section>
</div>

<style>
/* Reset and global styles */
:global(html, body) {
  background: #ffffff;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
}

.page-wrapper {
  background: #ffffff;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

/* Map section */
.map-section {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background: #000;
  overflow: hidden;
}

.map-container {
  width: 100%;
  height: 100%;
}

.map-placeholder {
  width: 100%;
  height: 100vh;
  background: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  padding: 2rem;
}

.map-placeholder .placeholder-content h3 {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  margin-bottom: 1rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.map-placeholder .placeholder-content p {
  opacity: 0.7;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.loading-indicator {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  margin-top: 2rem;
}

.loading-dot {
  width: 8px;
  height: 8px;
  background: #e10600;
  border-radius: 50%;
  animation: pulse 1.4s ease-in-out infinite;
}

.loading-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.4;
    transform: scale(0.9);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

/* PAGE */
.block {
  position: relative;
  width: min(820px, 92vw);
  margin: 0 auto;
  padding: 22vh 0;
  z-index: 10;
  color: #111;
}

.block.wide {
  width: min(1200px, 96vw);
}

.footer {
  background: #050505;
  color: rgb(248, 244, 244);
  padding: 10vh 6vw;
}

/* LEDE - Matches spec exactly */
.lede {
  position: relative;
  z-index: 20;
  max-width: 680px; /* Exactly as specified in spec: 680px max width */
  margin: 0 auto;
  padding: 6rem 6vw 5rem;
  color: #111;
  line-height: 1.65;
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  margin-top: -3rem; /* Overlap slightly with header */
  margin-bottom: 8rem;
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), 
              transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
}

.lede:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}

.lede p {
  margin-bottom: 1.4rem;
}

.lede strong {
  font-weight: 700;
  color: #000;
  letter-spacing: -0.01em;
}

/* Section placeholders */
.section-placeholder {
  height: 400px;
  background: #f8f9fa;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-style: italic;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.section-placeholder .placeholder-content {
  text-align: center;
  padding: 2rem;
}

.section-placeholder h4 {
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.section-placeholder p {
  opacity: 0.7;
  font-size: 0.95rem;
}

/* Adjust placeholder heights for specific sections */
.patterns-section .section-placeholder {
  height: 600px;
}

.accountability-section .section-placeholder {
  height: 300px;
}

/* Ensure proper spacing between sections */
.map-section + .block {
  padding-top: 25vh;
}

/* Mobile adjustments */
@media (max-width: 768px) {
  .lede {
    padding: 4rem 1.5rem 3.5rem;
    margin: 2rem 1rem 4rem;
    max-width: calc(100% - 2rem);
    backdrop-filter: blur(4px);
  }
  
  .block {
    padding: 15vh 0;
    width: 90vw;
  }
  
  .block.wide {
    width: 95vw;
  }
  
  .section-placeholder {
    height: 300px;
  }
  
  .patterns-section .section-placeholder {
    height: 400px;
  }
}

/* Print styles */
@media print {
  .lede {
    background: white;
    box-shadow: none;
    border: 1px solid #ddd;
  }
}
</style>