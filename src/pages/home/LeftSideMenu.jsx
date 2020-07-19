import React from "react"

import "./LeftSideMenu.css"

class LeftSideMenu extends React.Component {

	render() {
		return (
			<menu className="leftSideMenu">
				<ul>
					<li>Current Year</li>
					<li>Prior Year</li>
					<li>Accessible</li>
					<li>eBooks</li>
					<li>Browser Friendly</li>
					<li>Post Release Changes to Forms</li>
					<li>Order Forms and Pubs</li>
					<li>Help with Forms and Instructions</li>
					<li>Comment on Tax Forms and Publications</li>
				</ul>
			</menu>
		)
	}
}

export default LeftSideMenu