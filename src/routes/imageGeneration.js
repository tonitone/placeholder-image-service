import express from 'express'

import { imageBuilder } from '../controller/imageBuilder.js'
import { configImageByPlaceholder } from '../model/configImageByPlaceholder.js'
import { configImageByExtensionDimension } from '../model/configImageByExtensionDimension.js'
import { configImageByExtensionDimensionUrl } from '../model/configImageByExtensionDimensionUrl.js'

export const routeImageGeneration = express.Router()

routeImageGeneration.get('/placeholder', (req, res) => {
  imageBuilder(req, res, configImageByPlaceholder())
})

routeImageGeneration.get('/:extension/:dimension', (req, res) => {
  imageBuilder(req, res, configImageByExtensionDimension())
})

routeImageGeneration.get('/:extension/:dimension/color/:backgroundColor', (req, res) => {
  imageBuilder(req, res)
})

routeImageGeneration.get('/:extension/:dimension/search/:queryString', (req, res) => {
  imageBuilder(req, res, configImageByExtensionDimensionUrl())
})
