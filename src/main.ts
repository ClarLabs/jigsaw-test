import * as cors from 'cors'
import * as express from 'express'
import * as morgan from 'morgan'
import * as swaggerUi from 'swagger-ui-express'
import routes from './routes'
import * as mongoose from 'mongoose'
import * as dotenv from 'dotenv'

dotenv.config()

const app = express()

try {
	const mongoUrl = process.env.MONGO_URI

	const connectOptions: any = {
		autoCreate: true,
		connectTimeoutMS: 5000,
		serverSelectionTimeoutMS: 180000,
		socketTimeoutMS: 180000,
		authSource: 'admin'
	}

	mongoose.connect(mongoUrl, {
		...connectOptions,
		dbName: 'blog_editor'
	})
	console.log('Connected to main database')
} catch (e) {
	console.error('Failed to connect to main database:', e)
}

app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({ status: 'error', message: err.message || 'Unexpected error' })
})

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

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})

export default app
