import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { LineSegments, EdgesGeometry, LineBasicMaterial } from 'three';
import { randInt } from '../../utils';

const thickness = 0.2;

const meshMaterial = new MeshBasicMaterial({ color: 0xD64550 });
const lineMaterial = new LineBasicMaterial({ color: 0x000000 });
const geometry = new BoxGeometry(thickness, thickness, thickness);

export class Threat {
    constructor() {
        this.mesh = new Group();
        this.randInt100 = randInt(100);
        this.randInt = randInt();
        this.rotSpeed = 1000 - (this.randInt)

        const cube = new Mesh(geometry, meshMaterial);
        const line = new LineSegments(new EdgesGeometry(geometry), lineMaterial)

        this.group = new Group();
        this.group.add(cube, line);
        this.group.position.set(0.5, 0.5, -0.5);
        this.mesh.add(this.group);

    }

    update(timestamp) {
        let rotSpeed = 1000 - (this.randInt100 * 3)
        let rotDir = this.randInt ? -1 : 1
        this.group.rotation.x = timestamp / (rotSpeed * rotDir);
        this.group.rotation.z = timestamp / (rotSpeed * -rotDir);
    }

    updatePlayer(player) {
        
    }

}
