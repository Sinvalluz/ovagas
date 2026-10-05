"use client";

import { useQuery } from "@tanstack/react-query";
import getUser from "@/services/get-user";

export default function useCurrentUser() {
	return useQuery({ queryKey: ["user"], queryFn: getUser, retry: false });
}
