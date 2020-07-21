import React from "react"
import FormAPI from "../../api/FormAPI"

import { Container, Typography, Box, Grid } from "@material-ui/core"
import CardList from "../../components/form/CardList"
import LeftSideMenu from "./LeftSideMenu"
import Searcher from "./Searcher"

/**
 * The home page
 */
class Home extends React.Component {

	formAPI = new FormAPI()

	constructor(props) {
		super(props)

		this.state = {
			forms: []
		}
	}

	async componentDidMount() {
		try {
			this.setState({
				forms: await this.formAPI.getAll()
			})
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Gets called when the user give click in card item
	 * @param {Object} form 
	 */
	onClickItem_cardList = (form) => {
		this.props.history.push(`/content/${form.id}`)
	}

	render() {
		let { forms } = this.state

		return (
			<Container>
				<Typography variant="h4" gutterBottom>
					<Box fontWeight="fontWeightBold" lineHeight="3">Forms, Instructions & Publications</Box>
				</Typography>

				<Grid container spacing={2}>
					<Grid item md={3}>
						{<LeftSideMenu/>}
					</Grid>

					<Grid item md={9}>
						<Searcher />

						<CardList
							items={forms}
							onClickItem={this.onClickItem_cardList}
						/>
					</Grid>
				</Grid>
			</Container>
		)
	}
}

export default Home