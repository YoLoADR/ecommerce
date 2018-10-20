const User = require('../models/user')
const lodash = require('lodash')

exports.signup = function(req, res, next) {
	const { email, password, name } = req.body
	User.findOne({ email: email }, function(err, existingUser) {
		if (err) {
			return next(err)
		}
		if (existingUser) {
			return res.status(422).send({ error: 'Account with that email address already exist' })
		}
		if (lodash.isEmpty(email) || lodash.isEmpty(password)) {
			return res.status(422).send({ error: 'Email or Password is empty' })
		} else {
			const user = new User({
				email,
				password,
				profile: {
					name: name
				}
			})

			user.save(function(err) {
				if (err) {
					return next(err)
				}
				res.json(user)
			})
		}
	})
}
