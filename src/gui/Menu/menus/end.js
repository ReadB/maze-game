import $ from 'jquery';
import Menu from '..'
import { initGame } from '../../../index';

const end_menu = new Menu({
	id: 'end-menu',
	body: `
	<span class="menu-title-short">You found the exit!</span>
	<div class="menu-button-container">
		<button id="end-menu-replay-button" class="menu-button">REPLAY</button>
		<button id="end-menu-back-button" class="menu-button">MAIN MENU</button>
	</div>
	`,
	buttons: {
		'end-menu-replay-button': {
			click: () => { initGame(undefined, true); Menu.hide(); }
		},
		'end-menu-back-button': {
			click: () => { initGame(); Menu.collection['main-menu'].show(); }
		},
	}
});

export default end_menu;
