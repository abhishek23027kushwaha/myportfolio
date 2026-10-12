// Smart API configuration:
// Automatically normalizes the Render backend URL (with or without /api and trailing slashes)
const rawUrl = import.meta.env.VITE_API_URL;

const formatApiBase = () => {
  if (!rawUrl) return '/api';
  const cleanUrl = rawUrl.trim().replace(/\/+$/, '');
  return cleanUrl.endsWith('/api') ? cleanUrl : `${cleanUrl}/api`;
};

export const API_BASE = formatApiBase();
export default API_BASE;
