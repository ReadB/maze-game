import { Group } from 'three';

import { FLAGS, array2d } from '../../utils';
import Room from './Room';

const emptyRoomGrid = () => [
    [FLAGS.E | FLAGS.S, FLAGS.E | FLAGS.S | FLAGS.W, FLAGS.S | FLAGS.W],
    [FLAGS.N | FLAGS.E | FLAGS.S, FLAGS.N | FLAGS.S | FLAGS.E | FLAGS.W, FLAGS.N | FLAGS.S | FLAGS.W],
    [FLAGS.N | FLAGS.E, FLAGS.N | FLAGS.E | FLAGS.W, FLAGS.N | FLAGS.W]
]

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
                    cell, grid: emptyRoomGrid(),
                    start: { x: 1, y: 1 }
                });
            }
        }

        this.mesh.add(this.rooms[this.startRoomLocation.y][this.startRoomLocation.x].mesh);
        this.mesh.position.set(-(3 / 2), 0, -(3 / 2) + 1);

    }

}