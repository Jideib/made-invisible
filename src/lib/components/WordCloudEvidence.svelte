<script>
  import { browser } from "$app/environment";
  
  export let terms = [];
  
  // Sort terms by weight for better visualization
  let sortedTerms = [];
  
  if (browser) {
    sortedTerms = [...terms].sort((a, b) => b.weight - a.weight);
  }
</script>

<div class="wordcloud-container">
  <div class="wordcloud">
    {#each sortedTerms as t}
      <span
        class="word"
        style="font-size: {0.8 + t.weight * 0.2}rem;
               opacity: {0.6 + t.weight * 0.05};
               color: {['#e10600', '#ff6b6b', '#ffd166', '#06d6a0', '#118ab2'][t.weight % 5]}"
        data-weight={t.weight}
      >
        {t.text}
      </span>
    {/each}
  </div>
  
  <div class="cloud-legend">
    <span class="legend-label">Word size indicates frequency/importance</span>
  </div>
</div>

<style>
.wordcloud-container {
  padding: 2rem;
  height: 320px;
  display: flex;
  flex-direction: column;
}

.wordcloud {
  flex: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  position: relative;
}

.word {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  margin: 0.25rem;
  transition: transform 0.3s ease, opacity 0.3s ease;
  cursor: default;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.word:hover {
  transform: scale(1.1);
  opacity: 1 !important;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.word::after {
  content: attr(data-weight);
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  opacity: 0.6;
  font-weight: 400;
  display: none;
}

.word:hover::after {
  display: block;
}

.cloud-legend {
  text-align: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.legend-label {
  font-size: 0.75rem;
  opacity: 0.6;
  font-style: italic;
}

@media (max-width: 768px) {
  .wordcloud-container {
    padding: 1rem;
    height: 280px;
  }
  
  .wordcloud {
    gap: 0.5rem;
    padding: 0.5rem;
  }
  
  .word {
    padding: 0.15rem 0.5rem;
    font-size: 0.9rem !important;
  }
}
</style>