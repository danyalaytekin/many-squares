# many-squares

[![Build Status](https://travis-ci.org/danyalaytekin/many-squares.svg?branch=master)](https://travis-ci.org/danyalaytekin/many-squares)

This project is [deployed onto GitHub Pages](https://danyalaytekin.github.io/many-squares).  Deployable assets are in `docs`, rather than the usual `dist`; this is because `docs` is the default location for GitHub Pages. The project's tests [run on Travis]((https://travis-ci.org/danyalaytekin/many-squares)) after each commit.

## Possible improvements

- improve layout
- better mobile/touch support
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

### Open page locally

```
npm run open
```

### Watch local filesystem for changes and rebuild

```
npm run watch
```

## Browser support

This project uses client-side ES6 and is unlikely to work in older browsers.

## Configuration

- `options.sideLength`: the length of each side of each square
- `options.squareCount`: the number of squares to be shown
- `options.dragEventThrottlePeriod`: the minimum period, in milliseconds, between the recalculation of areas
