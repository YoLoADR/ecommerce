const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const next = require('next')

const userRoutes = require('./routes/user')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

mongoose.connect('mongodb://root:password123@ds125713.mlab.com:25713/ecommerce-js', err => {
	if (err) {
		console.log('erreur', err)
	} else {
		console.log('connected to the database')
	}
})

app
	.prepare()
	.then(() => {
		const server = express()

		server.use(morgan('dev'))
		server.use(express.static(__dirname + '/public'))
		server.use(bodyParser.json())
		server.use(bodyParser.urlencoded({ extended: true }))
		userRoutes(server)

		server.get('*', (req, res) => {
			return handle(req, res)
		})

		server.listen(3000, err => {
			if (err) throw err
			console.log('> Ready on http://localhost:3000')
		})
	})
	.catch(ex => {
		console.error(ex.stack)
		process.exit(1)
	})
