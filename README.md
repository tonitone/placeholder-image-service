# placeholder-image-generator

[![CI](https://github.com/tonitone/placeholder-image-generator/actions/workflows/yarn-action.yml/badge.svg)](https://github.com/tonitone/placeholder-image-generator/actions/workflows/yarn-action.yml)

A fun project to generate placeholder images.

## Install
`yarn install`

## Usage
You can use it on CLI and web based.
The generated images are placed in:
`public/image-store`

### CLI based
`node src/cli/index.js /png/640x480/color/ff0000`

### Web based
Start the server and then go to on of these URLs:
- http://localhost:8000/placeholder
- http://localhost:8000/png/20x20
- http://localhost:8000/png/20x20/color/ff9900
- http://localhost:8000/png/100x400/search/nature+tree

## Api
Start the server and then go to:
`http://localhost:8000/api-docs`

## Test
`yarn test`

## Server
`node src/server.js`

Or use the following `pm2` based run scripts

### Start
`yarn run server:start`

### Stop 
`yarn run server:stop`

### Restart 
`yarn run server:restart`

### Logs 
`yarn run server:stop`
