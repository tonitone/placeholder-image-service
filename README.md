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
- http://localhost:8000/placeholder (this demo-image is 1x1 pixel in gray. It's resized with img-attributes)
  - <img height="200" src="readme-assets/placeholder.png" width="400"/>
- http://localhost:8000/jpg/400x200
  - ![](readme-assets/400x200.jpeg)
- http://localhost:8000/png/400x200/color/ff0099
  - ![](readme-assets/400x200_ff0099.png)
- http://localhost:8000/png/400x200/search/nature+treenature+tree+food
  - ![](readme-assets/400x200_nature-tree-food.png)
  - The image is from pixabay. You need an account to get your own API-key. Copy the `src/api/pixabay.api-key.blank.json` to `src/api/pixabay.api-key.json` and add your key inside.

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
