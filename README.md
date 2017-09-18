# many-squares

[![Build Status](https://travis-ci.org/danyalaytekin/many-squares.svg?branch=master)](https://travis-ci.org/danyalaytekin/many-squares)

This project is [deployed onto GitHub Pages](https://danyalaytekin.github.io/many-squares).  Deployable assets are in `docs`, rather than the usual `dist`; this is because `docs` is the default location for GitHub Pages. The project's tests [run on Travis](https://travis-ci.org/danyalaytekin/many-squares) after each commit.

## Browser support

As the project currently uses client-side ES6 without transpilation, it's unlikely to work in older browsers.  It has been verified as working correctly in the latest desktop versions of Safari and Chrome.  In Firefox and in mobile browsers, drag-and-drop does not work, though the initial rendering and calculation does.

## Possible improvements

- improve layout
- fix drag-and-drop in Firefox
- better mobile/touch support
- support different viewports

## Getting started locally

### Install

Clone the repo, and then:

```
brew install nvm
nvm install
npm install
```

### Build

```
npm run build
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

## Configuration

- `options.sideLength`: the length of each side of each square
- `options.squareCount`: the number of squares to be shown
- `options.dragEventThrottlePeriod`: the minimum period, in milliseconds, between the recalculation of areas
