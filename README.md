# many-squares

Hosted on GitHub Pages at https://danyalaytekin.github.io/many-squares/.  The built code is committed to `docs` rather than something like `dist` so that it can be served by GitHub Pages.

## Possible improvements

- add unit tests
- add browser tests
- support touch
- support different viewports

## Getting started locally

Clone the repo, and then:

```
brew install nvm
nvm install
npm install
npm run build
open docs/index.html
```

### Run tests

```
npm test
```

## Browser support

This project uses client-side ES6 and is unlikely to work in older browsers.

## Configuration

- `options.sideLength`: the length of each side of each square
- `options.squareCount`: the number of squares to be shown
