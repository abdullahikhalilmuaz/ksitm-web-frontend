import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem("token");
};

// Create axios instance with auth header
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
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
  (error) => Promise.reject(error),
);

export interface Book {
  _id?: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  year: string;
  category: {
    _id?: string;
    name: string;
  };
  description: string;
  totalCopies: number;
  availableCopies?: number;
  shelfLocation: string;
  callNumber: string;
  accessionNumbers?: string[];
  isActive?: boolean;
}

export const bookService = {
  // Get all books
  getAll: async (): Promise<Book[]> => {
    try {
      const response = await api.get("/books");
      return response.data.data || response.data;
    } catch (error: any) {
      console.error("Error fetching books:", error);
      throw new Error(error.response?.data?.message || "Failed to fetch books");
    }
  },

  // Get book by ID
  getById: async (id: string): Promise<Book> => {
    try {
      const response = await api.get(`/books/${id}`);
      return response.data.data || response.data;
    } catch (error: any) {
      console.error("Error fetching book:", error);
      throw new Error(error.response?.data?.message || "Failed to fetch book");
    }
  },

  // Create new book
  create: async (bookData: any): Promise<Book> => {
    try {
      const response = await api.post("/books", bookData);
      return response.data.data || response.data;
    } catch (error: any) {
      console.error("Error creating book:", error);
      throw new Error(error.response?.data?.message || "Failed to create book");
    }
  },

  // Update book
  update: async (id: string, bookData: any): Promise<Book> => {
    try {
      const response = await api.put(`/books/${id}`, bookData);
      return response.data.data || response.data;
    } catch (error: any) {
      console.error("Error updating book:", error);
      throw new Error(error.response?.data?.message || "Failed to update book");
    }
  },

  // Delete book
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/books/${id}`);
    } catch (error: any) {
      console.error("Error deleting book:", error);
      throw new Error(error.response?.data?.message || "Failed to delete book");
    }
  },
};
