# placeholder-image-generator

[![Node.js CI](https://github.com/tonitone/placeholder-image-generator/actions/workflows/test.yml/badge.svg)](https://github.com/tonitone/placeholder-image-generator/actions/workflows/test.yml)

A fun project to generate placeholder images.

## Install
`yarn install`

## Usage
You can use it on CLI and web based.
The generated images are placed in:
`public/image-store`

### CLI based
`node src/cli/index.js /png/640x480/layout:blank,bg-color:ff9900,color:000000/`

### Web based
Start the server and then go to:
http://localhost:8000/png/20x20

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