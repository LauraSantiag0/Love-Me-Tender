import axios from "axios";

class TenderClient {
	constructor(baseURL, token) {
		this.client = axios.create({
			baseURL: baseURL,
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		this.client.interceptors.response.use(
			(response) => response,
			(error) => {
				console.error(
					"API call error:",
					error.response ? error.response.data : error.message
				);
				return Promise.reject(error);
			}
		);
	}

	async get(endpoint) {
		try {
			const response = await this.client.get(endpoint);
			return response.data;
		} catch (error) {
			console.error(
				"GET request error:",
				error.response ? error.response.data : error.message
			);
			throw error;
		}
	}

	async post(endpoint, data) {
		try {
			const response = await this.client.post(endpoint, data);
			return response.data;
		} catch (error) {
			console.error(
				"POST request error:",
				error.response ? error.response.data : error.message
			);
			throw error;
		}
	}

	async put(endpoint, data) {
		try {
			const response = await this.client.put(endpoint, data);
			return response.data;
		} catch (error) {
			console.error(
				"PUT request error:",
				error.response ? error.response.data : error.message
			);
			throw error;
		}
	}

	async delete(endpoint) {
		try {
			const response = await this.client.delete(endpoint);
			return response.data;
		} catch (error) {
			console.error(
				"DELETE request error:",
				error.response ? error.response.data : error.message
			);
			throw error;
		}
	}
}

export default TenderClient;
