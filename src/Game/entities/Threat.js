import { Group, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { LineSegments, EdgesGeometry, LineBasicMaterial } from 'three';
import { randInt } from '../../utils';

const thickness = 0.2;

const meshMaterial = new MeshBasicMaterial({ color: 0xD64550 });
const lineMaterial = new LineBasicMaterial({ color: 0x000000 });
const geometry = new BoxGeometry(thickness, thickness, thickness);

export class Threat {
    constructor() {
        this.mesh = new Group();
        this.randInt100 = randInt(100);
        this.randInt = randInt();
        this.rotSpeed = 1000 - (this.randInt)

        const cube = new Mesh(geometry, meshMaterial);
        const line = new LineSegments(new EdgesGeometry(geometry), lineMaterial)

        this.group = new Group();
        this.group.add(cube, line);
        this.group.position.set(0.5, 0.5, -0.5);
        this.mesh.add(this.group);

        this.correctAction = 'club';

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
                player.score += (300 + this.randInt100);
            })
            .catch((msg) => {
                console.log('Lost interaction:', msg)
                player.threats++;
                player.score -= (this.randInt100);
            });

        console.log('** Score ** :', player.score);
        console.log('Threats eliminated:', player.threats);
        console.groupEnd();
        player.inInteraction = false;

    }

    startInteraction() {
        return new Promise((resolve, reject) => {
            let actions = ['club', 'disarm', 'run'];
            let inputMessage = 'Type a valid action from the list and press OK. \n'
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
