import { Component } from 'react'
//import { Field, reduxForm } from 'redux-form'
import Navigation from './containers/_layout/navigation'
import 'bootstrap/dist/css/bootstrap.css'

export default class Signup extends Component {
	render() {
		return (
			<div>
				<Navigation />
				<h1>Signup</h1>
			</div>
		)
	}
}
