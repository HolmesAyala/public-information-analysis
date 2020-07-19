import React from "react"

import { Card, CardContent, Typography, CardActions, Button } from "@material-ui/core"
import { Description } from "@material-ui/icons"

class FormInformationCard extends React.Component {

	onClick_showInstructionsButton = (event) => {
		this.props.onShowInstructions && this.props.onShowInstructions()
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
