import Data from "./Data"

class FormAPI {
	/**
	 * Get one form
	 * @param {String} id
	 * @returns {Promise<Object | null>}
	 */
	async getById(id) {
		let forms = await this.getAll();

		for (let form of forms) if (form.id === id) return form;

		return null;
	}

	/**
	 * Get all forms
	 * @returns {Promise<Array<Object>>}
	 */
	async getAll() {
		return Data.forms;
	}
}

export default FormAPI;