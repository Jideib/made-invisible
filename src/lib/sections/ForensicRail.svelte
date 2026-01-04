<script>
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { scrollManager } from "$lib/utils/scrollManager.js";
  import { forensicRailCases } from "$lib/data/forensicRailCases.js";
  import ForensicRailItem from "$lib/components/ForensicRailItem.svelte";
  
  let currentIndex = 0;
  let isAutoPlaying = true;
  let autoPlayInterval;
  let stepsContainer;
  
  // Configuration
  const VISIBLE_CASES = 3; // 3 cards visible as per spec
  const AUTO_PLAY_DELAY = 8000; // 8 seconds with pause
  const AUTO_PLAY_PAUSE = 3000; // 3 second pause between before/after
  
  // Navigate to specific case
  function goToCase(index) {
    if (index < 0) index = 0;
    if (index >= forensicRailCases.length) index = forensicRailCases.length - 1;
    
    currentIndex = index;
    pauseAutoPlay();
    resumeAutoPlayAfterDelay();
  }
  
  function nextCase() {
    const nextIndex = (currentIndex + 1) % forensicRailCases.length;
    goToCase(nextIndex);
  }
  
  function prevCase() {
    const prevIndex = currentIndex - 1 < 0 ? forensicRailCases.length - 1 : currentIndex - 1;
    goToCase(prevIndex);
  }
  
  // Auto-play control
  function startAutoPlay() {
    if (!browser) return;
    
    clearInterval(autoPlayInterval);
    isAutoPlaying = true;
    
    autoPlayInterval = setInterval(() => {
      nextCase();
    }, AUTO_PLAY_DELAY + AUTO_PLAY_PAUSE);
  }
  
  function pauseAutoPlay() {
    if (!browser) return;
    
    clearInterval(autoPlayInterval);
    isAutoPlaying = false;
  }
  
  function resumeAutoPlayAfterDelay() {
    if (!browser) return;
    
    setTimeout(() => {
      if (!isAutoPlaying) {
        startAutoPlay();
      }
    }, 3000);
  }
  
  // Scroll integration using scrollManager
  function handleStepEnter(response) {
    if (!browser) return;
    
    const stepId = parseInt(response.element.dataset.stepId);
    if (!isNaN(stepId) && stepId !== currentIndex) {
      goToCase(stepId);
    }
  }
  
  onMount(() => {
    if (!browser) return;
    
    // Setup scrollama for forensic section
    const { cleanup, stepsContainer: steps } = scrollManager.quickSetup(
      'forensic',
      forensicRailCases,
      {
        onEnter: (item, index, response) => handleStepEnter(response)
      },
      {
        stepHeight: '120vh',
        offset: 0.3,
        container: document.querySelector('.forensic-rail-container')
      }
    );
    
    stepsContainer = steps;
    
    // Start auto-play
    startAutoPlay();
    
    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextCase();
      if (e.key === 'ArrowLeft') prevCase();
      if (e.key === ' ') {
        e.preventDefault();
        isAutoPlaying ? pauseAutoPlay() : startAutoPlay();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      if (stepsContainer && stepsContainer.parentNode) {
        stepsContainer.parentNode.removeChild(stepsContainer);
      }
      scrollManager.destroySection('forensic');
      clearInterval(autoPlayInterval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  });
  
  onDestroy(() => {
    if (browser) {
      if (stepsContainer && stepsContainer.parentNode) {
        stepsContainer.parentNode.removeChild(stepsContainer);
      }
      scrollManager.destroySection('forensic');
      clearInterval(autoPlayInterval);
    }
  });
</script>

<section class="forensic-section" id="forensic-rail">
  <div class="forensic-rail-container">
    
    <!-- Horizontal rail layout (Desktop) -->
    <div class="rail-desktop">
      <div class="rail-header">
        <h2 class="section-title">Forensic Evidence Analysis</h2>
        <p class="section-subtitle">Official narratives versus documented evidence</p>
      </div>
      
      <div class="rail-wrapper">
        <div class="rail-track" style="transform: translateX(calc(-{currentIndex} * (100% / {VISIBLE_CASES})))">
          {#each forensicRailCases as forensicCase, i}
            <div 
              class="rail-item-wrapper"
              class:center={i === currentIndex}
              class:side={i !== currentIndex}
              style="
                flex: 0 0 calc(100% / {VISIBLE_CASES});
                height: {i === currentIndex ? '90%' : '70%'};
              "
            >
              <ForensicRailItem
                {forensicCase}
                isActive={i === currentIndex}
                isCenter={i === currentIndex}
                {isAutoPlaying}
              />
            </div>
          {/each}
        </div>
      </div>
      
      <!-- Controls -->
      <div class="rail-controls">
        <button class="nav-btn prev" on:click={prevCase} aria-label="Previous case">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        
        <div class="case-counter">
          <span class="current">{currentIndex + 1}</span>
          <span class="total">/{forensicRailCases.length}</span>
        </div>
        
        <button class="nav-btn next" on:click={nextCase} aria-label="Next case">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </button>
        
        <button 
          class="play-btn" 
          on:click={isAutoPlaying ? pauseAutoPlay : startAutoPlay}
          aria-label={isAutoPlaying ? 'Pause auto-play' : 'Play auto-play'}
        >
          {#if isAutoPlaying}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <rect x="5" y="4" width="4" height="12" rx="1"/>
              <rect x="11" y="4" width="4" height="12" rx="1"/>
            </svg>
          {:else}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 4L16 10L7 16V4Z" fill="currentColor"/>
            </svg>
          {/if}
        </button>
      </div>
    </div>
    
    <!-- Mobile layout -->
    <div class="rail-mobile">
      <div class="mobile-header">
        <h2 class="section-title">Forensic Evidence Analysis</h2>
        <p class="section-subtitle">Official narratives versus documented evidence</p>
      </div>
      
      <div class="mobile-rail">
        <div class="mobile-track" style="transform: translateX(-{currentIndex * 100}%)">
          {#each forensicRailCases as forensicCase, i}
            <div class="mobile-item-wrapper">
              <ForensicRailItem
                {forensicCase}
                isActive={i === currentIndex}
                isCenter={true}
                isMobile={true}
                {isAutoPlaying}
              />
            </div>
          {/each}
        </div>
      </div>
      
      <div class="mobile-controls">
        <button class="mobile-nav prev" on:click={prevCase}>
          ←
        </button>
        <div class="mobile-dots">
          {#each forensicRailCases as _, i}
            <button 
              class="mobile-dot" 
              class:active={i === currentIndex}
              on:click={() => goToCase(i)}
              aria-label="Go to case {i + 1}"
            ></button>
          {/each}
        </div>
        <button class="mobile-nav next" on:click={nextCase}>
          →
        </button>
      </div>
    </div>
    
  </div>
</section>

<style>
/* Main section */
.forensic-section {
  width: 100%;
  min-height: 100vh;
  background: #000;
  color: #fff;
  padding: 8vh 0;
  position: relative;
}

.forensic-rail-container {
  width: 100%;
  height: 100%;
  position: relative;
}

/* Desktop layout */
.rail-desktop {
  display: block;
  height: 100%;
}

.rail-mobile {
  display: none;
}

/* Rail header */
.rail-header {
  text-align: center;
  margin-bottom: 4rem;
  padding: 0 2rem;
}

.section-title {
  font-size: clamp(2rem, 4vw, 2.8rem);
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #fff;
  font-family: serif;
}

.section-subtitle {
  font-size: 1.1rem;
  opacity: 0.8;
  margin: 0;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.8);
}

/* Rail wrapper */
.rail-wrapper {
  width: 100%;
  overflow: hidden;
  padding: 3rem 0;
}

.rail-track {
  display: flex;
  gap: 2rem;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 600px;
}

.rail-item-wrapper {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.4;
  transform: scale(0.9);
  border-radius: 12px;
  overflow: hidden;
}

.rail-item-wrapper.center {
  opacity: 1;
  transform: scale(1);
  z-index: 10;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.rail-item-wrapper.side {
  opacity: 0.6;
  transform: scale(0.85);
  filter: blur(1px);
}

/* Controls */
.rail-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: 3rem;
  padding: 0 2rem;
}

.nav-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  background: rgba(225, 6, 0, 0.2);
  border-color: rgba(225, 6, 0, 0.4);
  transform: scale(1.05);
}

.case-counter {
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  font-variant-numeric: tabular-nums;
}

.current {
  color: #e10600;
}

.total {
  opacity: 0.5;
}

.play-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.05);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.play-btn:hover {
  background: rgba(225, 6, 0, 0.2);
  border-color: rgba(225, 6, 0, 0.4);
}

/* Mobile layout */
@media (max-width: 1024px) {
  .rail-desktop {
    display: none;
  }
  
  .rail-mobile {
    display: block;
    padding: 2rem 0;
  }
  
  .mobile-header {
    text-align: center;
    margin-bottom: 2rem;
    padding: 0 1rem;
  }
  
  .mobile-rail {
    width: 100%;
    overflow: hidden;
  }
  
  .mobile-track {
    display: flex;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .mobile-item-wrapper {
    flex: 0 0 100%;
    padding: 0 1rem;
  }
  
  .mobile-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin-top: 2rem;
    padding: 0 1rem;
  }
  
  .mobile-nav {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.05);
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .mobile-dots {
    display: flex;
    gap: 0.5rem;
  }
  
  .mobile-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: all 0.3s ease;
  }
  
  .mobile-dot.active {
    background: #e10600;
    transform: scale(1.2);
  }
}
</style>