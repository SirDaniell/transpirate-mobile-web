import { Polygon, Base } from "@thirdweb-dev/chains";

export const SUPPORTED_CHAINS = [Polygon, Base];
export const ACTIVE_CHAIN = Polygon;

// Replace with your actual thirdweb client ID from https://thirdweb.com/dashboard
export const THIRDWEB_CLIENT_ID = import.meta.env.VITE_THIRDWEB_CLIENT_ID || "";

// Backend API base URL
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://api.yourdomain.com";

// Contract addresses (replace with actual deployed contract addresses)
export const CONTRACTS = {
  BESHA_TOKEN: import.meta.env.VITE_BESHA_TOKEN_ADDRESS || "",
  STAKING: import.meta.env.VITE_STAKING_CONTRACT_ADDRESS || "",
  SOCIAL_GRAPH: import.meta.env.VITE_SOCIAL_GRAPH_ADDRESS || "",
};
