import $ from 'jquery';
import Menu from '..'

$('body').append('<input type="file" style="visibility: hidden;" id="config-input">')

const config_input = () => {
	$('#config-input').trigger("click");
}

const settings_menu = new Menu({
	id: 'settings-menu',
	body: `
	<span class="menu-title">Settings</span>
	<div class="menu-button-container">
		<button id="settings-menu-load-button" class="menu-button">LOAD CONFIGURATION</button>
		<button id="settings-menu-back-button" class="menu-button">BACK</button>
	</div>
	<span id="settings-menu-footer" class="menu-footer"></span>
	`,
	buttons: {
		'settings-menu-load-button': { click: config_input },
		'settings-menu-back-button': { click: () => Menu.collection['main-menu'].show() }
	},
});

export default settings_menu;
