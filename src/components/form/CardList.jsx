import React from "react"
import PropTypes from "prop-types"

import { Grid, Card, CardContent, Typography, CardActionArea, Box } from "@material-ui/core"

/**
 * Card list of forms
 */
class CardList extends React.Component {

	static propTypes = {
		/** 
		 * Item list
		 */
		items: PropTypes.arrayOf(PropTypes.shape({
			id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			description: PropTypes.string.isRequired
		})),
		/** 
		 * Gets called when the user give click in a card
		 * @param {Object} item The item clicked
		 */
		onClickItem: PropTypes.func
	}

	static defaultProps = {
		items: [],
		onClickItem: (item) => {}
	}

	/**
	 * Gets called when the user give click in a card
	 * @param {Object} item The form clicked
	 * @param {Object} event The click event
	 */
	onClickItem = (item, event) => {
		this.props.onClickItem(item)
	}

	render() {
		let { items } = this.props

		let cardList = items.map(item => {
			return (
				<Grid item key={item.id} xs={12} md={4}>
					<Card variant="outlined">
						<CardActionArea onClick={(e) => { this.onClickItem(item, e) }}>
							<CardContent>
								<Typography variant="subtitle1" gutterBottom>
									<Box fontWeight="fontWeightBold">{item.title}</Box>
								</Typography>

								<Typography>{item.description}</Typography>
							</CardContent>
						</CardActionArea>
					</Card>
				</Grid>
			)
		})

		return (
			<Grid container spacing={3}>
				{cardList}
			</Grid>
		)
	}
}


export default CardList