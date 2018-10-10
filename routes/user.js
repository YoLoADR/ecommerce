const User = require('../models/user')

module.exports = function(expressServer) {
	expressServer.post('/signup', function(req, res, next) {
		const user = new User()
		user.profile.name = req.body.name
		user.password = req.body.password
		user.email = req.body.email

		User.findOne({ email: req.body.email }, function(err, existingUser) {
			if (existingUser) {
				console.log(req.body.email + ' is already exist')
				return res.redirect('/signup')
			} else {
				user.save(function(err, user) {
					if (err) {
						return next(err)
					}
					res.json('New user has been created')
				})
			}
		})
	})
}
