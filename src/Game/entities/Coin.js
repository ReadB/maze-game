import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { LineSegments, EdgesGeometry, LineBasicMaterial } from 'three';

const thickness = 0.15;
const meshMaterial = new MeshBasicMaterial({ color: 0xFFFFAA });
const lineMaterial = new LineBasicMaterial({ color: 0x000000 });
const geometry = new BoxGeometry(thickness, thickness, thickness / 2);

export class Coin {
    constructor() {
        this.mesh = new Group();
        const cube = new Mesh(geometry, meshMaterial);
        const line = new LineSegments(new EdgesGeometry(geometry), lineMaterial);
        this.group = new Group();
        this.group.add(cube, line);
        this.group.position.set(0.5, 0.5, -0.5);
        this.mesh.add(this.group);
    }

    update(timestamp) {

    }
    updatePlayer(player) {

    }
}
