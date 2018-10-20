const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const next = require('next')
var session = require('express-session')
const cookieParser = require('cookie-parser')

const path = require('path')
const pathMatch = require('path-match')

const userRoutes = require('./routes/user')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const User = require('./models/user')
//start project : nodemon server.js

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
		server.use(cookieParser())
		server.use(
			session({
				resave: true,
				saveUninitialized: true,
				secret: 'Yohann#@!!;'
			})
		)

		const route = pathMatch()

		server.get('/signup', (req, res) => {
			return app.render(req, res, '/signup', req.query)
		})

		server.get('/signup', function(req, res, next) {
			User.findOne({ email: req.body.email }, function(err, existingUser) {
				if (existingUser) {
					//req.flash('errors', 'Account with that email address already exist')
					console.log('ERREUR existingUser', req.flash('errors'))
					const queryParams = { title: 'Account with that email address already exist' }
					return app.render(req, res, '/signup', queryParams)
				} else {
					user.save(function(err, user) {
						if (err) {
							return next(err)
						}
						return app.render(req, res, '/signup', user)
					})
				}
			})
		})
		//userRoutes(server)

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
