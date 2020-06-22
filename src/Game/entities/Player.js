import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { LineSegments, EdgesGeometry, LineBasicMaterial } from 'three';
import { FLAGS, OPPOSITE_DIRECTION } from '../../utils';

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

    }

    onRoomChange(dir) {
        this.newRoom = this.maze.rooms[this.currentRoomLocation.y][this.currentRoomLocation.x];
        this.changedRoom = true;
        for (let [y, row] of this.newRoom.grid.entries()) {
            for (let [x, cell] of row.entries()) {
                if ((cell & OPPOSITE_DIRECTION[dir]) != 0) this.moveTo = { x, y };
            }
        }
    }

    onMove() {

    }

    getCell() {
        return this.room.grid[this.mesh.position.z][this.mesh.position.x];
    }

    moveDown() {
        if (((this.getCell() & FLAGS.SR) != 0)) {
            this.currentRoomLocation.y += 1
            this.onRoomChange(FLAGS.SR);
            return;
        }
        if (!((this.getCell() & FLAGS.S) != 0)) return;
        this.mesh.position.setZ(this.mesh.position.z + 1);
        this.onMove();
    }
    moveUp() {
        if (((this.getCell() & FLAGS.NR) != 0)) {
            this.currentRoomLocation.y -= 1
            this.onRoomChange(FLAGS.NR);
            return;
        }
        if (!((this.getCell() & FLAGS.N) != 0)) return;
        this.mesh.position.setZ(this.mesh.position.z - 1);
        this.onMove();
    }
    moveRight() {
        if (((this.getCell() & FLAGS.ER) != 0)) {
            this.currentRoomLocation.x += 1
            this.onRoomChange(FLAGS.ER);
            return;
        }
        if (!((this.getCell() & FLAGS.E) != 0)) return;
        this.mesh.position.setX(this.mesh.position.x + 1);
        this.onMove();
    }
    moveLeft() {
        if (((this.getCell() & FLAGS.WR) != 0)) {
            this.currentRoomLocation.x -= 1
            this.onRoomChange(FLAGS.WR);
            return;
        }
        if (!((this.getCell() & FLAGS.W) != 0)) return;
        this.mesh.position.setX(this.mesh.position.x - 1);
        this.onMove();
    }

}
