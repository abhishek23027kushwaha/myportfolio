// Smart API configuration:
// Automatically normalizes the Render backend URL (with or without /api and trailing slashes)
const rawUrl = import.meta.env.VITE_API_URL;

const formatApiBase = () => {
  if (rawUrl) {
    const cleanUrl = rawUrl.trim().replace(/\/+$/, '');
    return cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;
  }
  // In production, fallback to live Render backend if VITE_API_URL is omitted
  if (import.meta.env.PROD) {
    return 'https://myportfolio-sxi9.onrender.com/api';
  }
  // In local dev, use local proxy /api
  return '/api';
};

export const API_BASE = formatApiBase();
export default API_BASE;
