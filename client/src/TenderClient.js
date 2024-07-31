import axios from "axios";

const getToken = () => localStorage.getItem("authToken");

const createClient = () => {
	const token = getToken();
	return axios.create({
		baseURL: "http://localhost:3000",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
		},
	});
};

const handleAuthError = (error) => {
	if (error.response && error.response.status === 401) {
		localStorage.removeItem("authToken");
		window.location.href = "/sign-in";
	}
	throw error;
};

export const get = async (endpoint) => {
	const client = createClient();
	try {
		const response = await client.get(endpoint);
		return response.data;
	} catch (error) {
		handleAuthError(error);
	}
};

export const post = async (endpoint, data) => {
	const client = createClient();
	try {
		const response = await client.post(endpoint, data);
		return response.data;
	} catch (error) {
		handleAuthError(error);
	}
};

export const put = async (endpoint, data) => {
	const client = createClient();
	try {
		const response = await client.put(endpoint, data);
		return response.data;
	} catch (error) {
		handleAuthError(error);
	}
};

export const del = async (endpoint) => {
	const client = createClient();
	try {
		const response = await client.delete(endpoint);
		return response.data;
	} catch (error) {
		handleAuthError(error);
	}
};
