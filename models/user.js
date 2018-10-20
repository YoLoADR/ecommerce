var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var UserSchema = new mongoose.Schema({
	email: { type: String, unique: true, lowercase: true },
	password: String,
	profile: {
		name: { type: String, default: '' },
		picture: { type: String, default: '' }
	},
	address: String,
	history: [
		{
			date: Date,
			paid: { type: Number, default: 0 }
		}
	]
})

UserSchema.pre('save', function(next) {
	const user = this
	if (!user.isModified('password')) return next()
	bcrypt.genSalt(10, function(err, salt) {
		if (err) {
			return next(err)
		}
		bcrypt.hash(user.password, salt, null, function(err, hash) {
			if (err) return next(err)
			user.password = hash
			next()
		})
	})
})

// UserSchema.methods : permet d'accrocher une methode à notre Schema
UserSchema.methods.comparePassword = function(password, done) {
	bcrypt.compare(password, this.password, function(err, isMatch) {
		if (err) {
			return done(err)
		}

		done(null, isMatch)
	})
}

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel
