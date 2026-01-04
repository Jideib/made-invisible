<script>
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import ForensicSlider from "$lib/components/ForensicSlider.svelte";
  
  export let forensicCase;
  export let isActive = false;
  export let isCenter = false;
  export let isMobile = false;
  export let isAutoPlaying = true;
  
  // Scroll state
  let scrollPosition = 0;
  let isScrolling = false;
  let autoScrollInterval;
  let hasUserScrolled = false;
  
  // Auto-scroll configuration
  const SCROLL_SPEED = 0.3; // pixels per frame
  const AUTO_PLAY_PAUSE = 3000; // 3 second pause
  
  // Calculate content sections
  let totalHeight = 0;
  let contentRef;
  let containerRef;
  
  // Update scroll position
  function updateScrollPosition() {
    if (!contentRef || !containerRef || !browser) return;
    
    totalHeight = contentRef.scrollHeight - containerRef.clientHeight;
    if (totalHeight <= 0) totalHeight = 1;
    
    // Normalize scroll position (0 to 1)
    scrollPosition = Math.max(0, Math.min(1, scrollPosition));
    
    // Update actual scroll
    containerRef.scrollTop = scrollPosition * totalHeight;
  }
  
  // Start auto-scroll
  function startAutoScroll() {
    if (!isCenter || !isActive || !isAutoPlaying || hasUserScrolled || !browser) return;
    
    clearInterval(autoScrollInterval);
    
    autoScrollInterval = setInterval(() => {
      if (scrollPosition >= 1) {
        // At bottom, reset to top
        scrollPosition = 0;
        hasUserScrolled = false;
      } else {
        // Scroll down
        scrollPosition = Math.min(1, scrollPosition + SCROLL_SPEED / 100);
      }
      
      updateScrollPosition();
      
      // If reached bottom, pause before resetting
      if (scrollPosition >= 1) {
        clearInterval(autoScrollInterval);
        setTimeout(() => {
          if (isCenter && isActive && isAutoPlaying && !hasUserScrolled) {
            startAutoScroll();
          }
        }, AUTO_PLAY_PAUSE);
      }
    }, 16); // ~60fps
  }
  
  // Handle user scroll
  function handleScroll() {
    if (!containerRef || !browser) return;
    
    hasUserScrolled = true;
    scrollPosition = containerRef.scrollTop / totalHeight;
    
    // Clear auto-scroll when user interacts
    clearInterval(autoScrollInterval);
    
    // Restart auto-scroll after a delay if user stops scrolling
    if (isAutoPlaying) {
      setTimeout(() => {
        if (!isScrolling && isCenter && isActive) {
          hasUserScrolled = false;
          startAutoScroll();
        }
      }, 3000);
    }
  }
  
  // Scroll to section
  function scrollToSection(section) {
    if (!contentRef || !containerRef) return;
    
    hasUserScrolled = true;
    const sections = contentRef.querySelectorAll('.section');
    const target = sections[section];
    
    if (target) {
      const offset = target.offsetTop - containerRef.offsetTop;
      containerRef.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
      
      // Update scroll position after animation
      setTimeout(() => {
        scrollPosition = containerRef.scrollTop / totalHeight;
      }, 500);
    }
    
    // Restart auto-scroll after delay
    if (isAutoPlaying) {
      setTimeout(() => {
        if (isCenter && isActive) {
          hasUserScrolled = false;
          startAutoScroll();
        }
      }, 5000);
    }
  }
  
  // Watch active state
  $: if (isCenter && isActive && browser) {
    // Reset scroll to top when becoming active
    scrollPosition = 0;
    hasUserScrolled = false;
    
    // Wait for DOM to update, then start auto-scroll
    setTimeout(() => {
      updateScrollPosition();
      if (isAutoPlaying) {
        startAutoScroll();
      }
    }, 100);
  } else if (!isCenter || !isActive) {
    // Stop auto-scroll when not active
    clearInterval(autoScrollInterval);
    hasUserScrolled = false;
  }
  
  // Cleanup
  onMount(() => {
    if (!browser) return;
    
    // Initial update
    setTimeout(updateScrollPosition, 100);
    
    return () => {
      clearInterval(autoScrollInterval);
    };
  });
  
  onDestroy(() => {
    clearInterval(autoScrollInterval);
  });
</script>

<div 
  class="forensic-rail-item" 
  class:center={isCenter}
  class:mobile={isMobile}
>
  <!-- Case header -->
  <div class="case-header">
    <h3 class="case-title">{forensicCase.title}</h3>
    <div class="case-meta">
      <span class="location">{forensicCase.location}</span>
      <span class="date">{forensicCase.date}</span>
      <span class="casualties">
        {#if typeof forensicCase.casualties === 'number'}
          {forensicCase.casualties}+ casualties
        {:else if forensicCase.casualties?.evidence}
          {forensicCase.casualties.evidence}
        {/if}
      </span>
    </div>
  </div>
  
  <!-- Scrollable content -->
  <div 
    class="content-container" 
    bind:this={containerRef}
    on:scroll={handleScroll}
    on:wheel|passive={() => { isScrolling = true; hasUserScrolled = true; clearInterval(autoScrollInterval); }}
    on:wheel|passive|once={() => setTimeout(() => isScrolling = false, 100)}
  >
    <div class="content" bind:this={contentRef}>
      <!-- Section 1: Before image + Official Narrative -->
      <div class="section before-section">
        <div class="section-header">
          <div class="section-label">Before & Official Narrative</div>
          <div class="section-indicator">1/2</div>
        </div>
        
        <div class="image-container">
          <ForensicSlider 
            before={forensicCase.before} 
            after={forensicCase.before} 
            position={0}
            interactive={false}
            auto={false}
          />
          <div class="image-label">Satellite imagery before incident</div>
        </div>
        
        <div class="narrative-content">
          <div class="narrative-label">Official Army Statement</div>
          <div class="narrative-text">
            {#each forensicCase.officialNarrative as statement}
              <p>"{statement}"</p>
            {/each}
          </div>
        </div>
      </div>
      
      <!-- Transition divider -->
      <div class="transition-divider">
        <div class="divider-line"></div>
        <div class="divider-label">Evidence Reveal</div>
        <div class="divider-line"></div>
      </div>
      
      <!-- Section 2: After image + Evidence -->
      <div class="section after-section">
        <div class="section-header">
          <div class="section-label">After & Documented Evidence</div>
          <div class="section-indicator">2/2</div>
        </div>
        
        <div class="image-container">
          <ForensicSlider 
            before={forensicCase.before} 
            after={forensicCase.after} 
            position={100}
            interactive={false}
            auto={false}
          />
          <div class="image-label">Satellite imagery after incident</div>
        </div>
        
        <div class="evidence-content">
          <div class="evidence-label">Observed Evidence</div>
          <div class="evidence-text">
            {#each forensicCase.observedEvidence as evidence}
              <p>• {evidence}</p>
            {/each}
          </div>
          
          <!-- Sources -->
          <div class="sources">
            <div class="sources-label">Sources:</div>
            <div class="sources-list">
              {#each forensicCase.sources as source}
                <span class="source">{source}</span>
              {/each}
            </div>
          </div>
          
          <!-- Analysis -->
          {#if forensicCase.analysis}
            <div class="analysis">
              <div class="analysis-label">Analysis:</div>
              <p class="analysis-text">{forensicCase.analysis}</p>
            </div>
          {/if}
        </div>
      </div>
    </div>
  </div>
  
  <!-- Scroll indicator -->
  <div class="scroll-indicator" class:visible={isCenter && isActive}>
    <div class="indicator-dots">
      <button 
        class="indicator-dot" 
        class:active={scrollPosition < 0.5}
        on:click={() => scrollToSection(0)}
        aria-label="Scroll to Before section"
      ></button>
      <button 
        class="indicator-dot" 
        class:active={scrollPosition >= 0.5}
        on:click={() => scrollToSection(1)}
        aria-label="Scroll to After section"
      ></button>
    </div>
    <div class="indicator-hint">
      {#if !hasUserScrolled && isAutoPlaying}
        Auto-scrolling...
      {:else if scrollPosition < 0.5}
        Scroll for evidence →
      {:else}
        View sources & analysis ↓
      {/if}
    </div>
  </div>
</div>

<style>
.forensic-rail-item {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.forensic-rail-item.center {
  border-color: rgba(225, 6, 0, 0.3);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

/* Case header */
.case-header {
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
}

.case-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #fff;
  line-height: 1.2;
  font-family: serif;
}

.case-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  flex-wrap: wrap;
}

.location:after,
.date:after {
  content: "•";
  margin-left: 1rem;
  opacity: 0.5;
}

.casualties {
  color: #e10600;
  font-weight: 600;
}

/* Content container */
.content-container {
  flex: 1;
  overflow-y: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}

.content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  min-height: 100%;
}

/* Sections */
.section {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.section-label {
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.8);
}

.section-indicator {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  font-variant-numeric: tabular-nums;
}

/* Image container */
.image-container {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: #000;
}

.image-label {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.8rem;
  text-align: center;
}

/* Narrative and Evidence content */
.narrative-content,
.evidence-content {
  padding: 1rem;
  border-radius: 8px;
}

.narrative-content {
  background: rgba(44, 82, 130, 0.1);
  border: 1px solid rgba(44, 82, 130, 0.3);
}

.evidence-content {
  background: rgba(197, 48, 48, 0.1);
  border: 1px solid rgba(197, 48, 48, 0.3);
}

.narrative-label,
.evidence-label {
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 0.75rem;
  display: block;
}

.narrative-label {
  color: #2c5282;
}

.evidence-label {
  color: #c53030;
}

.narrative-text p,
.evidence-text p {
  margin: 0.5rem 0;
  line-height: 1.5;
  color: rgba(255, 255, 255, 0.9);
}

.evidence-text p {
  padding-left: 1rem;
  border-left: 2px solid rgba(197, 48, 48, 0.5);
}

/* Transition divider */
.transition-divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
}

.divider-label {
  font-size: 0.8rem;
  color: #e10600;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
}

/* Sources */
.sources {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.sources-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 0.5rem;
  display: block;
}

.sources-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.source {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  padding: 0.25rem 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Analysis */
.analysis {
  margin-top: 1.5rem;
  padding: 1rem;
  background: rgba(225, 6, 0, 0.1);
  border-left: 3px solid #e10600;
  border-radius: 0 6px 6px 0;
}

.analysis-label {
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #ffb3b3;
  margin-bottom: 0.5rem;
  display: block;
}

.analysis-text {
  margin: 0;
  color: #fff;
  font-size: 0.9rem;
  line-height: 1.5;
}

/* Scroll indicator */
.scroll-indicator {
  padding: 1rem 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: none;
}

.scroll-indicator.visible {
  display: block;
}

.indicator-dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.indicator-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  cursor: pointer;
  padding: 0;
  transition: all 0.3s ease;
}

.indicator-dot.active {
  background: #e10600;
  transform: scale(1.2);
}

.indicator-dot:hover {
  background: rgba(225, 6, 0, 0.7);
}

.indicator-hint {
  text-align: center;
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  font-style: italic;
}

/* Mobile adjustments */
.forensic-rail-item.mobile {
  border-radius: 8px;
}

.forensic-rail-item.mobile .case-header {
  padding: 1rem;
}

.forensic-rail-item.mobile .case-title {
  font-size: 1.2rem;
}

.forensic-rail-item.mobile .content {
  padding: 1rem;
  gap: 1.5rem;
}

.forensic-rail-item.mobile .section {
  min-height: 300px;
}

@media (max-width: 768px) {
  .forensic-rail-item {
    border-radius: 8px;
  }
  
  .case-header {
    padding: 1rem;
  }
  
  .case-title {
    font-size: 1.2rem;
  }
  
  .case-meta {
    flex-direction: column;
    gap: 0.25rem;
    align-items: flex-start;
  }
  
  .location:after,
  .date:after {
    display: none;
  }
  
  .content {
    padding: 1rem;
    gap: 1.5rem;
  }
  
  .section {
    min-height: 300px;
  }
}
</style>