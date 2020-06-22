import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { LineSegments, EdgesGeometry, LineBasicMaterial } from 'three';

const meshMaterial = new MeshBasicMaterial({ color: 0x000000 });
const lineMaterial = new LineBasicMaterial({ color: 0x4B6C67 });
const thickness = 0.2;

export class SWall {
    constructor() {
        this.mesh = new Group()
        const geometry = new BoxGeometry(1 + thickness, 1, thickness);
        const cube = new Mesh(geometry, meshMaterial);
        const line = new LineSegments(new EdgesGeometry(geometry), lineMaterial)

        cube.position.set(0.5, 0.5, 0);
        line.position.set(0.5, 0.5, 0);
        this.mesh.add(cube, line);
    }

}

export class EWall {
    constructor() {
        this.mesh = new Group()
        const geometry = new BoxGeometry(thickness, 1, 1 + thickness);
        const cube = new Mesh(geometry, meshMaterial);
        const line = new LineSegments(new EdgesGeometry(geometry), lineMaterial)

        cube.position.set(1, 0.5, -0.5);
        line.position.set(1, 0.5, -0.5);
        this.mesh.add(cube, line);
    }
}
