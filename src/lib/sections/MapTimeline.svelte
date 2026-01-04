<script>
  import { onMount, onDestroy } from "svelte";
  import { scrollManager } from "$lib/utils/scrollManager.js";
  import MapBase from "$lib/components/MapBase.svelte";
  import FallingDots from "$lib/components/FallingDots.svelte";
  import IncidentLabel from "$lib/components/IncidentLabel.svelte";
  import { incidentCases } from "$lib/data/incidentCases.js";

  let map;
  let activeIndex = -1;
  let spotlight = null;
  let dotPositions = {};
  let hasEnteredMapSection = false;
  let isTransitioning = false;
  let showCluster = false;
  let currentClusterId = null;

  function enterIncident(index) {
  if (isTransitioning || index === activeIndex) return;
  
  isTransitioning = true;
  const incident = incidentCases[index];
  
  // Handle cluster display
  if (incident.cluster) {
    showCluster = true;
    currentClusterId = incident.cluster;
  } else {
    showCluster = false;
    currentClusterId = null;
  }
  
  activeIndex = index;


  // Reset transition lock after animation
  setTimeout(() => {
    isTransitioning = false;
  }, 500);
}

  function handleStepEnter(response) {
    const stepId = parseInt(response.element.dataset.stepId);
    
    // Only handle incident steps (0-11)
    if (stepId >= 0 && stepId < incidentCases.length) {
      enterIncident(stepId);
    }
    
    // Handle summary/constellation step (if exists)
    if (stepId === incidentCases.length) {
      // Optional: Show all dots constellation
      // enterConstellation();
    }
  }

  function handleStepExit(response) {
    const stepId = parseInt(response.element.dataset.stepId);
    // Optional: Handle exit if needed
  }

  function goToPrevious() {
    if (activeIndex > 0) {
      enterIncident(activeIndex - 1);
      // Scroll to the corresponding step
      const stepElement = document.querySelector(`[data-step-id="${activeIndex - 1}"]`);
      if (stepElement) {
        stepElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  function goToNext() {
    if (activeIndex < incidentCases.length - 1) {
      enterIncident(activeIndex + 1);
      // Scroll to the corresponding step
      const stepElement = document.querySelector(`[data-step-id="${activeIndex + 1}"]`);
      if (stepElement) {
        stepElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }

  onMount(() => {
    // Setup scroll triggers using scrollManager
    const { cleanup } = scrollManager.quickSetup('scene1', incidentCases, {
      onEnter: (item, index, response) => {
        handleStepEnter(response);
      },
      onExit: (item, index, response) => {
        handleStepExit(response);
      }
    }, {
      stepHeight: '100vh',
      offset: 0.7
    });

    // Set initial state when map loads
    setTimeout(() => {
      if (map) {
        hasEnteredMapSection = true;
        // Start with first incident
        enterIncident(0);
      }
    }, 800);

    return cleanup;
  });

  onDestroy(() => {
    scrollManager.destroySection('scene1');
  });
</script>

<div class="timeline">
  <!-- Split layout: 30% card, 70% map -->
  <div class="split-layout">
    <!-- Left column: Incident Card (30%) -->
    <div class="card-column">
      {#if activeIndex >= 0}
        <div class="incident-card">
          <div class="card-header">
            <span class="year">{incidentCases[activeIndex].year}</span>
            <span class="location">{incidentCases[activeIndex].location}</span>
            <span class="victim-count">{incidentCases[activeIndex].deaths}+ killed</span>
          </div>
          <h3 class="card-title">{incidentCases[activeIndex].title}</h3>
          <p class="card-narrative">{incidentCases[activeIndex].short}</p>
          <p class="card-summary">{incidentCases[activeIndex].summary}</p>
          
          <!-- Navigation arrows under card -->
          <div class="nav-controls">
            <button 
              class="nav-arrow prev" 
              on:click={goToPrevious}
              disabled={activeIndex <= 0}
            >
              ← Previous
            </button>
            <div class="step-indicator">
              <div class="step-progress">
                {#each incidentCases as _, i}
                  <div 
                    class="step-dot"
                    class:active={i === activeIndex}
                    class:passed={i < activeIndex}
                  ></div>
                {/each}
              </div>
              <div class="step-counter">
                Incident {activeIndex + 1} of {incidentCases.length}
              </div>
            </div>
            <button 
              class="nav-arrow next"
              on:click={goToNext}
              disabled={activeIndex >= incidentCases.length - 1}
            >
              Next →
            </button>
          </div>
        </div>
      {/if}
    </div>
    
    <!-- Right column: Map (70%) -->
    <div class="map-column">
      <MapBase on:ready={(e) => map = e.detail} {spotlight} />
      
      {#if map && hasEnteredMapSection}
        <FallingDots map={map} {activeIndex} on:position={onDotMove} />
      {/if}
      
      <!-- Incident Label -->
      {#if activeIndex >= 0 && dotPositions[activeIndex]}
        <IncidentLabel
          text={incidentCases[activeIndex].location}
          x={dotPositions[activeIndex]?.x || window.innerWidth/2}
          y={dotPositions[activeIndex]?.y || window.innerHeight/2}
          active={activeIndex >= 0}
        />
      {/if}
    </div>
  </div>
  
  <!-- Hidden scroll triggers - Each trigger is 100vh tall -->
  <div class="scroll-triggers">
    {#each incidentCases as incident, i}
      <div 
        class="map-scroll-step"
        data-step-id={i}
        style="height: 100vh;"
      ></div>
    {/each}
  </div>  
</div>

<style>
.timeline {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #000;
}

/* Split layout */
.split-layout {
  display: flex;
  height: 100vh;
  background: #000;
}

.card-column {
  flex: 0 0 30%;
  padding: 2rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  z-index: 20;
  background: #000;
}

.map-column {
  flex: 0 0 70%;
  position: relative;
}

/* Incident Card */
.incident-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  padding: 2rem;
  color: #222;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  animation: cardSlideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.year {
  background: #e10600;
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
}

.location {
  background: rgba(0, 0, 0, 0.08);
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
}

.victim-count {
  background: rgba(225, 6, 0, 0.1);
  color: #e10600;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  border: 1px solid rgba(225, 6, 0, 0.2);
}

.card-title {
  font-size: 1.8rem;
  line-height: 1.2;
  margin: 0 0 1rem 0;
  color: #000;
  font-weight: 600;
  font-family: serif;
}

.card-narrative {
  font-size: 1.1rem;
  line-height: 1.4;
  margin: 0 0 1.5rem 0;
  color: #333;
  font-style: italic;
  font-family: serif;
}

.card-summary {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;
  font-family: serif;
}

/* Navigation Controls */
.nav-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
}

.nav-arrow {
  background: rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(0, 0, 0, 0.15);
  color: #222;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  font-family: sans-serif;
  transition: all 0.2s;
  white-space: nowrap;
}

.nav-arrow:hover:not(:disabled) {
  background: rgba(0, 0, 0, 0.15);
}

.nav-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* Step Indicator */
.step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.step-progress {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.step-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.step-dot.passed {
  background: rgba(0, 0, 0, 0.5);
}

.step-dot.active {
  background: #e10600;
  transform: scale(1.3);
}

.step-counter {
  font-size: 0.85rem;
  opacity: 0.7;
  text-align: center;
  letter-spacing: 0.5px;
  font-family: sans-serif;
}

/* Hide scroll triggers */
.scroll-triggers {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  pointer-events: none;
  opacity: 0;
  z-index: 1;
}

/* Animations */
@keyframes cardSlideIn {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .split-layout {
    flex-direction: column;
  }
  
  .card-column {
    flex: 0 0 auto;
    padding: 1rem;
    order: 2;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    height: auto;
    min-height: 300px;
  }
  
  .map-column {
    flex: 1;
    order: 1;
    height: 70vh;
  }
  
  .incident-card {
    max-width: none;
    box-shadow: none;
    border: none;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0;
  }
  
  .nav-controls {
    flex-wrap: wrap;
  }
  
  .nav-arrow {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }
}
</style>