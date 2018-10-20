import { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import Navigation from './containers/_layout/navigation'
import { Container, Row, Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.css'

export default class Signup extends Component {
	constructor(props) {}

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
