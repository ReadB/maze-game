import { Group } from 'three';
import seedrandom from 'seedrandom';
import { camera } from '../../scene';
import {
    FLAGS, array2d, randInt,
    PRIM_mark_IN, PRIM_step
} from '../../utils';
import Room from './Room';

const emptyRoomGrid = () => [
    [FLAGS.E | FLAGS.S, FLAGS.E | FLAGS.S | FLAGS.W, FLAGS.S | FLAGS.W],
    [FLAGS.N | FLAGS.E | FLAGS.S, FLAGS.N | FLAGS.S | FLAGS.E | FLAGS.W, FLAGS.N | FLAGS.S | FLAGS.W],
    [FLAGS.N | FLAGS.E, FLAGS.N | FLAGS.E | FLAGS.W, FLAGS.N | FLAGS.W]
]

const RoomGrid = () => {
    let grid = emptyRoomGrid();

    grid[0][0] |= FLAGS.TREASURE;
    grid[2][0] |= FLAGS.THREAT;
    return grid;
}

export default class Maze {
    constructor(config = {}) {
        this.mesh = new Group()
        this.maze_size = config.maze_size || 2;
        this.room_size = config.room_size || 3;
        this.seedrandom = seedrandom(config.maze_seed);
        this.room_seedrandom = config.room_seed ? seedrandom(config.room_seed) : seedrandom(config.maze_seed);
        this.startRoomLocation = {
            x: randInt(this.maze_size, this.seedrandom()),
            y: randInt(this.maze_size, this.seedrandom())
        };
        this.startCellLocation = {
            x: randInt(this.room_size, this.seedrandom()),
            y: randInt(this.room_size, this.seedrandom())
        };

        this.grid = this.generateMazeGrid();
        this.rooms = array2d(this.maze_size, this.maze_size, null)

        for (let [y, row] of this.grid.entries()) {
            for (let [x, cell] of row.entries()) {
                this.rooms[y][x] = new Room({
                    w: this.room_size, h: this.room_size,
                    adjacent_rooms: cell,
                    start: this.startCellLocation,
                    seedrandom: this.room_seedrandom
                });
            }
        }

        /**
         * Set exit on random edge
         */

        this.exitRoomLocation = this.getRandomEdgeCell();
        this.rooms[this.exitRoomLocation.y][this.exitRoomLocation.x]
            .setExit(this.exitRoomLocation.flag);

        /**
         * Draw rooms after setting exit
         */
        for (let [y, row] of this.rooms.entries()) {
            for (let [x, room] of row.entries()) {
                room.draw();
            }
        }

        this.mesh.add(this.rooms[this.startRoomLocation.y][this.startRoomLocation.x].mesh);
        // Move room to centre of scene
        this.mesh.position.set(-(this.room_size / 2), 0, -(this.room_size / 2) + 1);
        camera.position.set(0, this.room_size + 5 + (0.25 * this.room_size), 0);


    }

    generateMazeGrid() {
        const grid = array2d(this.maze_size, this.maze_size, 0);
        const adjacent = [];
        const first = {
            x: randInt(this.maze_size, this.seedrandom()),
            y: randInt(this.maze_size, this.seedrandom())
        };
        PRIM_mark_IN(first.x, first.y, grid, adjacent);
        while (adjacent.length) { PRIM_step(grid, adjacent, this.seedrandom()); }
        return grid;
    }

    getRandomEdgeCell() {
        let edge = randInt(4, this.seedrandom());
        let x = randInt(this.maze_size, this.seedrandom());
        let y = randInt(this.maze_size, this.seedrandom());
        let flag = null;
        // TOP
        if (edge == 0) { y = 0; flag = FLAGS.N; }
        // BOTTOM
        if (edge == 1) { y = this.maze_size - 1; flag = FLAGS.S; }
        // LEFT
        if (edge == 2) { x = 0; flag = FLAGS.W; }
        // RIGHT
        if (edge == 3) { x = this.maze_size - 1; flag = FLAGS.E; }

        return { x, y, flag };
    }

}
