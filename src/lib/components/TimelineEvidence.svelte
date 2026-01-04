<script>
  import { browser } from "$app/environment";
  
  export let phases = [];
</script>

<div class="timeline-bands">
  <div class="bands-container">
    {#each phases as phase, i}
      <div 
        class="band"
        style="
          height: {(phase.bandWidth || 60) + 10}px;
          margin-top: {i * 15}px;
        "
      >
        <div class="band-content">
          <div class="band-header">
            <h4>{phase.label}</h4>
            <span class="period">{phase.period}</span>
          </div>
          <div class="band-body">
            <p class="description">{phase.description}</p>
            <div class="band-meta">
              <span class="region">📍 {phase.geographic}</span>
              <span class="intensity">⚡ {phase.intensity}</span>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
  
  <div class="legend">
    <span class="legend-text">Band width indicates geographic spread</span>
  </div>
</div>

<style>
.timeline-bands {
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}

.bands-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.band {
  background: linear-gradient(
    90deg,
    rgba(225, 6, 0, 0.15) 0%,
    rgba(225, 6, 0, 0.08) 20%,
    rgba(225, 6, 0, 0.03) 100%
  );
  border: 1px solid rgba(225, 6, 0, 0.2);
  border-radius: 6px;
  padding: 0.8rem 1.2rem;
  transition: transform 0.3s ease;
  position: relative;
}

.band:hover {
  transform: translateX(5px);
  background: linear-gradient(
    90deg,
    rgba(225, 6, 0, 0.2) 0%,
    rgba(225, 6, 0, 0.1) 20%,
    rgba(225, 6, 0, 0.05) 100%
  );
}

.band-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.band-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.band-header h4 {
  margin: 0;
  font-size: 1rem;
  color: white;
  font-weight: 600;
}

.period {
  font-size: 0.8rem;
  color: #ffb3b3;
  background: rgba(225, 6, 0, 0.2);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  font-weight: 500;
}

.band-body {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 1rem;
}

.description {
  margin: 0;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
  flex: 1;
}

.band-meta {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.region, .intensity {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  white-space: nowrap;
}

.legend {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}

.legend-text {
  font-size: 0.75rem;
  opacity: 0.6;
  font-style: italic;
}

@media (max-width: 768px) {
  .timeline-bands {
    padding: 1rem;
  }
  
  .band {
    padding: 0.6rem 1rem;
  }
  
  .band-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.3rem;
  }
  
  .band-body {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .band-meta {
    flex-direction: row;
    gap: 1rem;
  }
}
</style>