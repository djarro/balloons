import {
  WebGLRenderer,
  PerspectiveCamera,
  AmbientLight,
  PointLight,
} from 'three';
import Floor from './Floor';
import Balloon from './Balloon';
import scene from './scene';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

export default class World {

  constructor(canvas) {
    this.renderer = new WebGLRenderer({canvas: canvas, antialias: true});
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.scene = scene();

    this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 20000);
    this.camera.position.set(0, -5, 2);
    this.camera.rotateX(1.5);
    this.scene.add(this.camera);

    this.camera.up.set(0, 0, 1);

    this.controls = new OrbitControls(this.camera);
    // this.controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
    // this.controls.dampingFactor = 0.25;
    // this.controls.screenSpacePanning = false;
    this.controls.minDistance = 10;
    this.controls.maxDistance = 40;
    // this.controls.maxPolarAngle = Math.PI / 2;


    this.balloons = [];

  }

  create() {
    const floor = new Floor();

    this.scene.add(floor);

    const ambient = new AmbientLight(0x404040); // soft white light
    this.scene.add(ambient);

    const light = new PointLight(0xffffff, 0.5, 200);
    light.castShadow = true;
    light.position.set(10, -10, 10);
    this.scene.add(light);

    for (let i = 0; i < 3; i++) {
      const balloon = new Balloon({
        x: i * 2,
        y: 0,
        z: 2,
        size: 1,
        stretch: 1.3,
      });

      this.scene.add(balloon);

      this.balloons.push(balloon);
    }



    // start animating the scene
    this.animate();
  }

  animate() {
    const tick = () => {
      requestAnimationFrame(tick);
      this.balloons.forEach(b => b.camera.update(this.renderer, this.scene));
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    };

    tick();
  }

}