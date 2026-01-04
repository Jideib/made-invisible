<script>
  import { browser } from "$app/environment";
  
  export let stacks = [];
  
  let total = 0;
  let segments = [];
  
  $: if (browser && stacks.length > 0) {
    total = stacks.reduce((sum, s) => sum + (s.value || 0), 0);
    segments = stacks.map((stack, i) => {
      const percentage = (stack.value / total) * 100;
      const color = stack.color || ['#e10600', '#ff6b6b', '#ff8e53'][i] || '#e10600';
      return {
        ...stack,
        percentage,
        color
      };
    });
  }
</script>

<div class="donut-chart">
  <div class="chart-container">
    <svg width="220" height="220" viewBox="0 0 220 220">
      <circle cx="110" cy="110" r="90" fill="transparent" stroke="rgba(255, 255, 255, 0.1)" stroke-width="20" />
      
      {#each segments as segment, i}
        {#if browser}
          <!-- Each segment as an arc -->
          <circle
            cx="110"
            cy="110"
            r="90"
            fill="transparent"
            stroke={segment.color}
            stroke-width="20"
            stroke-dasharray="565"
            stroke-dashoffset="{565 - (565 * segment.percentage / 100)}"
            stroke-linecap="round"
            transform="rotate(-90 110 110)"
            opacity="0.9"
            class="segment"
          />
        {/if}
      {/each}
      
      <text x="110" y="110" text-anchor="middle" dy="0.35em" class="total">
        <tspan x="110" dy="-0.6em" class="total-number">{total}</tspan>
        <tspan x="110" dy="1.2em" class="total-label">total cases</tspan>
      </text>
    </svg>
  </div>
  
  <div class="legend">
    {#each segments as segment}
      <div class="legend-item">
        <span class="legend-color" style="background: {segment.color}"></span>
        <span class="legend-text">
          <strong>{segment.label}:</strong> {segment.value} cases ({segment.percentage.toFixed(1)}%)
        </span>
      </div>
    {/each}
  </div>
</div>

<style>
.donut-chart {
  width: 100%;
  height: 100%;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.chart-container {
  position: relative;
}

.segment {
  transition: stroke-dashoffset 1s cubic-bezier(0.2, 0.8, 0.2, 1);
  animation: segmentAppear 1s ease-out;
}

@keyframes segmentAppear {
  from {
    stroke-dashoffset: 565;
  }
  to {
    stroke-dashoffset: inherit;
  }
}

.total {
  font-family: sans-serif;
  fill: white;
}

.total-number {
  font-size: 2rem;
  font-weight: 700;
  opacity: 0.9;
}

.total-label {
  font-size: 0.8rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.legend {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  width: 100%;
  max-width: 300px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.6rem 0.8rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  border-left: 3px solid var(--segment-color);
}

.legend-color {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-text {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.9);
  flex: 1;
}

.legend-text strong {
  color: white;
  font-weight: 600;
}

@media (max-width: 768px) {
  .donut-chart {
    padding: 1rem;
    gap: 1.5rem;
  }
  
  svg {
    width: 180px;
    height: 180px;
  }
  
  .total-number {
    font-size: 1.6rem;
  }
  
  .legend {
    max-width: 100%;
  }
  
  .legend-item {
    padding: 0.5rem 0.6rem;
  }
  
  .legend-text {
    font-size: 0.8rem;
  }
}
</style>