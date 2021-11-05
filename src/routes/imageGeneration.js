import express from 'express'

import { imageByPlaceholder } from '../controller/imageByPlaceholder.js'
import { imageByExtensionDimension } from '../controller/imageByExtensionDimension.js'
import { imageByExtensionDimensionColor } from '../controller/imageByExtensionDimensionColor.js'
import { imageByExtensionDimenstionUrl } from '../controller/imageByExtensionDimenstionUrl.js'

export const routeImageGeneration = express.Router()

routeImageGeneration.get('/placeholder', imageByPlaceholder)

routeImageGeneration.get('/:extension/:dimension', imageByExtensionDimension)

routeImageGeneration.get('/:extension/:dimension/:backgroundColor', imageByExtensionDimensionColor)

routeImageGeneration.get('/:extension/:dimension/search/:queryString', imageByExtensionDimenstionUrl)
