# many-squares

Hosted on GitHub Pages at https://danyalaytekin.github.io/many-squares/.  The built code is committed to `docs` rather than something like `dist` so that it can be served by GitHub Pages.

## Getting started

Clone the repo, and then:

```
brew install nvm
nvm install
npm install
npm run build
open docs/index.html
```

## Browser support

This project uses client-side ES6 and is unlikely to work in older browsers.

## Configuration

- `options.sideLength`: the length of each side of each square
- `options.squareCount`: the number of squares to be shown

## Current issues

- I think there is a bug in the algorithm which finds the initial groups; occasionally an overlap is not detected
- I spent most of my time trying to solve the algorithm required, and have not had time to better separate code into modules (`index.js` is way too heavy), or add unit tests, browser tests, support for various viewports, etc
- algorithms could be optimised
