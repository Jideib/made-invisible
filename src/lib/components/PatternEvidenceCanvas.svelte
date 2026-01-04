<script>
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import BarEvidence from "$lib/components/BarEvidence.svelte";
  import TimelineEvidence from "$lib/components/TimelineEvidence.svelte";
  import StackEvidence from "$lib/components/StackEvidence.svelte";
  import WordCloudEvidence from "$lib/components/WordCloudEvidence.svelte";
  import NarrativeEvidence from "$lib/components/NarrativeEvidence.svelte";
  
  export let pattern;
  
  let currentViz = pattern?.viz || 'bar';
  let previousViz = null;
  let isTransitioning = false;
  
  // Handle pattern changes with simple fade+scale
  $: if (browser && pattern && currentViz !== pattern.viz) {
    previousViz = currentViz;
    currentViz = pattern.viz;
    isTransitioning = true;
    
    // Reset transition after animation completes
    setTimeout(() => {
      isTransitioning = false;
      previousViz = null;
    }, 400);
  }
  
  // Visualization components mapping
  const vizComponents = {
    bar: BarEvidence,
    timeline: TimelineEvidence,
    stack: StackEvidence,
    word: WordCloudEvidence,
    text: NarrativeEvidence
  };
  
  // Visualization titles
  const vizTitles = {
    bar: 'Magnitude Comparison',
    timeline: 'Temporal Evolution',
    stack: 'Proportional Composition',
    word: 'Category Analysis',
    text: 'Language Pattern Analysis'
  };
</script>

<div class="canvas-container">
  <!-- SSR Fallback -->
  {#if !browser}
    <div class="ssr-fallback">
      <div class="ssr-content">
        <h4>{pattern?.title || 'Pattern Analysis'}</h4>
        <div class="viz-type-indicator">
          <span class="viz-badge">{pattern?.viz || 'data'} visualization</span>
          <span class="viz-title">{vizTitles[pattern?.viz] || 'Data Visualization'}</span>
        </div>
        <div class="ssr-placeholder">
          <div class="placeholder-content">
            <p>Interactive visualization loading...</p>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <!-- Transition wrapper -->
    <div class="transition-wrapper" class:transitioning={isTransitioning}>
      <!-- Outgoing visualization -->
      {#if previousViz && isTransitioning}
        <div class="viz-outgoing">
          <div class="viz-header">
            <h4 class="viz-title">{pattern.title}</h4>
            <div class="viz-meta">
              <span class="viz-type">{vizTitles[previousViz]}</span>
            </div>
          </div>
          <div class="viz-content">
            <svelte:component 
              this={vizComponents[previousViz]} 
              data={pattern.data}
              phases={pattern.phases}
              stacks={pattern.stacks}
              terms={pattern.terms}
              phrases={pattern.phrases}
            />
          </div>
        </div>
      {/if}
      
      <!-- Current visualization -->
      <div class="viz-current">
        <div class="viz-header">
          <h4 class="viz-title">{pattern.title}</h4>
          <div class="viz-meta">
            <span class="viz-type">{vizTitles[pattern.viz] || pattern.viz}</span>
            {#if pattern.question}
              <span class="viz-question">"{pattern.question}"</span>
            {/if}
          </div>
        </div>
        
        <div class="viz-content">
          {#if pattern.viz === "bar"}
            <BarEvidence data={pattern.data} />
          {:else if pattern.viz === "timeline"}
            <TimelineEvidence phases={pattern.phases} />
          {:else if pattern.viz === "stack"}
            <StackEvidence stacks={pattern.stacks} />
          {:else if pattern.viz === "word"}
            <WordCloudEvidence terms={pattern.terms} />
          {:else if pattern.viz === "text"}
            <NarrativeEvidence phrases={pattern.phrases} />
          {:else}
            <div class="fallback">
              <p>No visualization specified for this pattern.</p>
            </div>
          {/if}
        </div>
        
        <!-- Visualization footer -->
        {#if pattern.implication}
          <div class="viz-footer">
            <div class="implication-card">
              <span class="implication-label">Key Implication</span>
              <p>{pattern.implication}</p>
            </div>
          </div>
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
.canvas-container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #111;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* SSR Fallback */
.ssr-fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.ssr-content {
  text-align: center;
  color: rgba(255, 255, 255, 0.7);
  max-width: 300px;
}

.ssr-content h4 {
  color: #fff;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.viz-type-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.viz-badge {
  background: rgba(225, 6, 0, 0.2);
  color: #e10600;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.viz-title {
  font-size: 0.9rem;
  opacity: 0.8;
}

.ssr-placeholder {
  padding: 1rem;
}

.placeholder-content p {
  font-size: 0.9rem;
  opacity: 0.6;
  font-style: italic;
}

/* Transition wrapper */
.transition-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
}

/* Outgoing visualization */
.viz-outgoing {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 2rem;
  z-index: 1;
  opacity: 1;
  display: flex;
  flex-direction: column;
}

.transition-wrapper.transitioning .viz-outgoing {
  opacity: 0;
  transform: scale(0.98);
  transition: opacity 0.4s ease, transform 0.4s ease;
}

/* Current visualization */
.viz-current {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.transition-wrapper.transitioning .viz-current {
  animation: fadeInScale 0.4s ease-out;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.98);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Viz header */
.viz-header {
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.viz-header .viz-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.5rem 0;
  line-height: 1.2;
  font-family: serif;
}

.viz-meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.viz-type {
  font-size: 0.875rem;
  font-weight: 600;
  color: #ffb3b3;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-family: sans-serif;
}

.viz-question {
  font-size: 0.95rem;
  font-style: italic;
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.05);
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border-left: 3px solid #e10600;
  font-family: serif;
}

/* Viz content */
.viz-content {
  flex: 1;
  min-height: 200px;
  display: flex;
  flex-direction: column;
}

.fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
  text-align: center;
  padding: 2rem;
}

/* Viz footer */
.viz-footer {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.implication-card {
  background: rgba(225, 6, 0, 0.1);
  border-left: 3px solid #e10600;
  border-radius: 0 6px 6px 0;
  padding: 1rem 1.25rem;
}

.implication-label {
  display: block;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #ffb3b3;
  margin-bottom: 0.5rem;
  font-family: sans-serif;
}

.implication-card p {
  margin: 0;
  color: #fff;
  font-size: 0.95rem;
  line-height: 1.5;
  font-family: serif;
}

/* Responsive adjustments */
@media (max-width: 1024px) {
  .viz-header .viz-title {
    font-size: 1.25rem;
  }
  
  .transition-wrapper,
  .viz-outgoing {
    padding: 1.5rem;
  }
}

@media (max-width: 768px) {
  .canvas-container {
    border: none;
    box-shadow: none;
    border-radius: 0;
  }
  
  .transition-wrapper,
  .viz-outgoing {
    padding: 1rem;
  }
  
  .viz-header {
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
  
  .viz-header .viz-title {
    font-size: 1.1rem;
  }
  
  .viz-type {
    font-size: 0.8rem;
  }
  
  .viz-question {
    font-size: 0.875rem;
    padding: 0.375rem 0.5rem;
  }
  
  .implication-card p {
    font-size: 0.875rem;
  }
  
  .ssr-fallback {
    padding: 1rem;
  }
  
  .ssr-content h4 {
    font-size: 1.1rem;
  }
}

/* Print styles */
@media print {
  .canvas-container {
    break-inside: avoid;
    border: 1px solid #ddd;
    box-shadow: none;
  }
  
  .viz-header .viz-title {
    color: #000;
  }
  
  .implication-card {
    background: #f5f5f5;
    border-left-color: #ccc;
  }
  
  .implication-card p {
    color: #000;
  }
}
</style>