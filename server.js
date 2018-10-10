const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const User = require('./models/user')

const app = express()
// password123
mongoose.connect('mongodb://root:password123@ds125713.mlab.com:25713/ecommerce-js', err => {
	if (err) {
		console.log('erreur', err)
	} else {
		console.log('connected to the database')
	}
})

// Show in a console all HTTP request inside the terminal
app.use(morgan('dev'))
app.use(express.static(__dirname + '/public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/create-user', (req, res, next) => {
	const user = new User()
	user.profile.name = req.body.name
	user.password = req.body.password
	user.email = req.body.email
	console.log('user', user)
	user.save(err => {
		if (err) {
			return next(err)
		}
		res.json('Successfuly created a new User')
	})
})

app.listen(3001, err => {
	if (err) {
		throw err
	}
	console.log('Server is running on PORT 3000')
})
