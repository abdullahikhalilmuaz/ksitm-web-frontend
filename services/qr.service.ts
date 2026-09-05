// services/qr.service.ts
import axios from "axios";

const API_URL = "http://localhost:5000/api";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
};

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

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

export interface QRData {
  accessionNumber: string;
  qrData: any;
  qrUrl: string;
  generatedAt: string;
}

export interface QRScanResult {
  book: {
    id: string;
    title: string;
    author: string;
    isbn: string;
    category: any;
    shelfLocation: string;
    callNumber: string;
  };
  copy: {
    accessionNumber: string;
    status: "available" | "borrowed";
    qrData: any;
  };
  availability: {
    totalCopies: number;
    availableCopies: number;
  };
}

export const qrService = {
  // Get QR data for a copy
  getQR: async (accession: string): Promise<QRData> => {
    try {
      const response = await api.get(`/qr/${accession}`);
      return response.data.data;
    } catch (error: any) {
      console.error("Error fetching QR:", error);
      throw new Error(
        error.response?.data?.message || "Failed to fetch QR code",
      );
    }
  },

  // Scan QR and get book data
  scanQR: async (accession: string): Promise<QRScanResult> => {
    try {
      const response = await api.get(`/qr/scan/${accession}`);
      return response.data.data;
    } catch (error: any) {
      console.error("Error scanning QR:", error);
      throw new Error(
        error.response?.data?.message || "Failed to scan QR code",
      );
    }
  },

  // Generate QR URL for printing
  getQRUrl: (accession: string): string => {
    return `${API_URL}/qr/scan/${accession}`;
  },
};
