import * as THREE from 'three';

export default class Floor {
    render() {
        var material = new THREE.MeshBasicMaterial({ color: 'grey' });
        var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), material );
        mesh.position.y = -20;
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;

        return mesh;
    }
}
