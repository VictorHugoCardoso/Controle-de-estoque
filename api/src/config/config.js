import dotenv from 'dotenv'
require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV

if (NODE_ENV === 'development' || NODE_ENV === 'test') dotenv.config()

export default {
	db: {
		user: process.env.BAZAR_43_DATABASE_USER || 'postgres',
		pass: process.env.BAZAR_43_DATABASE_PASS || 'postgres',
		host: process.env.BAZAR_43_DATABASE_HOST || 'localhost',
		port: process.env.BAZAR_43_DATABASE_PORT || 5432,
		database: (NODE_ENV === 'production') ? process.env.BAZAR_43_DATABASE_DATABASE : (NODE_ENV === 'development') ? process.env.BAZAR_43_DATABASE_DEV : (NODE_ENV === 'homolog') ? process.env.BAZAR_43_DATABASE_HOMOLOG : process.env.BAZAR_43_DATABASE_TEST
	},
	auth: {
		secret: process.env.BAZAR_43_JWT_SECRET || 'secret'
	},
	api: {
		port: (NODE_ENV === 'production') ? process.env.API_PORT : 9000,
		upload_directory: process.env.BAZAR_43_UPLOAD_DIRECTORY || '/tmp/'
	},
	microservices: {
		url: process.env.BAZAR_43_MICROSERVICES_URL || 'http://localhost:4000/microservices'
	}
}
