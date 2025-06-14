'use client';

import toast from 'react-hot-toast';

// Token management
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const cookies = document.cookie.split(';');
    const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('adminToken='));
    return tokenCookie ? decodeURIComponent(tokenCookie.split('=')[1].trim()) : null;
  } catch (error) {
    console.error('Error getting token:', error);
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;
  return !!getToken();
};

export const deleteTokenLogin = (): void => {
  if (typeof window === 'undefined') return;
  
  try {
    document.cookie = 'adminToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict';
  } catch (error) {
    console.error('Error deleting token:', error);
  }
};

// API call wrapper with auth
export const fetchWithAuth = async (
  url: string,
  options: RequestInit = {}
): Promise<Response> => {
  if (typeof window === 'undefined') {
    throw new Error('fetchWithAuth can only be used in browser environment');
  }

  const token = getToken();
  
  if (!token) {
    deleteTokenLogin();
    toast.error('Sesi Anda telah berakhir. Silakan login kembali.');
    throw new Error('No authentication token found');
  }

  try {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    // If unauthorized, clear token and throw error
    if (response.status === 401) {
      deleteTokenLogin();
      toast.error('Sesi Anda telah berakhir. Silakan login kembali.');
      throw new Error('Session expired. Please login again.');
    }

    return response;
  } catch (error) {
    if (error instanceof Error && error.message.includes('No authentication token found')) {
      deleteTokenLogin();
      toast.error('Sesi Anda telah berakhir. Silakan login kembali.');
    }
    throw error;
  }
}; 