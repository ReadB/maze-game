import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { LineSegments, EdgesGeometry, LineBasicMaterial } from 'three';
import { randInt } from '../../utils';

const thickness = 0.2;

const lineMaterial = new LineBasicMaterial({ color: 0x000000 });
const geometry = new BoxGeometry(thickness, thickness, thickness / 1.5);

export class Treasure {
    constructor(name, worth, color = 0xFFFFAA) {
        this.name = name;
        this.mesh = new Group();
        this.randInt = randInt(100);
        this.worth = worth || this.randInt;
        this.rotSpeed = 1000 - (this.worth * 2)
        this.rotDir = randInt() ? -1 : 1;

        const meshMaterial = new MeshBasicMaterial({ color });

        const cube = new Mesh(geometry, meshMaterial);
        const line = new LineSegments(new EdgesGeometry(geometry), lineMaterial)

        this.group = new Group()
        this.group.add(cube, line)
        this.group.position.set(0.5, 0.5, -0.5)
        this.mesh.add(this.group);

    }

    update(timestamp) {
        this.group.rotation.y = timestamp / (this.rotSpeed * this.rotDir);
    }
    updatePlayer(player) {
        player.coins++;
        player.wealth += (this.worth);
        player.score += (100 + this.worth);
        player.updateUI();

        console.groupCollapsed('Treasure: updatePlayer');
        console.log('** Score ** :', player.score);
        console.log('** Wealth ** :', player.wealth);
        console.log('Coins collected:', player.coins);
        console.groupEnd();
    }
}

export class Gold extends Treasure {
    constructor() {
        super('Gold', 200 + randInt(100), 0xFFDF00)
    }
}

export class Silver extends Treasure {
    constructor() {
        super('Silver', 100 + randInt(50), 0xC0C0C0)
    }
}