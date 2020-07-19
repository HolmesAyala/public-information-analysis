import Data from "./Data"

class FormAPI {
	/**
	 * Get one form
	 * @param {String} id
	 * @returns {Promise<Object | null>} The form
	 */
	async getById(id) {
		let forms = await this.getAll();

		for (let form of forms) if (form.id === id) return form;

		return null;
	}

	/**
	 * Get all forms
	 * @returns {Promise<Array>} Form list
	 */
	async getAll() {
		return Data.forms;
	}
}

export default FormAPI;