import { Group } from 'three';

import { FLAGS, array2d, randInt } from '../../utils';
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

/**
 * Test Maze: 2*2 rooms
 */
const roomsAsCells = [
    [FLAGS.E | FLAGS.S, FLAGS.S | FLAGS.W],
    [FLAGS.N | FLAGS.E, FLAGS.N | FLAGS.W]
];

export default class Maze {
    constructor() {
        this.mesh = new Group()
        this.maze_size = 2;
        this.room_size = 3;
        this.startRoomLocation = { x: 0, y: 0 };

        this.roomsAsCells = roomsAsCells;
        this.rooms = array2d(this.maze_size, this.maze_size, null)

        for (let [y, row] of this.roomsAsCells.entries()) {
            for (let [x, cell] of row.entries()) {
                this.rooms[y][x] = new Room({
                    w: this.room_size, h: this.room_size,
                    cell, grid: RoomGrid(),
                    start: { x: 1, y: 1 }
                });
            }
        }

        /**
         * Set exit on random edge
         */
        let edge = randInt(4);
        let maze_x = randInt(this.maze_size);
        let maze_y = randInt(this.maze_size);
        let exit_flag = null;
        // TOP
        if (edge == 0) { maze_y = 0; exit_flag = FLAGS.N; }
        // BOTTOM
        if (edge == 1) { maze_y = this.maze_size-1; exit_flag = FLAGS.S; }
        // LEFT
        if (edge == 2) { maze_x = 0; exit_flag = FLAGS.W; }
        // RIGHT
        if (edge == 3) { maze_x = this.maze_size-1; exit_flag = FLAGS.E; }

        this.rooms[maze_y][maze_x].setExit(exit_flag);
       
        /**
         * Draw rooms after setting exit
         */
        for (let [y, row] of this.rooms.entries()) {
            for (let [x, room] of row.entries()) {
                room.draw();
            }
        }

        this.mesh.add(this.rooms[this.startRoomLocation.y][this.startRoomLocation.x].mesh);
        this.mesh.position.set(-(3 / 2), 0, -(3 / 2) + 1);

    }

}
