import http from 'http'
import server from './server/server'
import config from './config/config'

const PORT = process.env.API_PORT || config.api.port

global.Promise = require('bluebird')
const httpServer = http.createServer(server)
httpServer.listen(PORT, () => {
	console.log(`Server is running on PORT: ${PORT}`)
})
