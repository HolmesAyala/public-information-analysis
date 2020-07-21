import React from "react"
import { Container } from "@material-ui/core"
import IRSLogo from "./IRS-Logo.svg"

import "./Header.css"

/**
 * The IRS header
 */
class Header extends React.Component {

	render() {
		return (
			<header>
				<div className="official-message">
					<Container>
						<span className="message">An official website of the United States Government</span>
					</Container>
				</div>

				<div className="main-header" >
					<Container className="container">
						<img className="irs-logo" src={IRSLogo} alt="IRS logo"></img>

						<menu>
							<span>Help</span>

							<span>News</span>

							<span>Charities & Nonprofits</span>

							<span>Tax Pros</span>
						</menu>
					</Container>
				</div>

				<div className="main-navigation">
					<Container className="container">
						<menu>
							<span>File</span>

							<span>Pay</span>

							<span>Refunds</span>

							<span>Credits & Deductions</span>

							<span>Forms & Instructions</span>
						</menu>

						<input type="text" placeholder="Search"/>
					</Container>
				</div>
			</header>
		)
	}

}

export default Header