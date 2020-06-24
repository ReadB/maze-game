import { Group } from 'three';
import { FLAGS, array2d } from '../../utils';
import { SWall, EWall } from './Walls.js';
import { Floor } from './Floor.js';
import { Coin } from './Coin.js';
import { Threat } from './Threat.js';

export default class Room {
    constructor({ w, h, grid, start, cell }) {
        this.mesh = new Group()
        this.start = start;
        this.entities = array2d(w, h, 0);
        this.drops = array2d(w, h, 0);

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

                if ((cell & FLAGS.COIN) != 0) this.addEntity(Coin, x, y);
                if ((cell & FLAGS.THREAT) != 0) this.addEntity(Threat, x, y);

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

}
