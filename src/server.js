import fs from 'fs'
import YAML from 'yaml'
import express from 'express'
import swaggerUi from 'swagger-ui-express'
const swaggerDocument = YAML.parse(
  fs.readFileSync('./swagger.yml', 'utf8')
)

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// swagger stuff
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req, res) => {
  return res.status(200).send({
    success: 'true',
    message: ':-D'
  })
})

app.listen(6565)
