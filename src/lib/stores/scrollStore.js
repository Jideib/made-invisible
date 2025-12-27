import { writable } from 'svelte/store';

export const activeScene = writable(0);   // which scene user is currently in
export const scrollProgress = writable(0); // 0 → 1 progress through current scene
