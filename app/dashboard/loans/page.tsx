"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  FaSearch,
  FaPlus,
  FaTimes,
  FaUndo,
  FaSync,
  FaBook,
  FaUser,
  FaCalendarAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function LoansPage() {
  const [loans, setLoans] = useState([]);
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    accessionNumber: "",
    dueDate: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [loansRes, usersRes, booksRes] = await Promise.all([
        axios.get(`${API_URL}/loans`, { headers }),
        axios.get(`${API_URL}/users`, { headers }),
        axios.get(`${API_URL}/books`, { headers }),
      ]);

      setLoans(loansRes.data.data);
      setUsers(usersRes.data.data);
      setBooks(booksRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleIssue = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/loans`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowModal(false);
      setFormData({ userId: "", accessionNumber: "", dueDate: "" });
      fetchData();
      alert("Book issued successfully!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to issue book");
    } finally {
      setSubmitting(false);
    }
  };

  const handleReturn = async (loanId: string) => {
    if (!confirm("Return this book?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/loans/${loanId}/return`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchData();
      alert("Book returned successfully!");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to return");
    }
  };

  const handleRenew = async (loanId: string) => {
    if (!confirm("Renew this loan (extend 14 days)?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_URL}/loans/${loanId}/renew`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchData();
      alert("Loan renewed! Due date extended by 14 days.");
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to renew");
    }
  };

  const getAccessionNumbers = () => {
    const allAccessions: string[] = [];
    books.forEach((book: any) => {
      if (book.accessionNumbers) {
        allAccessions.push(...book.accessionNumbers);
      }
    });
    return allAccessions;
  };

  const filteredLoans = loans.filter((loan: any) => {
    const searchLower = search.toLowerCase();
    return (
      loan.user?.name?.toLowerCase().includes(searchLower) ||
      loan.book?.title?.toLowerCase().includes(searchLower) ||
      loan.accessionNumber?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <DashboardLayout role="admin" userName="Admin User" userRole="admin">
      <div className="page">
        {/* Header */}
        <div className="page-header">
          <h1 className="page-title">Loans Management</h1>
          <button className="btn-primary" onClick={() => setShowModal(true)}>
            <FaPlus /> Issue Book
          </button>
        </div>

        {/* Search */}
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search loans..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        {/* Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Student</th>
                <th>Book</th>
                <th>Accession</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Fine</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLoans.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    style={{
                      textAlign: "center",
                      padding: "40px",
                      color: "#6b7280",
                    }}
                  >
                    No loans found. Issue a book!
                  </td>
                </tr>
              ) : (
                filteredLoans.map((loan: any) => (
                  <tr key={loan._id}>
                    <td>
                      <div className="cell-with-icon">
                        <FaUser className="cell-icon" />
                        {loan.user?.name || "Unknown"}
                      </div>
                    </td>
                    <td>
                      <div className="cell-with-icon">
                        <FaBook className="cell-icon" />
                        {loan.book?.title || "Unknown"}
                      </div>
                    </td>
                    <td className="accession">{loan.accessionNumber}</td>
                    <td>
                      <div className="cell-with-icon">
                        <FaCalendarAlt className="cell-icon" />
                        {new Date(loan.issueDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <div className="cell-with-icon">
                        <FaCalendarAlt className="cell-icon" />
                        {new Date(loan.dueDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${loan.status}`}>
                        {loan.status}
                      </span>
                    </td>
                    <td>
                      {loan.fine > 0 ? (
                        <div className="cell-with-icon fine">
                          <FaMoneyBillWave className="cell-icon" />₦{loan.fine}
                        </div>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td>
                      <div className="action-group">
                        {loan.status === "active" && (
                          <>
                            <button
                              className="action-btn return"
                              onClick={() => handleReturn(loan._id)}
                            >
                              <FaUndo /> Return
                            </button>
                            {!loan.renewed && (
                              <button
                                className="action-btn renew"
                                onClick={() => handleRenew(loan._id)}
                              >
                                <FaSync /> Renew
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Issue Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Issue Book</h2>
              <button className="close-btn" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleIssue}>
              <div className="form-group">
                <label>Student *</label>
                <select
                  required
                  value={formData.userId}
                  onChange={(e) =>
                    setFormData({ ...formData, userId: e.target.value })
                  }
                >
                  <option value="">Select student</option>
                  {users.map((user: any) => (
                    <option key={user._id} value={user._id}>
                      {user.name} - {user.libraryId}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Accession Number *</label>
                <select
                  required
                  value={formData.accessionNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      accessionNumber: e.target.value,
                    })
                  }
                >
                  <option value="">Select accession number</option>
                  {getAccessionNumbers().map((acc) => (
                    <option key={acc} value={acc}>
                      {acc}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Due Date *</label>
                <input
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={submitting}
                >
                  {submitting ? "Issuing..." : "Issue Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .page {
          padding: 0;
        }
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .page-title {
          font-size: 24px;
          font-weight: 700;
          margin: 0;
        }
        .btn-primary {
          background: #4b2e83;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 600;
        }
        .btn-primary:hover {
          background: #6d28d9;
        }
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .btn-secondary {
          background: #e5e7eb;
          color: #374151;
          padding: 10px 20px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }
        .btn-secondary:hover {
          background: #d1d5db;
        }
        .search-box {
          position: relative;
          margin-bottom: 20px;
          max-width: 400px;
        }
        .search-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
        }
        .search-input {
          width: 100%;
          padding: 10px 16px 10px 42px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
        }
        .search-input:focus {
          outline: none;
          border-color: #4b2e83;
        }
        .table-container {
          background: white;
          border-radius: 12px;
          border: 1px solid #f3f4f6;
          overflow-x: auto;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 700px;
        }
        th {
          padding: 12px 16px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #6b7280;
          background: #f9fafb;
          border-bottom: 2px solid #e5e7eb;
        }
        td {
          padding: 12px 16px;
          border-bottom: 1px solid #f3f4f6;
          font-size: 14px;
        }
        .accession {
          font-family: monospace;
          font-size: 13px;
        }
        .cell-with-icon {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .cell-icon {
          font-size: 14px;
          color: #6b7280;
        }
        .fine {
          color: #dc2626;
          font-weight: 600;
        }
        .status-badge {
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }
        .status-badge.active {
          background: #dbeafe;
          color: #2563eb;
        }
        .status-badge.returned {
          background: #d1fae5;
          color: #059669;
        }
        .status-badge.overdue {
          background: #fee2e2;
          color: #dc2626;
        }
        .action-group {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .action-btn {
          padding: 6px 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 10px;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .action-btn.return {
          background: #d1fae5;
          color: #059669;
        }
        .action-btn.return:hover {
          background: #a7f3d0;
        }
        .action-btn.renew {
          background: #fef3c7;
          color: #d97706;
        }
        .action-btn.renew:hover {
          background: #fde68a;
        }

        /* Modal */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }
        .modal {
          background: white;
          border-radius: 16px;
          padding: 32px;
          max-width: 500px;
          width: 90%;
          max-height: 90vh;
          overflow-y: auto;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .modal-header h2 {
          margin: 0;
          font-size: 20px;
        }
        .close-btn {
          background: none;
          border: none;
          font-size: 20px;
          cursor: pointer;
          color: #6b7280;
        }
        .form-group {
          margin-bottom: 16px;
        }
        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 4px;
        }
        .form-group select,
        .form-group input {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
        }
        .form-group select:focus,
        .form-group input:focus {
          outline: none;
          border-color: #4b2e83;
        }
        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #f3f4f6;
        }
      `}</style>
    </DashboardLayout>
  );
}
