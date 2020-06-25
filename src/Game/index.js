import { scene } from '../scene';
import Maze from './entities/Maze';
import Player from './entities/Player';

export default class Game {
    constructor(config) {
        this.inPlay = false;
        this.maze = new Maze(config);
        scene.add(this.maze.mesh)

        this.player = new Player(this.maze)
        this.maze.mesh.add(this.player.mesh)

        window.addEventListener("keydown", ({ keyCode: c }) => {
            let k = {
                W: 87, A: 65, S: 83, D: 68,
                Up: 38, Left: 37, Down: 40, Right: 39
            }

            if (!this.inPlay) return;
            if (this.player.inInteraction) return;

            if (c == k.W || c == k.Up) this.player.moveUp();
            if (c == k.A || c == k.Left) this.player.moveLeft();
            if (c == k.S || c == k.Down) this.player.moveDown();
            if (c == k.D || c == k.Right) this.player.moveRight();

        });
    }

    destroy() {
        scene.remove(this.maze.mesh);
    }

    update(timestamp) {
        if (!this.inPlay) return;
        if (this.player.inInteraction) return;
        if (this.player.changedRoom) {
            this.maze.mesh.remove(this.player.room.mesh);
            this.player.room = this.player.newRoom;
            this.player.mesh.position.setX(this.player.moveTo.x);
            this.player.mesh.position.setZ(this.player.moveTo.y);
            this.maze.mesh.add(this.player.room.mesh);
            this.player.changedRoom = false;
        }
        this.player.room.update(timestamp)
    }
}
