
export const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
export const api = {
  get: async (endpoint: string) => { const res = await fetch(`${API_BASE}${endpoint}`); return res.json(); },
  post: async (endpoint: string, data: any) => { const res = await fetch(`${API_BASE}${endpoint}`, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } }); return res.json(); }
};
