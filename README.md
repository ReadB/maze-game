This project started as my synoptic project for my apprenticeship, a maze game to cover a set of requirements. This took place over 5 days and is tagged as release [v1.0.0](https://github.com/readb/maze-game/releases/tag/v1.0.0)

## Development
1. Install Node 12 (other versions should work).
2. Clone this repository.
3. Run `npm ci` to install the dependencies.
4. Run `npm run dev` to start webpack-dev-server which bundles and restarts when changes are made.
5. Open http://localhost:8080/ in a browser.

## Tests
This project uses [Jest](https://jestjs.io/docs/en/getting-started), and has been [configured](https://jestjs.io/docs/en/webpack) to work with [webpack](https://webpack.js.org/).

Run `npm run test`

## Production

To build production ready files (output in dist folder), run `npm run build`
