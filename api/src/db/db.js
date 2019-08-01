import config from '../config/config'
import Promise from 'bluebird'
// import moment from 'moment'

const initOptions = {
	promiseLib: Promise,
	connect(client, dc, isFresh) {
		const cp = client.connectionParameters
		console.log('Conectado na base de dados:', cp.database)
	},
	error(err, e) {
		if (err) {
			console.log(err)
		}
	},
	query(e) {
		console.log('QUERY:', e.query)
	}
}
const connectionConfig = {
	host: config.db.host,
	port: config.db.port,
	user: config.db.user,
	password: config.db.pass,
	database: config.db.database,
	poolSize: 10,
	idleTimeoutMillis: 5
}
const pgp = require('pg-promise')(initOptions)
// const types = pgp.pg.types
// types.setTypeParser(1114, str => moment.utc(str).format())
// types.setTypeParser(1082, str => moment(str).format('DD/MM/YYYY'))
const db = pgp(connectionConfig)

export default db