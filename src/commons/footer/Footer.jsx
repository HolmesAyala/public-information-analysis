import React from "react"
import { Container } from "@material-ui/core"

import FooterLogo from "./footer-logo.svg"
import "./Footer.css"

/**
 * The IRS footer
 */
function Footer() {
	return (
		<footer>
			<Container className="container">
				<img src={FooterLogo} alt="IRS Logo" width="136px"></img>

				<div className="spacer"></div>

				<section>
					<ul>
						<li>Our Agency</li>
						<li>About IRS</li>
						<li>Work at IRS</li>
						<li>Help</li>
						<li>Contact Your Local Office</li>
						<li>Tax Stats, Facts & Figures</li>
					</ul>

					<ul>
						<li>Know Your Rights</li>
						<li>Taxpayer Bill of Rights</li>
						<li>Taxpayer Advocate Service</li>
						<li>Accessibility</li>
						<li>Civil Rights </li>
						<li>Freedom of Information Act</li>
						<li>No Fear Act</li>
						<li>Privacy Policy</li>
					</ul>

					<ul>
						<li>Resolve an Issue</li>
						<li>Respond to a Notice</li>
						<li>Independent Office of Appeals</li>
						<li>Identity Theft Protection</li>
						<li>Report Phishing</li>
						<li>Tax Fraud & Abuse</li>
					</ul>

					<ul>
						<li>Related Sites</li>
						<li>U.S. Treasury</li>
						<li>Treasury Inspector General for Tax Administration</li>
						<li>USA.gov</li>
					</ul>
				</section>
			</Container>
		</footer>
	)
}

export default Footer