// Token management
export const getToken = (): string | null => {
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('adminToken='));
  return tokenCookie ? tokenCookie.split('=')[1] : null;
};

export const isAuthenticated = (): boolean => {
  return !!getToken();
};

export const deleteTokenLogin = (): void => {
  document.cookie = 'adminToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
};

// API call wrapper with auth
export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getToken();
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  // If unauthorized, clear token and redirect to login
  if (response.status === 401) {
    window.location.href = '/login';
    throw new Error('Session expired. Please login again.');
  }

  return response;
}; 