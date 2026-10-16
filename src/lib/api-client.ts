import Axios from "axios";

const api = Axios.create({ baseURL: process.env.NEXT_PUBLIC_API_URL, withCredentials: true });

let refreshPromise: Promise<unknown> | null = null;

api.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const config = error.config;

		if (
			error.response?.status === 401 &&
			error.response?.data.error.code === "UNAUTHORIZED" &&
			config?.url !== "/refresh" &&
			!config?._retry
		) {
			config._retry = true;

			try {
				if (!refreshPromise) {
					refreshPromise = api.get("/refresh");
				}

				await refreshPromise;

				return api(config);
			} catch (error) {
				return Promise.reject(error);
			} finally {
				refreshPromise = null;
			}
		}

		return Promise.reject(error);
	},
);

export { api };
