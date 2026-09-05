"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaEye,
  FaSync,
} from "react-icons/fa";
import Link from "next/link";
import { bookService, Book } from "@/services/book.service";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch books from API
  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await bookService.getAll();
      setBooks(data);
    } catch (err: any) {
      console.error("Error fetching books:", err);
      setError(err.message || "Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Delete book
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      await bookService.delete(id);
      setBooks(books.filter((book) => book._id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Filter books based on search
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      (book.isbn && book.isbn.includes(search)),
  );

  return (
    <DashboardLayout role="admin" userName="Admin User" userRole="admin">
      <div className="books-page">
        {/* Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Books Management</h1>
            <p className="page-subtitle">Manage your library collection</p>
          </div>
          <div className="header-actions">
            <button
              onClick={fetchBooks}
              className="btn-refresh"
              disabled={loading}
            >
              <FaSync className={loading ? "spinning" : ""} />
            </button>
            <Link href="/dashboard/books/add" className="btn-primary">
              <FaPlus /> Add New Book
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="search-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
          <div className="filter-options">
            <select className="filter-select">
              <option value="">All Categories</option>
              <option value="Computer Science">Computer Science</option>
              <option value="Engineering">Engineering</option>
              <option value="Management">Management</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading books...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="error-state">
            <p>⚠️ {error}</p>
            <button onClick={fetchBooks} className="btn-retry">
              Retry
            </button>
          </div>
        )}

        {/* Books Table */}
        {!loading && !error && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>ISBN</th>
                  <th>Category</th>
                  <th>Copies</th>
                  <th>Available</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => (
                    <tr key={book._id}>
                      <td>
                        <div className="book-title">
                          <span className="book-icon">📖</span>
                          <span>{book.title}</span>
                        </div>
                      </td>
                      <td>{book.author}</td>
                      <td className="isbn">{book.isbn || "—"}</td>
                      <td>{book.category?.name || "—"}</td>
                      <td className="text-center">{book.totalCopies}</td>
                      <td className="text-center">
                        <span
                          className={`available-badge ${parseInt(book.availableCopies || "0") > 0 ? "available" : "unavailable"}`}
                        >
                          {book.availableCopies || 0}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status-badge ${book.isActive !== false ? "active" : "inactive"}`}
                        >
                          {book.isActive !== false ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <Link
                            href={`/dashboard/books/${book._id}`}
                            className="action-btn view"
                          >
                            <FaEye />
                          </Link>
                          <Link
                            href={`/dashboard/books/edit/${book._id}`}
                            className="action-btn edit"
                          >
                            <FaEdit />
                          </Link>
                          <button
                            onClick={() => handleDelete(book._id!)}
                            className="action-btn delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="empty-state">
                      <p>
                        No books found. Try adjusting your search or add a new
                        book.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && !error && (
          <div className="pagination">
            <span className="pagination-info">
              Showing {filteredBooks.length} of {books.length} books
            </span>
          </div>
        )}
      </div>

      <style jsx>{`
        .books-page {
          padding: 0;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
        }

        .page-title {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 4px 0;
        }

        .page-subtitle {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        .header-actions {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .btn-refresh {
          background: none;
          border: 1px solid #e5e7eb;
          padding: 10px 12px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s;
          color: #6b7280;
        }

        .btn-refresh:hover {
          border-color: #4b2e83;
          color: #4b2e83;
        }

        .spinning {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #4b2e83, #6d28d9);
          color: white;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
          font-size: 14px;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(75, 46, 131, 0.3);
        }

        .search-section {
          display: flex;
          gap: 16px;
          margin-bottom: 24px;
          flex-wrap: wrap;
        }

        .search-box {
          flex: 1;
          min-width: 200px;
          position: relative;
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
          background: white;
          transition: border-color 0.2s;
        }

        .search-input:focus {
          outline: none;
          border-color: #4b2e83;
        }

        .filter-select {
          padding: 10px 16px;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          background: white;
          color: #1a1a2e;
          cursor: pointer;
        }

        .table-container {
          background: white;
          border-radius: 12px;
          border: 1px solid #f3f4f6;
          overflow-x: auto;
          margin-bottom: 20px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 700px;
        }

        thead {
          background: #f9fafb;
        }

        th {
          padding: 14px 16px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #6b7280;
          letter-spacing: 0.5px;
        }

        td {
          padding: 14px 16px;
          font-size: 14px;
          border-bottom: 1px solid #f3f4f6;
          color: #1a1a2e;
        }

        tr:hover td {
          background: #f9fafb;
        }

        .book-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .book-icon {
          font-size: 20px;
        }

        .isbn {
          font-family: monospace;
          font-size: 13px;
          color: #6b7280;
        }

        .text-center {
          text-align: center;
        }

        .available-badge {
          display: inline-block;
          padding: 2px 10px;
          border-radius: 50px;
          font-size: 13px;
          font-weight: 600;
        }

        .available-badge.available {
          background: #d1fae5;
          color: #059669;
        }

        .available-badge.unavailable {
          background: #fee2e2;
          color: #dc2626;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
        }

        .status-badge.active {
          background: #dbeafe;
          color: #2563eb;
        }

        .status-badge.inactive {
          background: #f3f4f6;
          color: #6b7280;
        }

        .action-buttons {
          display: flex;
          gap: 6px;
        }

        .action-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          font-size: 14px;
          text-decoration: none;
        }

        .action-btn.view {
          background: #dbeafe;
          color: #2563eb;
        }

        .action-btn.view:hover {
          background: #bfdbfe;
        }

        .action-btn.edit {
          background: #d1fae5;
          color: #059669;
        }

        .action-btn.edit:hover {
          background: #a7f3d0;
        }

        .action-btn.delete {
          background: #fee2e2;
          color: #dc2626;
        }

        .action-btn.delete:hover {
          background: #fecaca;
        }

        .empty-state {
          text-align: center;
          padding: 40px;
          color: #6b7280;
        }

        .empty-state p {
          margin: 0;
          font-size: 16px;
        }

        .loading-state {
          text-align: center;
          padding: 60px 20px;
          background: white;
          border-radius: 12px;
          border: 1px solid #f3f4f6;
        }

        .loading-state p {
          color: #6b7280;
          margin: 16px 0 0 0;
        }

        .spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #f3f4f6;
          border-top: 3px solid #4b2e83;
          border-radius: 50%;
          margin: 0 auto;
          animation: spin 1s linear infinite;
        }

        .error-state {
          text-align: center;
          padding: 40px 20px;
          background: #fef2f2;
          border-radius: 12px;
          border: 1px solid #fecaca;
        }

        .error-state p {
          color: #dc2626;
          margin: 0 0 16px 0;
          font-size: 16px;
        }

        .btn-retry {
          padding: 8px 24px;
          background: #dc2626;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
        }

        .btn-retry:hover {
          background: #b91c1c;
        }

        .pagination {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
        }

        .pagination-info {
          font-size: 14px;
          color: #6b7280;
        }
      `}</style>
    </DashboardLayout>
  );
}
