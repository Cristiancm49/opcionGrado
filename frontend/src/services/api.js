const API_BASE_URL = 'http://localhost:5181/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw {
        status: response.status,
        message: errorData.message || `Error ${response.status}`,
        data: errorData
      };
    }

    if (response.status === 204) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

export const api = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),
  post: (endpoint, data) => request(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  put: (endpoint, data) => request(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

export default api;
