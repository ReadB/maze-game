import $ from 'jquery';
import Menu from './gui/Menu';
import Game from './Game';
let game = new Game();

Menu.collection['main-menu'].show();

/**
 * Simulate maze loading
 */
setTimeout(() => { $('#main-menu-start-button').prop('disabled', false); }, 2000)

$('#config-input').on("change", () => {
    let file = $('#config-input').prop('files')[0];
    const reader = new FileReader();
    let allowed_types = ['text/plain', 'application/json'];
    if (!allowed_types.includes(file.type)) return alert('Error loading config: File must be plain text or json')

    console.log(file)
    reader.addEventListener('load', (e) => {
        try {
            let config = JSON.parse(e.target.result);
            console.log(config)
            $('#settings-menu-footer').html(`Config loaded: ${file.name}`)
        } catch (err) {
            return alert('Error loading config: Invalid JSON')
        }
    });

    reader.readAsText(file)
})

require('./scene');

export { game };