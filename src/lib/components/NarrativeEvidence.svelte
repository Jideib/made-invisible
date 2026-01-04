<script>
  import { browser } from "$app/environment";
  
  export let phrases = [];
  
  // Category colors
  const categoryColors = {
    'tactical': '#e10600',
    'legal': '#ff8e53',
    'denial': '#ff6b6b',
    'default': '#ffb347'
  };
</script>

<div class="phrase-matrix">
  <div class="matrix-header">
    <h4>Official Narrative Phrases</h4>
    <p class="matrix-subtitle">Grid shows frequency and category</p>
  </div>
  
  <div class="matrix-grid">
    {#each phrases as phrase, i}
      <div 
        class="phrase-cell"
        class:faded={i > 0}  
        style="
          --phrase-color: {categoryColors[phrase.category] || categoryColors.default};
          font-size: {0.85 + (phrase.frequency / 30) * 0.6}rem;
        "
      >
        <div class="phrase-content">
          "{phrase.text}"
        </div>
        <div class="phrase-meta">
          <span class="phrase-category" style="color: var(--phrase-color)">
            {phrase.category}
          </span>
          <span class="phrase-frequency">
            {phrase.frequency}x
          </span>
        </div>
      </div>
    {/each}
  </div>
  
  <div class="matrix-footer">
    <p class="matrix-note">
      Phrases systematically reframe civilian casualties as legitimate combat engagements
    </p>
  </div>
</div>

<style>
.phrase-matrix {
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.matrix-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.matrix-header h4 {
  font-size: 1.3rem;
  margin: 0 0 0.3rem 0;
  color: white;
  font-weight: 600;
}

.matrix-subtitle {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.7;
  color: rgba(255, 255, 255, 0.8);
}

.matrix-grid {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.phrase-cell {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 6px;
  padding: 1rem;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.phrase-cell.faded {
  opacity: 0.4;
}

.phrase-cell:hover {
  opacity: 1;
  transform: translateY(-3px);
  border-color: var(--phrase-color, #e10600);
  box-shadow: 0 4px 12px rgba(225, 6, 0, 0.15);
}

.phrase-cell::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: var(--phrase-color, #e10600);
  opacity: 0.6;
}

.phrase-content {
  font-style: italic;
  line-height: 1.4;
  margin-bottom: 0.8rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: inherit;
}

.phrase-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.phrase-category {
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.phrase-frequency {
  opacity: 0.8;
  font-weight: 500;
}

.matrix-footer {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.matrix-note {
  margin: 0;
  font-size: 0.85rem;
  opacity: 0.7;
  line-height: 1.5;
  font-style: italic;
  color: #ffb3b3;
}

@media (max-width: 1024px) {
  .matrix-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .phrase-matrix {
    padding: 1rem;
  }
  
  .matrix-grid {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }
  
  .phrase-cell {
    padding: 0.8rem;
  }
  
  .matrix-header h4 {
    font-size: 1.1rem;
  }
  
  .phrase-content {
    font-size: 0.9rem;
  }
}
</style>