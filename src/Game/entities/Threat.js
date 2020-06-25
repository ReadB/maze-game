import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { LineSegments, EdgesGeometry, LineBasicMaterial } from 'three';
import { randInt } from '../../utils';

const thickness = 0.2;

const lineMaterial = new LineBasicMaterial({ color: 0x000000 });
const geometry = new BoxGeometry(thickness, thickness, thickness);

export class Threat {
    constructor(name, damage, correctAction, color = 0xD64550,) {
        this.randInt = randInt();
        this.randInt100 = randInt(100);

        this.name = name || 'Threat';
        this.correctAction = correctAction || 'club';
        this.damage = damage || this.randInt100;
        this.rotSpeed = 1200 - (this.damage);

        this.mesh = new Group();

        const meshMaterial = new MeshBasicMaterial({ color });

        const cube = new Mesh(geometry, meshMaterial);
        const line = new LineSegments(new EdgesGeometry(geometry), lineMaterial);

        this.group = new Group();
        this.group.add(cube, line);
        this.group.position.set(0.5, 0.5, -0.5);
        this.mesh.add(this.group);

    }

    update(timestamp) {
        let rotSpeed = 1000 - (this.randInt100 * 3)
        let rotDir = this.randInt ? -1 : 1
        this.group.rotation.x = timestamp / (rotSpeed * rotDir);
        this.group.rotation.z = timestamp / (rotSpeed * -rotDir);
    }

    async updatePlayer(player) {
        console.group('Threat: updatePlayer');
        player.inInteraction = true;
        await this.startInteraction()
            .then((msg) => {
                console.log('Won interaction:', msg)
                player.threats++;
                player.score += (300 + this.damage);
            })
            .catch((msg) => {
                console.log('Lost interaction:', msg)
                player.threats++;
                player.score -= (this.damage);
            });

        console.log('** Score ** :', player.score);
        console.log('Threats eliminated:', player.threats);
        console.groupEnd();
        player.inInteraction = false;
        player.updateUI();

    }

    startInteraction() {
        return new Promise((resolve, reject) => {
            let actions = ['club', 'disarm', 'run'];
            let inputMessage = `** Interaction with ${this.name} ** \n`
                + 'Type a valid action from the list and press OK. \n'
                + 'Press cancel or type run to run away. \n'
                + 'Actions: ' + actions.join(', ');
            let input = prompt(inputMessage);
            while (!input || !actions.includes(input.toLowerCase())) {
                let err = null;
                if (input == null) input = 'run';
                if (!actions.includes(input.toLowerCase())) err = 'Invalid action';
                if (input == '') err = 'Input cannot be empty';
                if (err) input = prompt('ERROR: ' + err + '\n' + inputMessage);
            }

            if (input == 'run') {
                let outputMessage = 'User ran away';
                if (Math.random() < 0.1) return resolve(outputMessage);
                return reject(outputMessage);
            }
            if (input == this.correctAction) {
                let outputMessage = `Correct action: ${input}`;
                return resolve(outputMessage);
            }
            reject(`Wrong action: ${input}`);
        })
    }

}

export class Troll extends Threat {
    constructor() {
        super('Troll', 300 + randInt(100), 'club', 0x529c76)
    }
}

export class Bomb extends Threat {
    constructor() {
        super('Bomb', 200 + randInt(50), 'disarm', 0xD64550)
    }
}