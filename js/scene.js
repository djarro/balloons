import { Scene, Color, Fog } from 'three';

export default () => {
    const scene = new Scene();
    const color = 0xcce0ff;

    scene.background = new Color(color);
    // scene.fog = new Fog(color, 40, 50);

    return scene;
}