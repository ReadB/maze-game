import $ from 'jquery';
import Menu from '..'

const main_menu = new Menu({
	id: 'main-menu',
	body: `
	<span class="menu-title">Maze Game</span>
	<div class="menu-button-container">
		<button id="main-menu-start-button" class="menu-button">START</button>
		<button id="main-menu-settings-button" class="menu-button">SETTINGS</button>
	</div>
	<span class="menu-footer">By Ben Read</span>
	`,
	buttons: {
		'main-menu-start-button': { click: Menu.hide },
		'main-menu-settings-button': { click: () => Menu.collection['settings-menu'].show() }
	},
});

$('#main-menu-start-button').prop('disabled', true);

export default main_menu;
