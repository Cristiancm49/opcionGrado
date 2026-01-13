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

  console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`, {
    body: options.body ? JSON.parse(options.body) : undefined,
    headers: config.headers
  });

  try {
    const response = await fetch(url, config);
    
    console.log(`📥 API Response: ${response.status} ${response.statusText}`, {
      endpoint,
      status: response.status,
      ok: response.ok
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const error = {
        status: response.status,
        message: errorData.message || `Error ${response.status}`,
        data: errorData
      };
      console.error(`❌ API Error [${endpoint}]:`, error);
      throw error;
    }

    if (response.status === 204) {
      console.log(`✅ API Success [${endpoint}]: No content`);
      return null;
    }

    const data = await response.json();
    console.log(`✅ API Success [${endpoint}]:`, data);
    return data;
  } catch (error) {
    // Si es un error de red (backend no disponible)
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error(`🚫 Network Error [${endpoint}]: Backend no disponible en ${API_BASE_URL}`);
      throw {
        status: 0,
        message: `No se pudo conectar con el servidor. Verifica que el backend esté ejecutándose en ${API_BASE_URL}`,
        originalError: error
      };
    }
    
    console.error(`❌ API Error [${endpoint}]:`, error);
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
