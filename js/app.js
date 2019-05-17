import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// objects
import Balloon from './Balloon'
import Floor from './Floor';


// SCENE
const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xcce0ff );
scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );


// CAMERA
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set( 0, 2, 10 );

const controls = new OrbitControls( camera );
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.minDistance = 100;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI / 2;


// LIGHTS
const ambient = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( ambient );

const light = new THREE.PointLight( 0xffffff, 1, 200 );
light.castShadow = true;
light.position.set( 0, 100, 0 );
scene.add( light );

scene.add(new THREE.CameraHelper( light.shadow.camera ))

let cubeCams = [];

// OBJECTS
for (let i = 0; i < 3; i++) {
    const cubeCamera = new THREE.CubeCamera(0, 1000, 512);
    cubeCams.push(cubeCamera);

    const size = 10;
    const balloon = new Balloon(
        size,
        'pink',
        (i * 30) + (size / 2),
        Math.random() * 20,
        0,
        cubeCamera
    ).render();

    scene.add(balloon)
}

// FLOOR
scene.add(new Floor().render());

// RENDER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );

// ANIMATION LOOP
function animate() {
    requestAnimationFrame( animate );
    controls.update()
    // cubeCamera.update(renderer, scene);
    cubeCams.forEach(c => c.update(renderer, scene));
    renderer.render( scene, camera );
}
animate();