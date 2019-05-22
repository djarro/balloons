import World from './World'

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('canvas');
  const world = new World(canvas);
  world.create();
});