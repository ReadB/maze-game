import $ from 'jquery';
import Menu from '..'
import { initGame } from '../../../index';
import translations from '../../../translations/en';
const m = translations.Menu;

const pause_menu = new Menu({
	id: 'pause-menu',
	body: `
	<span class="menu-title">Paused</span>
	<div class="menu-button-container">
		<button id="pause-menu-resume-button" class="menu-button">RESUME</button>
		<button id="pause-menu-quit-button" class="menu-button">QUIT</button>

	</div>
	`,
	buttons: {
		'pause-menu-resume-button': { click: Menu.hide },
		'pause-menu-quit-button': {
			click: () => {
				if (confirm(m["pause-menu-quit-button"].confirm)) {
					initGame();
					Menu.collection['main-menu'].show();
				}
			}
		},
	},
});

export default pause_menu;
