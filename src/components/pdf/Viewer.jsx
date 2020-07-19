import React from "react"
import _ from "lodash"
import Hash from "../../utils/Hash"

export const VIEW_MODE = {
	FULL_WINDOW: "FULL_WINDOW",
	SIZED_CONTAINER: "SIZED_CONTAINER",
	IN_LINE: "IN_LINE",
	LIGHT_BOX: "LIGHT_BOX"
}

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

	adobeDCView = null

	constructor(props) {
		super(props)
		this.CONTAINER_ID = `viewer-${Hash.getRandomHash()}`
	}

	componentDidMount() {
		if(this.props.viewMode !== VIEW_MODE.LIGHT_BOX)
			this.reloadDocument()
	}

	reloadDocument() {
		this.initializeAdobeView()
		this.previewDocument()
	}

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

	previewDocument() {
		try {
			let previewOptions = this.props.previewOptions || {}

			let documentData = {
				content: { location: { url: this.props.url } },
				metaData: { fileName: this.props.fileName },
			}

			let viewerOptions = {
				embedMode: this.props.viewMode || VIEW_MODE.SIZED_CONTAINER,
				...previewOptions
			}

			this.adobeDCView.previewFile(documentData, viewerOptions);
		} catch (error) {
			console.log(error);
		}
	}

	/**
	 * Get relevant adobeEvent information
	 * @param {Object} adobeEvent The adobe event
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
		let style = _.get(this.props, "style", {})

		return <div id={this.CONTAINER_ID} style={style}></div>
	}
}

export default Viewer