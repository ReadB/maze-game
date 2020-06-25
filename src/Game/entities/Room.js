import { Group } from 'three';
import {
    FLAGS, array2d, randInt,
    PRIM_mark_IN, PRIM_step
} from '../../utils';
import { SWall, EWall } from './Walls.js';
import { Floor } from './Floor.js';
import { Treasure, Silver, Gold } from './Treasure.js';
import { Threat, Troll, Bomb, } from './Threat.js';

export default class Room {
    constructor({ w, h, start, adjacent_rooms, seedrandom }) {
        this.w = w;
        this.h = h;
        this.seedrandom = seedrandom;
        this.mesh = new Group();
        this.start = start;
        this.entities = array2d(w, h, 0);
        this.drops = array2d(w, h, 0);
        this.grid = this.generateRoomGrid(adjacent_rooms);
    }

    draw() {
        for (let [y, row] of this.grid.entries()) {
            for (let [x, cell] of row.entries()) {
                if (x == 0 && (cell & FLAGS.WR) == 0) this.addObject(EWall, -1, y); // LEFT WALL
                if (y == 0 && (cell & FLAGS.NR) == 0) this.addObject(SWall, x, -1);  // TOP WALL
                if (!((cell & FLAGS.E) != 0) && (cell & FLAGS.ER) == 0) this.addObject(EWall, x, y);
                if (!((cell & FLAGS.S) != 0) && (cell & FLAGS.SR) == 0) this.addObject(SWall, x, y);

                if ((cell & FLAGS.TREASURE) != 0) this.addEntity(randInt(2, this.seedrandom()) ? Silver : Gold, x, y);
                if ((cell & FLAGS.THREAT) != 0) this.addEntity(randInt(2, this.seedrandom()) ? Troll : Bomb, x, y);

                this.addObject(Floor, x, y)
            }
        }
    }

    addObject(Type, x, y) {
        const o = new Type();
        this.mesh.add(o.mesh);
        o.mesh.position.set(x, 0, y);
        return o;
    }

    addEntity(Type, x, y) {
        this.entities[y][x] = this.addObject(Type, x, y);
    }
    addDrop(Type, x, y) {
        this.drops[y][x] = this.addObject(Type, x, y);
        return this.drops[y][x];
    }
    removeEntity(x, y) {
        this.mesh.remove(this.entities[y][x].mesh);
        let e = this.entities[y][x];
        this.entities[y][x] = 0;
        return e;
    }
    removeDrop(x, y) {
        this.mesh.remove(this.drops[y][x].mesh);
        let e = this.drops[y][x];
        this.drops[y][x] = 0;
        return e;
    }

    update(timeStamp) {
        for (let [y, row] of this.entities.entries()) {
            for (let [x, cell] of row.entries()) {
                cell && cell.update(timeStamp);
            }
        }
    }

    hasThreat() {
        let boolean = false;
        for (let [y, row] of this.entities.entries()) {
            for (let [x, entity] of row.entries()) {
                if (entity instanceof Threat) boolean = true;
            }
        }
        return boolean;
    }

    setExit(flag) {
        if ((flag & FLAGS.N) != 0) this.grid[0][(this.w - 1) / 2] |= FLAGS.N_EXIT | FLAGS.NR;
        if ((flag & FLAGS.E) != 0) this.grid[(this.h - 1) / 2][this.w - 1] |= FLAGS.E_EXIT | FLAGS.ER;
        if ((flag & FLAGS.S) != 0) this.grid[this.h - 1][(this.w - 1) / 2] |= FLAGS.S_EXIT | FLAGS.SR;
        if ((flag & FLAGS.W) != 0) this.grid[(this.h - 1) / 2][0] |= FLAGS.W_EXIT | FLAGS.WR;
    }

    generateRoomGrid(adjacent_rooms) {
        const grid = array2d(this.w, this.h, 0);
        const adjacent = [];
        const first = {
            x: randInt(this.w, this.seedrandom()),
            y: randInt(this.h, this.seedrandom())
        };

        const chance = (x, y, grid) => {
            const d = this.seedrandom();
            if (d < 0.15) {
                grid[y][x] |= FLAGS.TREASURE;
            }
            else if (d < 0.30) {
                grid[y][x] |= FLAGS.THREAT;
            }
        }

        PRIM_mark_IN(first.x, first.y, grid, adjacent);
        while (adjacent.length) { PRIM_step(grid, adjacent, this.seedrandom(), chance); }

        if ((adjacent_rooms & FLAGS.N) != 0) grid[0][(this.w - 1) / 2] |= FLAGS.NR;
        if ((adjacent_rooms & FLAGS.E) != 0) grid[(this.h - 1) / 2][this.w - 1] |= FLAGS.ER;
        if ((adjacent_rooms & FLAGS.S) != 0) grid[this.h - 1][(this.w - 1) / 2] |= FLAGS.SR;
        if ((adjacent_rooms & FLAGS.W) != 0) grid[(this.h - 1) / 2][0] |= FLAGS.WR;

        return grid;
    }

}
