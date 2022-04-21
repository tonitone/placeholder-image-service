# placeholder-image-generator
> A service to generate placeholder images.
> 
[![CI](https://github.com/tonitone/placeholder-image-generator/actions/workflows/yarn-action.yml/badge.svg)](https://github.com/tonitone/placeholder-image-generator/actions/workflows/yarn-action.yml)

## Table of Contents

<!-- toc -->

- [placeholder-image-generator](#placeholder-image-generator)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Install](#install)
  - [Api](#api)
  - [Usage](#usage)
    - [CLI based](#cli-based)
    - [Web based](#web-based)
  - [Test](#test)
  - [Server](#server)
    - [Start](#start)
    - [Stop](#stop)
    - [Restart](#restart)
    - [Logs](#logs)

<!-- tocstop -->

## About
A service to generate placeholder images.
_This project is only for fun and learning purposes._

Possible features will be:
- a UI to configure the placeholder over a form
- save all generated image-URLs in a db

## Install
`yarn install`

## Api
Start the server (e.g. `yarn run server:single`) and then go to:
`http://localhost:8000/api-docs`

## Usage
You can use it on CLI and web based.
The generated images are stored in:
`public/image-store`

### CLI based
| ![](readme-assets/400x40_color_ff9900.jpg) |
|:--:| 
| `node src/cli/index.js /jpg/400x40/color/ff9900` |
### Web based
Start the server (e.g. `yarn run server:start`) and then go to one of these URLs:

| <img height="200" src="readme-assets/1x1_color_efefef.png" width="400"/>
|:--:| 
| http://localhost:8000/placeholder |
1x1 pixel image in gray, resized with img-attributes |


| ![](readme-assets/400x200_color_efefef.jpg) |
|:--:| 
| http://localhost:8000/jpg/400x200 |


| ![](readme-assets/400x200_color_ff0099.png) |
|:--:| 
| http://localhost:8000/png/400x200/color/ff0099 |


| ![](readme-assets/400x200_search_nature+tree.png) |
|:--:| 
| http://localhost:8000/png/400x200/search/nature+tree |

This image is from pixabay and you need an account to get your own API-key.

Copy the `src/api/pixabay.api-key.blank.json` to `src/api/pixabay.api-key.json` and add your key inside. 

## Test
`yarn test`

## Server

Start the server with `yarn run server:single`

Or use the following `pm2` (Process Manager 2) based run scripts, with an built-in load balancer. `// ;-)`

### Start
`yarn run server:start`

### Stop 
`yarn run server:stop`

### Restart 
`yarn run server:restart`

### Logs 
`yarn run server:stop`
