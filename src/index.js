import $ from 'jquery';
import Menu from './gui/Menu';
import Game from './Game';
let game = null;

let currentConfig;
const initGame = async (config, replay) => {
    game && game.destroy();

    const defaultConfig = {
        "maze_seed" : Math.random().toString(36).substr(2, 5),
        "room_seed" : Math.random().toString(36).substr(2, 5),
    }
    if (!config) config = defaultConfig;
    if (replay) config = currentConfig;
    currentConfig = config;

    game = new Game(config);
    
}

$('#config-input').on("change", () => {
    let file = $('#config-input').prop('files')[0];
    const reader = new FileReader();
    let allowed_types = ['text/plain', 'application/json'];
    if (!allowed_types.includes(file.type)) return alert('Error loading config: File must be plain text or json')

    console.log(file)
    reader.addEventListener('load', (e) => {
        try {
            let config = JSON.parse(e.target.result);
            /**
             * Validate config
             */
                        
            $('#settings-menu-footer').html(`Config loaded: ${file.name}`);
            initGame(config)
            console.log(config)
        } catch (err) {
            return alert('Error loading config: Invalid JSON')
        }
    });

    reader.readAsText(file)
})


initGame();
Menu.collection['main-menu'].show();
/**
 * Simulate maze loading
 */
// setTimeout(() => { $('#main-menu-start-button').prop('disabled', false); }, 2000)
$('#main-menu-start-button').prop('disabled', false);

require('./scene');

export { game, initGame };
