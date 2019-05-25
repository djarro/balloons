import {
  Object3D,
  SphereGeometry,
  Mesh,
  MeshPhongMaterial,
  ConeGeometry,
  CubeCamera,
} from 'three';

export default class Balloon extends Object3D {
  constructor(props) {
    super(props);

    this.config = props;

    this.camera = new CubeCamera(0, 1000, 512);
    this.camera.position.z = 0;
    this.camera.updateMatrixWorld();

    this.material = new MeshPhongMaterial({
      shininess: 10,
      specular: 0xffffff,
      color: '#' + parseInt(Math.random() * 0xffffff).toString(16),
      envMap: this.camera.renderTarget.texture,
    });

    this.create();
  }

  create() {
    const oval = this.oval();
    const cone = this.cone();

    this.add(oval);
    this.add(cone);
  }

  oval() {
    const {size, x, y, z, stretch} = this.config;
    const geometry = new SphereGeometry(
      size,
      32,
      32,
    );

    const oval = new Mesh(geometry, this.material);
    oval.position.set(x, y, z);
    oval.castShadow = true;
    oval.receiveShadow = true;
    oval.scale.z = stretch;

    return oval;
  }

  cone() {
    const {size, x, z, stretch} = this.config;
    const radius = size / 4;
    const height = size / 3;

    const geometry = new ConeGeometry(radius, height, 32);

    const cone = new Mesh(geometry, this.material);
    cone.position.set(x, 0, z - stretch);
    cone.rotation.x = Math.PI / 2;
    cone.castShadow = true;
    cone.receiveShadow = true;

    return cone;
  }
}
