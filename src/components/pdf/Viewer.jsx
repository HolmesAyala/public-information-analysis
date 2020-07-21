import React from "react"
import _ from "lodash"
import Hash from "../../utils/Hash"
import PropTypes from "prop-types"

/**
 * @typedef {Object} EventData
 * @property {string} event The event name
 * @property {string|number} [value] The event value
 */

/**
 * View modes
 */
export const VIEW_MODE = {
	FULL_WINDOW: "FULL_WINDOW",
	SIZED_CONTAINER: "SIZED_CONTAINER",
	IN_LINE: "IN_LINE",
	LIGHT_BOX: "LIGHT_BOX"
}

/**
 * Document events
 */
export const EVENTS = {
	CURRENT_PAGE: "CURRENT_PAGE",
	OPEN: "OPEN",
	CLOSE: "CLOSE",
	TEXT_SEARCH: "TEXT_SEARCH",
	TEXT_COPY: "TEXT_COPY",
	HYPERLINK_OPEN: "HYPERLINK_OPEN",
	PRINT: "PRINT",
	DOWNLOAD: "DOWNLOAD",
	TIME_IN_DOCUMENT: "TIME_IN_DOCUMENT",
	TIME_IN_PAGE: "TIME_IN_PAGE"
}

/**
 * Translations from adobe document events
 */
const ADOBE_EVENTS_TRANSLATIONS = {
	CURRENT_ACTIVE_PAGE: "CURRENT_PAGE",
	PDF_VIEWER_OPEN: "OPEN",
	PDF_VIEWER_CLOSE: "CLOSE",
	TEXT_SEARCH: "TEXT_SEARCH",
	TEXT_COPY: "TEXT_COPY",
	HYPERLINK_OPEN: "HYPERLINK_OPEN",
	DOCUMENT_PRINT: "PRINT",
	DOCUMENT_DOWNLOAD: "DOWNLOAD",
}

class Viewer extends React.Component {

	static propTypes = {
		fileName: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
		/**
		 * Visualization mode
		 */
		viewMode: PropTypes.oneOf(Object.keys(VIEW_MODE)),
		/**
		 * Options to customize document viewer
		 */
		previewOptions: PropTypes.shape({
			enableFormFilling: PropTypes.bool,
			showAnnotationTools: PropTypes.bool,
			showLeftHandPanel: PropTypes.bool,
			showDisabledSaveButton: PropTypes.bool
		}),
		style: PropTypes.any
	}

	static defaultProps = {
		viewMode: VIEW_MODE.SIZED_CONTAINER,
		previewOptions: {},
		style: {}
	}

	adobeDCView = null

	constructor(props) {
		super(props)
		// Generate a random ID for the document container
		this.CONTAINER_ID = `viewer-${Hash.getRandomHash()}`
	}

	componentDidMount() {
		if(this.props.viewMode !== VIEW_MODE.LIGHT_BOX)
			this.reloadDocument()
	}

	/**
	 * Create a new document with the properties provided
	 */
	reloadDocument() {
		this.initializeAdobeView()
		this.previewDocument()
	}

	/**
	 * Create an instance of AdobeDC.View
	 */
	initializeAdobeView() {
		let startConfig = { 
			clientId: process.env.REACT_APP_ADOBE_CLIENT_VIEW_ID, 
			divId: this.CONTAINER_ID
		}

		this.adobeDCView = new window.AdobeDC.View(startConfig);

		let DEFAULT_CALLBACK_CONFIG = {
			listenOn: [],
			enableFilePreviewEvents: true,
			enablePDFAnalytics: true
		}

		this.adobeDCView.registerCallback(
			window.AdobeDC.View.Enum.CallbackType.EVENT_LISTENER,
			(adobeEvent) => this.onAdobeDocumentEvent(adobeEvent),
			DEFAULT_CALLBACK_CONFIG
		)
	}

	/**
	 * Callback for adobe events
	 * @param {Object} adobeEvent 
	 */
	onAdobeDocumentEvent(adobeEvent) {
		let isEventToListen = Object.keys(ADOBE_EVENTS_TRANSLATIONS).includes(adobeEvent.type)

		if(isEventToListen)
			this.props.onEvent && this.props.onEvent(this.getEventDataFromAdobeEvent(adobeEvent))
	}

	shouldComponentUpdate(nextProps) {
		return !_.isEqual(nextProps, this.props)
	}

	componentDidUpdate() {
		if(this.props.viewMode !== VIEW_MODE.LIGHT_BOX)
			this.reloadDocument()
	}

	/**
	 * Show the document whether view mode is LIGHT_BOX
	 */
	show() {
		if(this.props.viewMode === VIEW_MODE.LIGHT_BOX)
			this.reloadDocument()
	}

	/**
	 * Call the previewFile method with the provided properties.
	 */
	previewDocument() {
		try {
			let documentData = {
				content: { location: { url: this.props.url } },
				metaData: { fileName: this.props.fileName },
			}

			let viewerOptions = {
				embedMode: this.props.viewMode,
				...this.props.previewOptions
			}

			this.adobeDCView.previewFile(documentData, viewerOptions);
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Get relevant adobeEvent information
	 * @param {Object} adobeEvent The adobe event
	 * @returns {EventData} The resulting event data
	 */
	getEventDataFromAdobeEvent(adobeEvent) {
		let localEvent = ADOBE_EVENTS_TRANSLATIONS[adobeEvent.type]

		if(!localEvent)
			throw new Error(
				`${adobeEvent.type} event invalid, should be: ${Object.keys(ADOBE_EVENTS_TRANSLATIONS)}`
			)

		switch(localEvent) {
			case EVENTS.CURRENT_PAGE:
				return { event: EVENTS.CURRENT_PAGE, value: adobeEvent.data.pageNumber }

			case EVENTS.TEXT_SEARCH:
				return { event: EVENTS.TEXT_SEARCH, value: adobeEvent.data.searchedText }

			case EVENTS.TEXT_COPY:
				return { event: EVENTS.TEXT_COPY, value: adobeEvent.data.copiedText }

			case EVENTS.HYPERLINK_OPEN:
				return { event: EVENTS.HYPERLINK_OPEN, value: adobeEvent.data.url }

			default:
				return { event: localEvent }
		}
	}

	render() {
		let { style } = this.props

		return <div id={this.CONTAINER_ID} style={style}></div>
	}
}

export default Viewer