const FLAGS = {
    N: 0x1, S: 0x2, E: 0x4, W: 0x8,
    NR: 0x10, SR: 0x20, ER: 0x40, WR: 0x80,
    N_EXIT: 0x100, S_EXIT: 0x200, E_EXIT: 0x400, W_EXIT: 0x800,
    
    TREASURE: 0x1000, THREAT: 0x2000,

    PRIM_IN: 0x10000, PRIM_ADJACENT: 0x20000
}

const OPPOSITE_DIRECTION = {
    [FLAGS.N]: FLAGS.S,
    [FLAGS.S]: FLAGS.N,
    [FLAGS.E]: FLAGS.W,
    [FLAGS.W]: FLAGS.E,

    [FLAGS.NR]: FLAGS.SR,
    [FLAGS.SR]: FLAGS.NR,
    [FLAGS.ER]: FLAGS.WR,
    [FLAGS.WR]: FLAGS.ER,
}

const direction = (fx, fy, tx, ty) => {
    if (fx < tx) return FLAGS.E;
    if (fx > tx) return FLAGS.W;
    if (fy < ty) return FLAGS.S;
    if (fy > ty) return FLAGS.N;
}

const PRIM_add_ADJACENT = (x, y, grid, adjacent_list) => {
    if (x >= 0 && y >= 0 && y < grid.length && x < grid[y].length && grid[y][x] == 0) {
        grid[y][x] |= FLAGS.PRIM_ADJACENT;
        adjacent_list.push([x, y]);
    }
}

const PRIM_mark_IN = (x, y, grid, adjacent_list) => {
    grid[y][x] |= FLAGS.PRIM_IN;
    if ((grid[y][x] & FLAGS.PRIM_ADJACENT) != 0) grid[y][x] ^= FLAGS.PRIM_ADJACENT;
    PRIM_add_ADJACENT(x - 1, y, grid, adjacent_list);
    PRIM_add_ADJACENT(x + 1, y, grid, adjacent_list);
    PRIM_add_ADJACENT(x, y - 1, grid, adjacent_list);
    PRIM_add_ADJACENT(x, y + 1, grid, adjacent_list);
}

const PRIM_neighbors = (x, y, grid) => {
    let n = []
    if (x > 0 && (grid[y][x - 1] & FLAGS.PRIM_IN) != 0) n.push([x - 1, y]);
    if (y > 0 && (grid[y - 1][x] & FLAGS.PRIM_IN) != 0) n.push([x, y - 1]);
    if (x + 1 < grid[y].length && (grid[y][x + 1] & FLAGS.PRIM_IN) != 0) n.push([x + 1, y]);
    if (y + 1 < grid.length && (grid[y + 1][x] & FLAGS.PRIM_IN) != 0) n.push([x, y + 1]);
    return n;
}

const PRIM_step = (grid, adjacent_list, rand, func) => {
    let [[x, y]] = adjacent_list.splice(randInt(adjacent_list.length, rand), 1);
    let n = PRIM_neighbors(x, y, grid);
    let [nx, ny] = n[randInt(n.length, rand)];
    let dir = direction(x, y, nx, ny);
    grid[y][x] |= dir;
    grid[ny][nx] |= OPPOSITE_DIRECTION[dir];
    grid[y][x] ^= FLAGS.IN;
    PRIM_mark_IN(x, y, grid, adjacent_list);
    func && func(x, y, grid);
}

const array2d = (w, h, fill) => Array.from(Array(h), () => new Array(w).fill(fill));

const randInt = (max = 2, rand = Math.random()) => ~~(rand * max);

export {
    FLAGS, OPPOSITE_DIRECTION,
    array2d, randInt,
    direction,
    PRIM_step, PRIM_neighbors, PRIM_add_ADJACENT, PRIM_mark_IN
}
