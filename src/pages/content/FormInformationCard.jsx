import React from "react"

import { Card, CardContent, Typography, CardActions, Button } from "@material-ui/core"
import { Description } from "@material-ui/icons"
import PropTypes from "prop-types"

/**
 * Description information of form with action
 * to instructions
 */
class FormInformationCard extends React.Component {

	static propTypes = {
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		/**
		 * Gets called when the user give click on instruction button
		 */
		onShowInstructions: PropTypes.func
	}

	static defaultProps = {
		onShowInstructions: () => {}
	}

	/**
	 * The event callback
	 * @param {Object} event 
	 */
	onClick_showInstructionsButton = (event) => {
		this.props.onShowInstructions()
	}

	render() {
		let { title, description } = this.props

		return (
			<Card>
				<CardContent>
					<Typography variant="h5" gutterBottom>{title}</Typography>

					<Typography variant="body1" color="textSecondary">{description}</Typography>
				</CardContent>

				<CardActions>
					<Button 
						color="primary" 
						variant="contained" 
						startIcon={<Description />} 
						onClick={this.onClick_showInstructionsButton}
					>
						Instructions
				</Button>
				</CardActions>
			</Card>
		)
	}
}

export default FormInformationCard
