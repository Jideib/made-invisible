<script>
  import { browser } from "$app/environment";
  
  export let data = [];
  
  let maxValue = 1;
  
  $: if (browser) {
    maxValue = Math.max(...data.map(d => d.value || 0), 1);
  }
  
  // Get color based on severity (0-10 scale)
  function getBarColor(severity) {
    if (severity >= 8) return '#e10600';     // High severity
    if (severity >= 6) return '#ff6b6b';     // Medium-high
    if (severity >= 4) return '#ff8e53';     // Medium
    if (severity >= 2) return '#ffb347';     // Low-medium
    return '#ffd166';                        // Low
  }
</script>

<div class="bar-chart">
  {#each data as d}
    <div class="bar-container">
      <div class="bar">
        <div 
          class="bar-fill"
          style="
            width: {browser ? ((d.value || 0) / maxValue) * 100 : 0}%;
            background: {getBarColor(d.severity || 5)};
          "
        >
          <span class="bar-value">{d.value}+</span>
        </div>
      </div>
      <div class="bar-label">{d.label}</div>
      <div class="bar-meta">
        <span class="bar-severity">Severity: {d.severity || 'N/A'}/10</span>
      </div>
    </div>
  {/each}
</div>

<style>
.bar-chart {
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.bar-container {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.bar {
  width: 100%;
  height: 28px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  height: 100%;
  border-radius: 4px;
  transition: width 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  position: relative;
  min-width: 40px;
}

.bar-value {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.8rem;
  font-weight: 600;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
}

.bar-label {
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

.bar-meta {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
}

.bar-severity {
  opacity: 0.8;
}

@media (max-width: 768px) {
  .bar-chart {
    padding: 1rem;
    gap: 1rem;
  }
  
  .bar {
    height: 22px;
  }
  
  .bar-label {
    font-size: 0.8rem;
  }
}
</style>