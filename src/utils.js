const FLAGS = {
    N: 0x1, S: 0x2, E: 0x4, W: 0x8,
    NR: 0x10, SR: 0x20, ER: 0x40, WR: 0x80,
    COIN: 0x100, THREAT: 0x200
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

const array2d = (w, h, fill) => Array.from(Array(h), () => new Array(w).fill(fill));

const randInt = (max = 2) => ~~(Math.random() * max);

export { 
    FLAGS, OPPOSITE_DIRECTION, 
    array2d, randInt 
}
