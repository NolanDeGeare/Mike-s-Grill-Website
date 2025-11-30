// API Configuration
// When deployed as a single service, the React app is served from the same origin
// as the Spring Boot backend, so we use relative paths (empty base URL).
// This works for both development (if using a proxy) and production (single JAR).

export const API_BASE_URL = '';

// Helper function to construct API URLs
export const apiUrl = (path: string): string => {
  return `${API_BASE_URL}${path}`;
};
