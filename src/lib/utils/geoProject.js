// src/lib/utils/geoProject.js
export function projectToScreen(map, coords) {
  if (!map) return { x: 0, y: 0 };
  
  // Convert geographic coordinates to pixel coordinates
  const point = map.project([coords[1], coords[0]]);
  return {
    x: point.x,
    y: point.y
  };
}