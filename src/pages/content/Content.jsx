import React from "react"
import FormAPI from "../../api/FormAPI"
import Analitycs from "../../analytics/Analytics"

import {
	Container,
	Grid,
	Checkbox,
	FormControlLabel,
	Box,
	Breadcrumbs,
	Typography
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import { Link } from "react-router-dom"
import Viewer, { VIEW_MODE } from "../../components/pdf/Viewer"

import FormInformationCard from "./FormInformationCard"

/**
 * Page with a form and it's instructions
 */
class Content extends React.Component {

	formAPI = new FormAPI()

	constructor(props) {
		super(props)

		 // Initial time with this form
		this.startTime = null
		/**
		 * Ref for:
		 * - Call it's show method
		 */
		this.instructionsViewerRef = React.createRef()

		this.state = {
			form: null,
			formFillingEnabled: false
		}
	}

	async componentDidMount() {
		try {
			let { id } = this.props.match.params
			let form = await this.formAPI.getById(id)

			if (!form) return this.props.history.push("/home");

			this.setState({ form })

			this.startTime = new Date()
		} catch (error) {
			console.log(error);
			this.props.history.push("/home");
		}
	}

	async componentWillUnmount() {
		if (!this.state.form) return;

		try {
			// Send the total time in with the current form
			let endTime = new Date()

			let secondsTime = parseInt((endTime - this.startTime) / 1000)

			await Analitycs.sendEvent({
				category: this.state.form.form.name,
				action: "TIME",
				value: secondsTime
			})
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Gets called when the user want to see instructions
	 */
	onShowInstructions = () => {
		this.instructionsViewerRef.current.show()
	}

	/**
	 * Callback when an event over form viewer is produced
	 * @param {EventData} eventData 
	 */
	onEvent_formViewer = async (eventData) => {
		try {
			await Analitycs.sendEvent({
				category: this.state.form.form.name,
				action: eventData.event,
				label: eventData.value ? String(eventData.value) : undefined
			})
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Callback when an event over instructions viewer is produced
	 * @param {EventData} eventData 
	 */
	onEvent_instructionsViewer = async (eventData) => {
		try {
			await Analitycs.sendEvent({
				category: this.state.form.instructions.name,
				action: eventData.event,
				label: eventData.value ? String(eventData.value) : undefined
			})
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Callback when the user toggle the form filling checkbox
	 * @param {Object} event 
	 */
	onChange_checkBoxFormFill = (event) => {
		if(event.target.checked) {
			Analitycs.sendEvent({
				category: this.state.form.form.name,
				action: "FORM_FILLING"
			})
			.catch(error => console.log(error))
		}
		
		this.setState({
			formFillingEnabled: event.target.checked
		})
	}

	/**
	 * @param {Object} form 
	 * @param {boolean} enableFormFilling 
	 */
	getFormViewer(form, enableFormFilling) {
		return (
			<Viewer
				fileName={form.form.name}
				url={form.form.url}
				style={{ height: "842px" }}
				viewMode={VIEW_MODE.FULL_WINDOW}
				onEvent={this.onEvent_formViewer}
				previewOptions={{
					enableFormFilling,
					showAnnotationTools: false,
					showLeftHandPanel: false,
					showDisabledSaveButton: false
				}} />
		)
	}

	/**
	 * @param {Object} form 
	 */
	getInstructionsViewer(form) {
		return (
			<Viewer
				ref={this.instructionsViewerRef}
				fileName={form.instructions.name}
				url={form.instructions.url}
				viewMode={VIEW_MODE.LIGHT_BOX}
				onEvent={this.onEvent_instructionsViewer}
				previewOptions={{
					showAnnotationTools: false,
					showLeftHandPanel: false,
					showDisabledSaveButton: false
				}} />
		)
	}

	render() {
		let { form, formFillingEnabled } = this.state

		if (!form)
			return <div>Loading...</div>

		let navigatorComponent = (
			<Box paddingY={3}>
				<Breadcrumbs aria-label="breadcrumb">
					<Link color="inherit" to="/home">
						Forms & Instructions
				</Link>

					<Typography color="textPrimary">{form.title}</Typography>
				</Breadcrumbs>
			</Box>
		)

		let formViewerComponent = this.getFormViewer(form, formFillingEnabled)

		let instructionsViewerComponent = this.getInstructionsViewer(form)

		let formFillingCheckbox = (
			<Box padding={1}>
				<FormControlLabel
					label="Enable form filling"
					control={<Checkbox checked={formFillingEnabled} onChange={this.onChange_checkBoxFormFill} />}
				/>
			</Box>
		)

		let alertMessageComponent = formFillingEnabled && (
			<Alert severity="warning">
				Some types of form fields may not be supported.
			</Alert>
		)

		return (
			<Container>
				{navigatorComponent}

				<Grid container spacing={2}>
					<Grid item xs={12} lg={2}>
						<FormInformationCard
							title={form.title}
							description={form.description}
							onShowInstructions={this.onShowInstructions}
						/>

						{formFillingCheckbox}

						{alertMessageComponent}
					</Grid>

					<Grid item xs={12} lg={10}>
						{formViewerComponent}
					</Grid>
				</Grid>

				{instructionsViewerComponent}
			</Container>
		)
	}
}

export default Content