import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Create axios instance with auth header
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export interface BookCopy {
  accessionNumber: string;
  bookId: string;
  title: string;
  author: string;
  status: 'available' | 'borrowed' | 'lost' | 'damaged';
  shelfLocation?: string;
  callNumber?: string;
}

export const copyService = {
  // Get all copies of a book
  getCopies: async (bookId: string): Promise<BookCopy[]> => {
    try {
      const response = await api.get(`/books/${bookId}/copies`);
      return response.data.data || response.data;
    } catch (error: any) {
      console.error('Error fetching copies:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch copies');
    }
  },

  // Add single copy
  addCopy: async (bookId: string): Promise<any> => {
    try {
      const response = await api.post(`/books/${bookId}/copies`);
      return response.data.data;
    } catch (error: any) {
      console.error('Error adding copy:', error);
      throw new Error(error.response?.data?.message || 'Failed to add copy');
    }
  },

  // Bulk add copies
  addBulkCopies: async (bookId: string, count: number): Promise<any> => {
    try {
      const response = await api.post(`/books/${bookId}/copies/bulk`, { count });
      return response.data.data;
    } catch (error: any) {
      console.error('Error adding bulk copies:', error);
      throw new Error(error.response?.data?.message || 'Failed to add copies');
    }
  },

  // Delete copy
  deleteCopy: async (bookId: string, accession: string): Promise<void> => {
    try {
      await api.delete(`/books/${bookId}/copies/${accession}`);
    } catch (error: any) {
      console.error('Error deleting copy:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete copy');
    }
  },

  // Update copy
  updateCopy: async (bookId: string, accession: string, data: any): Promise<any> => {
    try {
      const response = await api.put(`/books/${bookId}/copies/${accession}`, data);
      return response.data.data;
    } catch (error: any) {
      console.error('Error updating copy:', error);
      throw new Error(error.response?.data?.message || 'Failed to update copy');
    }
  },
};