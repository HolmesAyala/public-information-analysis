import React from "react";
import Header from "../../commons/header/Header"
import Footer from "../../commons/footer/Footer"
import Home from "../home/Home"
import Content from "../content/Content"
import { BrowserRouter, Route, Redirect } from "react-router-dom"

/**
 * Principal component
 */
class App extends React.Component {
	render() {
		return (
			<React.Fragment>
				<Header />

				<BrowserRouter>
					<Redirect from="/" to="/home" />
					<Route exact path="/home" component={Home} />
					<Route exact path="/content/:id" component={Content} />
				</BrowserRouter>

				<Footer />
			</React.Fragment>
		);
	}
}

export default App;
