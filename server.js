//start project : nodemon server.js
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const next = require('next')
const cookieParser = require('cookie-parser')
const pathMatch = require('path-match')

const userRoutes = require('./routes/user')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const AuthentificationController = require('./controllers/authentification')
require('./services/passport')
const passport = require('passport')
const requireToken = passport.authenticate('jwt', { session: false })
const requireValidCredentials = passport.authenticate('local', { session: false })

// (?) http

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
		server.use(bodyParser.json({ type: '*/*' }))
		server.use(bodyParser.urlencoded({ extended: true }))
		server.use(cookieParser())

		// (!) Je pense que l'erreur vient de là car Front et le Client de doivent pas être lié dans mon cas
		// server.get('/signup', (req, res) => {
		// 	return app.render(req, res, '/signup', req.query)
		// })

		server.post('/signup', AuthentificationController.signup)
		server.post('/signin', requireValidCredentials, AuthentificationController.signin)
		server.get('/secretRessource', requireToken, function(req, res) {
			res.send({ codeDeLaMort: 42 })
		})

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
