import React from "react"

import { Typography, Box } from "@material-ui/core"

import "./Searcher.css"

/**
 * The searcher of forms, instructions and publication
 */
class Searcher extends React.Component {
	render() {
		return (
			<section className="searcher">
				<Typography variant="h5" >
					<Box justifyContent="center" fontWeight="fontWeightBold" marginBottom={3} color="white">
						Forms, Instructions and Publications Search
					</Box>
				</Typography>

				<input type="text" placeholder="Search"/>
			</section>
		)
	}
}

export default Searcher