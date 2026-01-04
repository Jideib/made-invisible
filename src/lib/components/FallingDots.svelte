<script>
  import { tick, onMount } from "svelte";
  import { incidentCases } from "$lib/data/incidentCases.js";

  export let map;
  export let activeIndex = -1;
  export let onPosition;
  export let showCluster = false;
  export let clusterId = null;

  let dots = [];
  let isDropping = false;
  let animationFrame = null;
  let activeCluster = null;

  // Get dot color based on incident type
  function getDotColor(category) {
    const colors = {
      'reprisal': '#e10600',
      'security-force-killing': '#ff6b6b',
      'screening': '#ff8e53',
      'protest': '#f9c74f',
      'raid': '#90be6d'
    };
    return colors[category] || '#e10600';
  }

  // Gravity easing function (matches spec)
  function gravityEasing(t) {
    return 1 - Math.pow(1 - t, 3); // Cubic ease-out
  }

  // Handle when activeIndex changes
  $: if (map && activeIndex >= 0 && !isDropping) {
    const incident = incidentCases[activeIndex];
    
    // Check if this incident is part of a cluster
    if (incident.cluster && incident.cluster !== activeCluster) {
      // Show the entire cluster
      showClusterDots(incident.cluster);
      activeCluster = incident.cluster;
    } else if (!incident.cluster && activeCluster) {
      // Not a cluster, clear cluster display
      activeCluster = null;
      hideClusterDots();
    }
    
    // Always drop the active incident dot
    dropIncident(activeIndex);
  }

  // Handle cluster display
  $: if (showCluster && clusterId && map) {
    showClusterDots(clusterId);
  }

  async function dropIncident(idx) {
    if (isDropping) return;
    
    isDropping = true;
    const incident = incidentCases[idx];
    
    // Convert lat/long to screen coordinates
    const point = map.project([incident.coords[1], incident.coords[0]]);
    
    // Create or get dot
    if (!dots[idx]) {
      dots[idx] = {
        x: point.x,
        y: -50, // Start above screen
        visible: false,
        targetY: point.y,
        progress: 0,
        bounceCount: 0,
        color: getDotColor(incident.category),
        isCluster: !!incident.cluster
      };
    }
    
    const dot = dots[idx];
    dot.visible = true;
    dot.x = point.x;
    dot.targetY = point.y;
    dot.progress = 0;
    dot.bounceCount = 0;
    dot.color = getDotColor(incident.category);
    dot.isCluster = !!incident.cluster;
    
    // Animate with gravity easing (bounce effect)
    const animate = (timestamp) => {
      if (!dot.visible) return;
      
      // Calculate progress with gravity easing
      if (dot.progress < 1) {
        dot.progress = Math.min(dot.progress + 0.03, 1);
        
        // Apply gravity easing with bounce
        let easedProgress = gravityEasing(dot.progress);
        
        // Add bounce effect at the end
        if (dot.progress > 0.9 && dot.bounceCount < 2) {
          const overshoot = 0.1 * Math.sin((dot.progress - 0.9) * Math.PI * 4);
          easedProgress -= overshoot;
          if (dot.progress >= 0.95 && dot.bounceCount === 0) {
            dot.bounceCount = 1;
          } else if (dot.progress >= 0.98 && dot.bounceCount === 1) {
            dot.bounceCount = 2;
          }
        }
        
        // Calculate current position
        const startY = -50;
        const distance = dot.targetY - startY;
        dot.y = startY + (distance * easedProgress);
        
        // Update dot array for reactivity
        dots = [...dots];
        
        // Only emit position for the active (primary) dot in spotlight
        if (onPosition && idx === activeIndex) {
          onPosition({ detail: { 
            index: idx, 
            x: dot.x, 
            y: dot.y,
            deaths: incident.deaths 
          } });
        }
        
        // Continue animation
        animationFrame = requestAnimationFrame(animate);
      } else {
        // Animation complete
        dot.y = dot.targetY;
        dots = [...dots];
        
        if (onPosition && idx === activeIndex) {
          onPosition({ detail: { 
            index: idx, 
            x: dot.x, 
            y: dot.targetY,
            deaths: incident.deaths 
          } });
        }
        
        isDropping = false;
        if (animationFrame) {
          cancelAnimationFrame(animationFrame);
          animationFrame = null;
        }
      }
    };
    
    // Start animation
    animationFrame = requestAnimationFrame(animate);
  }

  // Show all dots in a cluster
  async function showClusterDots(clusterId) {
    if (!map) return;
    
    // Clear any existing animation
    if (animationFrame) {
      cancelAnimationFrame(animationFrame);
      animationFrame = null;
    }
    
    // Find all incidents in this cluster
    const clusterIncidents = incidentCases.filter(inc => inc.cluster === clusterId);
    
    // Show all cluster dots
    clusterIncidents.forEach(incident => {
      const idx = incidentCases.findIndex(inc => inc.id === incident.id);
      const point = map.project([incident.coords[1], incident.coords[0]]);
      
      if (!dots[idx]) {
        dots[idx] = {
          x: point.x,
          y: point.y,
          visible: true,
          targetY: point.y,
          progress: 1,
          bounceCount: 2,
          color: getDotColor(incident.category),
          isCluster: true,
          opacity: 0.7 // Slightly faded for cluster members
        };
      } else {
        dots[idx].visible = true;
        dots[idx].x = point.x;
        dots[idx].y = point.y;
        dots[idx].progress = 1;
        dots[idx].color = getDotColor(incident.category);
        dots[idx].isCluster = true;
        dots[idx].opacity = 0.7;
      }
    });
    
    dots = [...dots];
  }

  // Hide cluster dots (but keep active one)
  function hideClusterDots() {
    // Hide all dots except the active one
    dots.forEach((dot, idx) => {
      if (idx !== activeIndex && dot) {
        dot.visible = false;
      }
    });
    dots = [...dots];
  }

  onMount(() => {
    // Initialize dots array
    dots = incidentCases.map(() => null);
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  });
</script>

{#each dots as dot, i}
  {#if dot && dot.visible}
    <div 
      class="dot"
      class:cluster={dot.isCluster}
      class:primary={i === activeIndex}
      style="
        left:{dot.x}px; 
        top:{dot.y}px;
        transform: translate(-50%, -50%) scale({dot.progress});
        opacity: {dot.opacity || (i === activeIndex ? 1 : 0.7)};
        background: {dot.color};
        box-shadow: 0 0 {20 * dot.progress}px {dot.color}80;
      "
    ></div>
  {/if}
{/each}

<style>
.dot {
  position: absolute;
  width: 16px;
  height: 16px;
  background: #e10600;
  border-radius: 50%;
  z-index: 25;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.dot.cluster {
  width: 12px;
  height: 12px;
  opacity: 0.7;
}

.dot.primary {
  width: 18px;
  height: 18px;
  z-index: 26;
  animation: gentlePulse 2s infinite;
}

@keyframes gentlePulse {
  0%, 100% { 
    box-shadow: 0 0 20px currentColor;
  }
  50% { 
    box-shadow: 0 0 30px currentColor;
  }
}
</style>