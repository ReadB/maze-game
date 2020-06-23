import $ from 'jquery';
import './ui.css';

$('body').append(`<div id="ui"></div>`);

export default class UI {
	static hideAll() {
		for (const m in UI.collection) {
			UI.collection[m].hide();
		}
	}
	static hide() {
		$(`#ui`)[0].style.visibility = "hidden";
		UI.hideAll();
	}

	constructor({ id, body, buttons, update }) {
		this.id = id;
        this.update = update;
        this.visible = false;
        UI.collection[id] = this;

		$("#ui").append(`<div id="${id}" class="ui" style="visibility:hidden"></div>`);
		if (body) $(`#${id}`).append(body);
		if (buttons) {
			for (let [buttonId, { click }] of Object.entries(buttons)) {
				$(`#${buttonId}`).on('click', click);
			}
		}
	}
	hide() {
        $(`#${this.id}`)[0].style.visibility = "hidden";
        this.visible = false;
	}
	show() {
        $(`#${this.id}`)[0].style.visibility = "visible";
        this.visible = true;
    }
}

UI.collection = {};

require('./uis/top');
