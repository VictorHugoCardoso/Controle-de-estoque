import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import locale from 'locale'
import router from '../router/router'

const NODE_ENV = process.env.NODE_ENV
const server = express()
const locales = ['pt-BR']

if (NODE_ENV === 'development' || NODE_ENV === 'test') {
	server.use(morgan('combined'))
}

server.use(locale(locales))
server.use(bodyParser.urlencoded({extended: true}))
server.use(bodyParser.json())
server.use(cors())
server.use(helmet())
server.use(helmet.noCache())
server.use('/api/v1', router)
server.use((err, req, res, next) => {
	res.status(err.status).json(err)
})

export default server
