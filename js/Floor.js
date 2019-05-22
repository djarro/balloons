import {Object3D, MeshBasicMaterial, Mesh, PlaneBufferGeometry} from 'three';

export default class Floor extends Object3D {
  constructor(props) {
    super(props);

    const material = new MeshBasicMaterial({ color: 'lightgrey' });
    this.plane = new Mesh(new PlaneBufferGeometry(100, 100), material);
    this.plane.position.x = 0;
    this.plane.position.y = 0;
    this.plane.receiveShadow = true;

    this.add(this.plane);
  }
}