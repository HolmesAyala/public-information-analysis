import React from "react"

import { Grid, Card, CardContent, Typography, CardActionArea, Box } from "@material-ui/core"

class CardList extends React.Component {

	onClickItem = (form, event) => {
		this.props.onClickItem && this.props.onClickItem(form)
	}

	render() {
		let { items: forms } = this.props

		let cardList = forms.map(form => {
			return (
				<Grid item key={form.id} xs={12} md={4}>
					<Card variant="outlined">
						<CardActionArea onClick={(e) => { this.onClickItem(form, e) }}>
							<CardContent>
								<Typography variant="subtitle1" gutterBottom>
									<Box fontWeight="fontWeightBold">{form.title}</Box>
								</Typography>

								<Typography>{form.description}</Typography>
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