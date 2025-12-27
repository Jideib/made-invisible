export function projectToScreen(map, [lat, lon]) {
  if (!map) return null;
  const p = map.project([lon, lat]);     // MapLibre expects [lng,lat]
  return { x: p.x, y: p.y };
}