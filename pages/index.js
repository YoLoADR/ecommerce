import { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import '../public/style.css'
import Navigation from './containers/_layout/navigation'
import Home from './home'
import Footer from './containers/_layout/footer'

export default class App extends Component {
	render() {
		return (
			<div className="container-fluid">
				<Navigation />
				<Home />
				<Footer />
			</div>
		)
	}
}
