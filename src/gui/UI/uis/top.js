import $ from 'jquery';
import UI from '..';
import { game } from '../../../index';

const top_ui = new UI({
    id: 'top-ui',
    body: `<span class="content"></span>
		<button id="top-ui-drop-coin-button" class="ui-button">Drop Coin</button>
	`,
    buttons: {
        'top-ui-drop-coin-button': { click: () => game.player.dropCoin() },
    },
    update: (player) => {
        $('#top-ui .content').html(`
        <span class="line">Score: ${player.score}</span><br>
        <span class="line">Coins: ${player.coins}</span><br>
        <span class="line">Wealth: ${player.wealth}</span><br>
        <span class="line">Threats: ${player.threats}</span><br>
        <span></span>
        `);
    }
});

export default top_ui;
