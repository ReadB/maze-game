import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { LineSegments, EdgesGeometry, LineBasicMaterial } from 'three';
import { FLAGS, OPPOSITE_DIRECTION } from '../../utils';
import UI from '../../gui/UI';
import translations from '../../translations/en';
const m = translations.Player;

const meshMaterial = new MeshBasicMaterial({ color: 0x1982C4 });
const lineMaterial = new LineBasicMaterial({ color: 0x6A4C93 });

export default class Player {
    constructor(maze) {
        this.mesh = new Group()
        this.maze = maze;
        this.currentRoomLocation = this.maze.startRoomLocation;
        this.changedRoom = false;
        this.newRoom = null;
        this.moveTo = null;
        this.room = this.maze.rooms[this.currentRoomLocation.y][this.currentRoomLocation.x];

        const geometry = new BoxGeometry(0.25, 1, 0.25);
        const cube = new Mesh(geometry, meshMaterial);
        const line = new LineSegments(new EdgesGeometry(geometry), lineMaterial);

        cube.position.set(0.5, 0.5, -0.5);
        line.position.set(0.5, 0.5, -0.5);
        this.mesh.add(cube, line);
        this.mesh.position.setX(this.room.start.x)
        this.mesh.position.setZ(this.room.start.y)

        this.inInteraction = false;

        this.coins = 0;
        this.threats = 0;
        this.wealth = 0;
        this.score = 0;

    }

    onRoomChange(dir) {
        if (this.room.hasThreat()) return console.log(m.onRoomChange.hasThreat);
        if (dir == FLAGS.NR) this.currentRoomLocation.y -= 1;
        if (dir == FLAGS.SR) this.currentRoomLocation.y += 1;
        if (dir == FLAGS.ER) this.currentRoomLocation.x += 1;
        if (dir == FLAGS.WR) this.currentRoomLocation.x -= 1;
        this.newRoom = this.maze.rooms[this.currentRoomLocation.y][this.currentRoomLocation.x];
        this.changedRoom = true;
        for (let [y, row] of this.newRoom.grid.entries()) {
            for (let [x, cell] of row.entries()) {
                if ((cell & OPPOSITE_DIRECTION[dir]) != 0) this.moveTo = { x, y };
            }
        }
    }
    updateUI(){
        UI.collection['top-ui'].update(this);
    }
    onMove() {
        let entity = this.room.removeEntity(this.mesh.position.x, this.mesh.position.z);
        if (entity) {
            entity.updatePlayer(this);
        }
    }

    dropCoin() {
        // TODO
        console.log('dropCoin');
    }

    getCell() {
        return this.room.grid[this.mesh.position.z][this.mesh.position.x];
    }

    moveDown() {
        if (((this.getCell() & FLAGS.SR) != 0)) return this.onRoomChange(FLAGS.SR);
        if (!((this.getCell() & FLAGS.S) != 0)) return;
        this.mesh.position.setZ(this.mesh.position.z + 1);
        this.onMove();
    }
    moveUp() {
        if (((this.getCell() & FLAGS.NR) != 0)) return this.onRoomChange(FLAGS.NR);
        if (!((this.getCell() & FLAGS.N) != 0)) return;
        this.mesh.position.setZ(this.mesh.position.z - 1);
        this.onMove();
    }
    moveRight() {
        if (((this.getCell() & FLAGS.ER) != 0)) return this.onRoomChange(FLAGS.ER);
        if (!((this.getCell() & FLAGS.E) != 0)) return;
        this.mesh.position.setX(this.mesh.position.x + 1);
        this.onMove();
    }
    moveLeft() {
        if (((this.getCell() & FLAGS.WR) != 0)) return this.onRoomChange(FLAGS.WR);
        if (!((this.getCell() & FLAGS.W) != 0)) return;
        this.mesh.position.setX(this.mesh.position.x - 1);
        this.onMove();
    }

}
