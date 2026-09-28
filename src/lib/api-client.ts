import Axios, { type AxiosError } from "axios";
import { env } from "@/config/env";
import type { ErrorResponse } from "@/types/error";

const api = Axios.create({
	baseURL: env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

api.interceptors.response.use(
	(response) => response,
	(error: AxiosError<ErrorResponse>) => {
		return Promise.reject(error);
	},
);

export { api };
