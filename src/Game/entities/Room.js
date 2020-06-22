import { Group } from 'three';
import { FLAGS } from '../../utils';
import { SWall, EWall } from './Walls.js';
import { Floor } from './Floor.js';

export default class Room {
    constructor({ w, h, grid, start, cell }) {
        this.mesh = new Group()
        this.start = start;

        if ((cell & FLAGS.N) != 0) grid[0][(w - 1) / 2] |= FLAGS.NR;
        if ((cell & FLAGS.E) != 0) grid[(h - 1) / 2][w - 1] |= FLAGS.ER;
        if ((cell & FLAGS.S) != 0) grid[h - 1][(w - 1) / 2] |= FLAGS.SR;
        if ((cell & FLAGS.W) != 0) grid[(h - 1) / 2][0] |= FLAGS.WR;

        this.grid = grid;
        this.draw(this.grid);
    }

    draw(grid) {
        for (let [y, row] of grid.entries()) {
            for (let [x, cell] of row.entries()) {
                if (x == 0 && (cell & FLAGS.WR) == 0) this.addObject(EWall, -1, y); // LEFT WALL
                if (y == 0 && (cell & FLAGS.NR) == 0) this.addObject(SWall, x, -1);  // TOP WALL
                if (!((cell & FLAGS.E) != 0) && (cell & FLAGS.ER) == 0) this.addObject(EWall, x, y);
                if (!((cell & FLAGS.S) != 0) && (cell & FLAGS.SR) == 0) this.addObject(SWall, x, y);
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

}