import $ from 'jquery';
import './menu.css';

$('body').append(`<div id="menu"></div>`);

export default class Menu {
	static hideAll() {
		for (const m in Menu.collection) {
			Menu.collection[m].hide();
		}
	}
	static hide() {
		$(`#menu`)[0].style.visibility = "hidden";
		Menu.hideAll();
	}

	constructor({ id, body, buttons }) {
		this.id = id;
		Menu.collection[id] = this;

		$("#menu").append(`<div id="${id}" class="menu" style="visibility:hidden"></div>`);
		if (body) $(`#${id}`).append(body);
		if (buttons) {
			for (let [buttonId, { click }] of Object.entries(buttons)) {
				$(`#${buttonId}`).on('click', click);
			}
		}
	}
	hide() {
		$(`#${this.id}`)[0].style.visibility = "hidden";
	}
	show() {
		Menu.hideAll();
		$(`#${this.id}`)[0].style.visibility = "visible";
	}
}

Menu.collection = {};

require('./menus/main');
require('./menus/settings');