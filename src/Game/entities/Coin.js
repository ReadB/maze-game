import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { LineSegments, EdgesGeometry, LineBasicMaterial } from 'three';
import { randInt } from '../../utils';

const thickness = 0.15;

const meshMaterial = new MeshBasicMaterial({ color: 0xFFFFAA });
const lineMaterial = new LineBasicMaterial({ color: 0x000000 });
const geometry = new BoxGeometry(thickness, thickness, thickness / 2);

export class Coin {
    constructor() {
        this.mesh = new Group();
        this.randInt = randInt(100);
        this.rotSpeed = 300 - (this.randInt * 2)
        this.rotDir = randInt() ? -1 : 1;

        const cube = new Mesh(geometry, meshMaterial);
        const line = new LineSegments(new EdgesGeometry(geometry), lineMaterial)

        this.coin = new Group()
        this.coin.add(cube, line)
        this.coin.position.set(0.5, 0.5, -0.5)
        this.mesh.add(this.coin);

    }

    update(timestamp) {
        this.coin.rotation.y = timestamp / (this.rotSpeed * this.rotDir);
    }
    updatePlayer(player) {
        player.coins++;
        player.wealth++;
        player.score += (100 + this.randInt);

        console.groupCollapsed('Coin: updatePlayer');
        console.log('** Score ** :', player.score);
        console.log('** Wealth ** :', player.wealth);
        console.log('Coins collected:', player.coins);
        console.groupEnd();
    }
}
