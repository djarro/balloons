import * as THREE from 'three';

/**
 * Create a balloon group mesh
 * @class Balloon
 *
 * @example
 *
 * const balloon = new Balloon(
 *   10,
 *   'pink',
 *   0,
 *   0,
 *   0
 * ).render()
 */

export default class Balloon {

    /**
     * Balloon constructor
     * @param {number} size
     * @param {string} color
     * @param {number} x position
     * @param {number} y position
     * @param {number} z position
     * @param {cubeCamera} Cube Camera
     */
    constructor(size, color, x, y, z, cubeCamera) {
        this.size = size;
        this.color = color;
        this.x = x;
        this.y = y;
        this.z = z;
        this.scale = 1.4;
        this.camera = cubeCamera;
        this.material = new THREE.MeshPhongMaterial({
            shininess: 10,
            color: this.color,
            specular: 0xffffff,
            envMap: this.camera.renderTarget.texture
        });
        // this.material = new THREE.MeshStandardMaterial({color: this.color, roughness: 0});
        // this.material = new THREE.MeshPhongMaterial({ color: this.color });
    }

    /**
     * Create oval mesh
     * @returns {THREE.Mesh}
     */
    oval() {
        const geometry = new THREE.SphereGeometry(
            this.size,
            32,
            32
        );

        const oval = new THREE.Mesh(geometry, this.material);
        oval.position.set(this.x, this.y, this.z);
        oval.castShadow = true;
        oval.receiveShadow = true;
        oval.scale.y = this.scale;

        return oval;
    }

    /**
     * Create cone mesh
     * @returns {THREE.Mesh}
     */
    cone() {
        const geometry = new THREE.ConeGeometry(this.size / 4, this.size / 3, 32);

        const cone = new THREE.Mesh(geometry, this.material);
        cone.position.set(this.x, this.y + -(this.size * this.scale), this.z);
        cone.castShadow = true;
        cone.receiveShadow = true;

        return cone
    }

    /**
     * Render a Balloon
     * @returns {THREE.Group}
     */
    render() {
        const balloon = new THREE.Group();

        const oval = this.oval();
        const cone = this.cone();

        balloon.add(oval);
        balloon.add(cone);
        balloon.add(this.camera);

        console.log(this.camera)

        return balloon;
    }
}
