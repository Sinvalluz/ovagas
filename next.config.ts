import type { NextConfig } from "next";
import "./src/config/env";

const nextConfig: NextConfig = {
	/* config options here */
	allowedDevOrigins: ["192.168.0.229"],
};

export default nextConfig;
