import { api } from "./api";

export const loansService = {
  getActive: () => api.get("/loans/active"),
  borrow: (bookId: string, studentId: string) =>
    api.post("/loans", { bookId, studentId }),
  return: (loanId: string) => api.post(`/loans/${loanId}/return`, {}),
  renew: (loanId: string) => api.post(`/loans/${loanId}/renew`, {}),
};
