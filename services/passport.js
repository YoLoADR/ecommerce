const passport = require('passport')
const User = require('../models/user')
const config = require('../config')
const LocalStrategy = require('passport-local')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const localOptions = { usernameField: 'email' }
const localLoginStrategy = new LocalStrategy(localOptions, function(email, password, done) {
	User.findOne({ email }, function(err, user) {
		if (err) return done(err)
		if (!user) return done(null, false)
		user.comparePassword(password, function(err, isMatch) {
			if (err) {
				return done(err)
			}
			if (!isMatch) {
				return done(null, false)
			}
			return done(null, user)
		})
	})
})

// Où est-ce que tu vas chercher ton token pour pouvoir ensuite le déTokenniser
// jwtFromRequest : Il va aller chercher la valeur de la clé authorization dans le header
// secretOrKey : Pour décrypter le tout il a besoin de notre clés secret
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
}

//déTokenniser
// Payload : dedans on va pouvoir recupérer les infos (sub et iat)
const jwtVerifyToken = new JwtStrategy(jwtOptions, function(payload, done) {
	const userId = payload.sub
	User.findById(userId, function(err, user) {
		if (err) {
			return done(err, false)
		}
		if (user) {
			return done(null, user)
		} else {
			return done(null, false)
		}
	})
})

passport.use(jwtVerifyToken)
passport.use(localLoginStrategy)
