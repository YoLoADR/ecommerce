import { Component } from 'react'
import Navigation from './containers/_layout/navigation'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css'
import Error from 'next/error'
import axios from 'axios'

export default class Signup extends Component {
	constructor(props) {
		super(props)
		this.handleSubmit = this.handleSubmit.bind(this)
		// this.state = {
		// 	name: '',
		// 	email: '',
		// 	password: ''
		// }
	}

	componentDidMount() {
		this.fetchData()
	}

	fetchData() {
		axios.get('http://localhost:3000/signup').then(
			response => {
				console.log('response', response)
			},
			err => {
				console.log('err', err)
			}
		)
	}

	handleSubmit() {
		//event.stopPropagation()
		event.preventDefault()
		console.log('props', this.props)
		//console.log('state', this.state)
		//console.log('event', event)
	}

	render() {
		return (
			<div>
				<Navigation />
				<Container>
					<Row>
						<Col lg={{ size: '6', offset: 3 }}>
							<h1>Signup</h1>
						</Col>
					</Row>
					<Row>
						<Col lg={{ size: '6', offset: 3 }}>
							<Form action="/signup" method="GET">
								<FormGroup>
									<Label for="exampleName">Name</Label>
									<Input type="text" name="name" id="exampleName" placeholder="with a placeholder" />
								</FormGroup>
								<FormGroup>
									<Label for="exampleEmail">Email</Label>
									<Input
										type="email"
										name="email"
										id="exampleEmail"
										placeholder="with a placeholder"
									/>
								</FormGroup>
								<FormGroup>
									<Label for="examplePassword">Password</Label>
									<Input
										type="password"
										name="password"
										id="examplePassword"
										placeholder="password placeholder"
									/>
								</FormGroup>
								<Button type="submit">Submit</Button>
							</Form>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}
