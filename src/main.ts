import * as cors from 'cors'
import * as express from 'express'
import { Request, Response, NextFunction } from 'express'
import * as morgan from 'morgan'
import * as swaggerUi from 'swagger-ui-express'
import routes from './routes'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import * as Sentry from '@sentry/node'

dotenv.config()

const app = express()

Sentry.init({
	dsn: process.env.SENTRY_DSN
})

try {
	const mongoUrl = process.env.MONGO_URI

	const connectOptions: any = {
		autoCreate: true,
		connectTimeoutMS: 5000,
		serverSelectionTimeoutMS: 180000,
		socketTimeoutMS: 180000,
		authSource: 'admin'
	}

	mongoose
		.connect(mongoUrl, { ...connectOptions, dbName: 'blog_editor' })
		.then(() => console.log('Connected to main database'))
		.catch((e) => {
			Sentry.captureException(e)
			console.error('Failed to connect to main database:', e)
			process.exit(1)
		})
	console.log('Connected to main database')
} catch (e) {
	Sentry.captureException(e)
	console.error('Failed to connect to main database:', e)
}

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

const PORT = process.env.PORT || 3000

const swaggerDocOptions = {
	swaggerOptions: {
		url: '/swagger.yml',
		defaultModelsExpandDepth: -1
	}
}

app.use(express.static('public'))
app.use('/coverage', express.static('coverage/lcov-report'))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(null, swaggerDocOptions))
app.use('/', routes)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
	Sentry.captureException(err)

	const statusCode = err.statusCode || 500
	const message = err.message || 'Internal Server Error'

	res.status(statusCode).json({
		status: 'error',
		message,
		stack: process.env.NODE_ENV === 'production' ? undefined : err.stack
	})
})

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})

export default app
