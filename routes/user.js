const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const User = require('../models/user')
var session = require('express-session')
const cookieParser = require('cookie-parser')
var flash = require('express-flash')

module.exports = function(expressServer) {
	expressServer.post('/signup', function(req, res, next) {
		console.log('POST RECU')
		const user = new User()
		user.profile.name = req.body.name
		user.password = req.body.password
		user.email = req.body.email

		User.findOne({ email: req.body.email }, function(err, existingUser) {
			if (existingUser) {
				req.flash('errors', 'Account with that email address already exist')
				console.log('ERREUR existingUser', req.flash('errors'))
				handleErro.erro = req.flash('errors')
				return res.redirect('/signup')
			} else {
				user.save(function(err, user) {
					if (err) {
						return next(err)
					}
					res.redirect('/')
				})
			}
		})
	})
}
