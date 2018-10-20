import { Component } from 'react'
import {
	Jumbotron,
	Button,
	Card,
	CardImg,
	CardText,
	CardBody,
	CardTitle,
	CardSubtitle,
	Container,
	Row,
	Col
} from 'reactstrap'

export default class Home extends Component {
	render() {
		return (
			<div>
				<Jumbotron>
					<h1 className="display-3">Hello, world!</h1>
					<p className="lead">
						This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to
						featured content or information.
					</p>
					<hr className="my-2" />
					<p>
						It uses utility classes for typography and spacing to space content out within the larger
						container.
					</p>
					<p className="lead">
						<Button color="primary">Learn More</Button>
					</p>
				</Jumbotron>
				<Container>
					<Row>
						<Col xs="6" sm="4">
							<Card>
								<CardImg
									top
									width="100%"
									src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
									alt="Card image cap"
								/>
								<CardBody>
									<CardTitle>Card title</CardTitle>
									<CardSubtitle>Card subtitle</CardSubtitle>
									<CardText>
										Some quick example text to build on the card title and make up the bulk of the
										card's content.
									</CardText>
									<Button>Button</Button>
								</CardBody>
							</Card>
						</Col>
						<Col xs="6" sm="4">
							<Card>
								<CardImg
									top
									width="100%"
									src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
									alt="Card image cap"
								/>
								<CardBody>
									<CardTitle>Card title</CardTitle>
									<CardSubtitle>Card subtitle</CardSubtitle>
									<CardText>
										Some quick example text to build on the card title and make up the bulk of the
										card's content.
									</CardText>
									<Button>Button</Button>
								</CardBody>
							</Card>
						</Col>
						<Col sm="4">
							<Card>
								<CardImg
									top
									width="100%"
									src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
									alt="Card image cap"
								/>
								<CardBody>
									<CardTitle>Card title</CardTitle>
									<CardSubtitle>Card subtitle</CardSubtitle>
									<CardText>
										Some quick example text to build on the card title and make up the bulk of the
										card's content.
									</CardText>
									<Button>Button</Button>
								</CardBody>
							</Card>
						</Col>
					</Row>
				</Container>
			</div>
		)
	}
}
