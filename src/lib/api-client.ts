import Axios from "axios";
import { env } from "@/config/env";

export const api = Axios.create({
	baseURL: env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});
