import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { LineSegments, EdgesGeometry, LineBasicMaterial } from 'three';

const thickness = 0.001;
const meshMaterial = new MeshBasicMaterial({ color: 0x1c2826 });
const lineMaterial = new LineBasicMaterial({ color: 0x000000 });
const geometry = new BoxGeometry(1, thickness, 1);

export class Floor {
    constructor() {
        this.mesh = new Group();

        const cube = new Mesh(geometry, meshMaterial);
        const line = new LineSegments(new EdgesGeometry(geometry), lineMaterial)
        cube.position.set(0.5, 0 - (thickness / 2), -0.5)
        line.position.set(0.5, 0 - (thickness / 2), -0.5)

        this.mesh.add(cube, line)
    }
}
