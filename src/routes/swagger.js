import fs from 'fs'
import YAML from 'yaml'
import express from 'express'
import swaggerUi from 'swagger-ui-express'

export const routeSwagger = express.Router()

const swaggerDocument = YAML.parse(
  fs.readFileSync('./swagger.yml', 'utf8')
)

routeSwagger.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
