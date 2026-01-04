<script>
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { scrollManager } from "$lib/utils/scrollManager.js";
  import { systemPatterns } from "$lib/data/systemPatterns.js";
  import PatternEvidenceCanvas from "$lib/components/PatternEvidenceCanvas.svelte";

  let activePattern = 0;
  let stepsContainer;
  let isScrolling = false;
  
  // Handle step enter
  function handleStepEnter(response) {
    const stepId = parseInt(response.element.dataset.stepId);
    if (!isNaN(stepId) && stepId !== activePattern) {
      activePattern = stepId;
    }
  }
  
  // Handle step progress for optional effects
  function handleStepProgress(response) {
    // Could be used for parallax or subtle effects
    // console.log(`Pattern ${response.index} progress:`, response.progress);
  }

  onMount(() => {
    if (!browser) return;
    
    // Setup scrollama for the patterns section
    const { cleanup, stepsContainer: steps } = scrollManager.quickSetup(
      'patterns', 
      systemPatterns, 
      {
        onEnter: (item, index, response) => handleStepEnter(response),
        onProgress: (item, index, response) => handleStepProgress(response)
      }, 
      {
        stepHeight: '85vh',
        offset: 0.4,
        container: document.querySelector('.patterns-section')
      }
    );
    
    stepsContainer = steps;
    
    return cleanup;
  });

  onDestroy(() => {
    if (browser) {
      scrollManager.destroySection('patterns');
      if (stepsContainer && stepsContainer.parentNode) {
        stepsContainer.parentNode.removeChild(stepsContainer);
      }
    }
  });
</script>

<section class="patterns-section" id="system-patterns">
  <!-- Two-column layout as per spec -->
  <div class="patterns-container">
    <!-- LEFT COLUMN: Narrative text (40%) - Natural scroll -->
    <div class="narrative-column">
      {#each systemPatterns as pattern, index (pattern.id)}
        <div 
          class="pattern-narrative"
          class:active={index === activePattern}
          data-pattern-index={index}
        >
          <div class="pattern-header">
            <span class="pattern-number">{(index + 1).toString().padStart(2, '0')}</span>
            <h3>{pattern.title}</h3>
          </div>

          {#if pattern.finding}
            <div class="finding-container">
              <span class="section-label">Finding</span>
              <p class="finding">{pattern.finding}</p>
            </div>
          {/if}

          {#if pattern.question}
            <div class="question-container">
              <span class="section-label">Question</span>
              <p class="question">"{pattern.question}"</p>
            </div>
          {/if}

          {#if pattern.implication}
            <div class="implication-container">
              <span class="section-label">Implication</span>
              <p class="implication">{pattern.implication}</p>
            </div>
          {/if}
          
          <div class="viz-indicator">
            <span class="viz-badge">{pattern.viz} visualization</span>
          </div>
        </div>
      {/each}
    </div>
    
    <!-- RIGHT COLUMN: Sticky canvas (60%) - Remains visible -->
    <div class="canvas-column">
      <PatternEvidenceCanvas pattern={systemPatterns[activePattern]} />
    </div>
  </div>
</section>

<style>
.patterns-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: #000;
  color: #fff;
  padding: 0;
  overflow: hidden;
}

/* Two-column layout */
.patterns-container {
  display: flex;
  width: 100%;
  height: 100vh;
  position: relative;
}

/* LEFT COLUMN: Narrative (40%) */
.narrative-column {
  flex: 0 0 40%;
  padding: 8vh 4rem 8vh 6rem;
  overflow-y: auto;
  scroll-behavior: smooth;
  position: relative;
  z-index: 10;
  background: rgba(0, 0, 0, 0.8);
}

.pattern-narrative {
  min-height: 85vh;
  padding-bottom: 10vh;
  opacity: 0.4;
  transition: opacity 0.5s ease;
  font-family: serif;
}

.pattern-narrative.active {
  opacity: 1;
}

.pattern-header {
  display: flex;
  align-items: baseline;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.pattern-number {
  font-size: 0.875rem;
  font-weight: 600;
  color: #e10600;
  font-variant-numeric: tabular-nums;
  opacity: 0.8;
  font-family: sans-serif;
}

.pattern-header h3 {
  font-size: 1.8rem;
  margin: 0;
  color: #fff;
  font-weight: 600;
  line-height: 1.2;
  flex: 1;
  font-family: serif;
}

/* Section containers */
.finding-container,
.question-container,
.implication-container {
  margin-top: 2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border-left: 2px solid rgba(255, 255, 255, 0.1);
}

.question-container {
  background: rgba(225, 6, 0, 0.08);
  border-left-color: rgba(225, 6, 0, 0.3);
}

.implication-container {
  background: rgba(255, 179, 179, 0.05);
  border-left-color: rgba(255, 179, 179, 0.3);
}

.section-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #ffb3b3;
  margin-bottom: 0.75rem;
  opacity: 0.8;
  font-family: sans-serif;
}

.finding {
  font-style: italic;
  opacity: 0.9;
  margin: 0;
  line-height: 1.7;
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.9);
  font-family: serif;
}

.question {
  font-weight: 500;
  margin: 0;
  line-height: 1.6;
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.95);
  font-family: serif;
}

.implication {
  margin: 0;
  color: #ffb3b3;
  line-height: 1.6;
  font-size: 1rem;
  font-family: serif;
}

.viz-indicator {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.viz-badge {
  display: inline-block;
  padding: 0.375rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #fff;
  font-family: sans-serif;
}

/* RIGHT COLUMN: Canvas (60%) - Sticky */
.canvas-column {
  flex: 0 0 60%;
  position: sticky;
  top: 0;
  height: 100vh;
  background: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  z-index: 5;
}

/* Responsive design */
@media (max-width: 1200px) {
  .narrative-column {
    padding: 6vh 3rem 6vh 4rem;
  }
  
  .pattern-header h3 {
    font-size: 1.6rem;
  }
}

@media (max-width: 1024px) {
  .patterns-container {
    flex-direction: column;
    height: auto;
  }
  
  .narrative-column {
    flex: 0 0 auto;
    width: 100%;
    padding: 4rem 2rem;
    height: auto;
    overflow-y: visible;
  }
  
  .canvas-column {
    flex: 0 0 auto;
    position: relative;
    height: 70vh;
    width: 100%;
    top: 0;
    padding: 2rem;
  }
  
  .pattern-narrative {
    min-height: auto;
    padding-bottom: 4rem;
  }
}

@media (max-width: 768px) {
  .narrative-column {
    padding: 3rem 1.5rem;
  }
  
  .pattern-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .pattern-header h3 {
    font-size: 1.4rem;
  }
  
  .finding-container,
  .question-container,
  .implication-container {
    padding: 1rem;
    margin-top: 1.5rem;
  }
  
  .finding {
    font-size: 1rem;
  }
  
  .question {
    font-size: 1rem;
  }
  
  .implication {
    font-size: 0.95rem;
  }
  
  .canvas-column {
    padding: 1rem;
    height: 60vh;
  }
}
</style>