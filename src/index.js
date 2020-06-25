import $ from 'jquery';
import Menu from './gui/Menu';
import Game from './Game';
let game = null;

const defaultConfig = {
    "maze_seed" : undefined,
    "room_seed" : undefined,
}

const initGame = async (config) => {
    game && game.destroy();
    game = new Game(config);
    
    Menu.collection['main-menu'].show();

    /**
     * Simulate maze loading
     */
    setTimeout(() => { $('#main-menu-start-button').prop('disabled', false); }, 2000)

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

initGame(defaultConfig);
require('./scene');

export { game, initGame };