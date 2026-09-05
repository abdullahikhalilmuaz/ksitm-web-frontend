"use client";

import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaSave } from "react-icons/fa";
import { bookService } from "@/services/book.service";

export default function AddBookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    publisher: "",
    year: "",
    category: "",
    description: "",
    totalCopies: "1",
    shelfLocation: "",
    callNumber: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await bookService.create(formData);
      router.push("/dashboard/books");
    } catch (err: any) {
      setError(err.message || "Failed to create book");
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <DashboardLayout role="admin" userName="Admin User" userRole="admin">
      <div className="add-book-page">
        <div className="page-header">
          <div>
            <Link href="/dashboard/books" className="back-link">
              <FaArrowLeft /> Back to Books
            </Link>
            <h1 className="page-title">Add New Book</h1>
            <p className="page-subtitle">
              Enter book details to add to the library
            </p>
          </div>
        </div>

        {error && (
          <div className="error-banner">
            <p>❌ {error}</p>
            <button onClick={() => setError("")}>Dismiss</button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="book-form">
          <div className="form-grid">
            <div className="form-section">
              <h3>Basic Information</h3>

              <div className="form-group">
                <label>Book Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter book title"
                  required
                />
              </div>

              <div className="form-group">
                <label>Author *</label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>ISBN</label>
                  <input
                    type="text"
                    name="isbn"
                    value={formData.isbn}
                    onChange={handleChange}
                    placeholder="9780262033848"
                  />
                </div>
                <div className="form-group">
                  <label>Year</label>
                  <input
                    type="number"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="2024"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Publisher</label>
                <input
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  placeholder="Enter publisher name"
                />
              </div>

              <div className="form-group">
                <label>Category *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Engineering">Engineering</option>
                  <option value="Management">Management</option>
                  <option value="Sciences">Sciences</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter book description"
                  rows={4}
                />
              </div>
            </div>

            <div className="form-section">
              <h3>Library Details</h3>

              <div className="form-group">
                <label>Total Copies *</label>
                <input
                  type="number"
                  name="totalCopies"
                  value={formData.totalCopies}
                  onChange={handleChange}
                  min="1"
                  required
                />
                <small>Each copy will get a unique accession number</small>
              </div>

              <div className="form-group">
                <label>Shelf Location</label>
                <input
                  type="text"
                  name="shelfLocation"
                  value={formData.shelfLocation}
                  onChange={handleChange}
                  placeholder="e.g., CS-F1-B3-R4"
                />
              </div>

              <div className="form-group">
                <label>Call Number</label>
                <input
                  type="text"
                  name="callNumber"
                  value={formData.callNumber}
                  onChange={handleChange}
                  placeholder="e.g., 005.1 COR"
                />
              </div>

              <div className="form-actions">
                <Link href="/dashboard/books" className="btn-secondary">
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading}
                >
                  <FaSave />
                  {loading ? "Saving..." : "Save Book"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        .add-book-page {
          padding: 0;
        }

        .page-header {
          margin-bottom: 24px;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          text-decoration: none;
          font-size: 14px;
          margin-bottom: 8px;
          transition: color 0.2s;
        }

        .back-link:hover {
          color: #4b2e83;
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

        .error-banner {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .error-banner p {
          color: #dc2626;
          margin: 0;
        }

        .error-banner button {
          background: none;
          border: none;
          color: #6b7280;
          cursor: pointer;
          font-weight: 600;
        }

        .book-form {
          background: white;
          border-radius: 12px;
          border: 1px solid #f3f4f6;
          padding: 24px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
        }

        .form-section h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a2e;
          margin: 0 0 20px 0;
          padding-bottom: 12px;
          border-bottom: 2px solid #f3f4f6;
        }

        .form-group {
          margin-bottom: 16px;
        }

        .form-group label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 6px;
        }

        .form-group small {
          display: block;
          font-size: 12px;
          color: #6b7280;
          margin-top: 4px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          transition: border-color 0.2s;
          font-family: inherit;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #4b2e83;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-actions {
          display: flex;
          gap: 12px;
          margin-top: 24px;
          padding-top: 20px;
          border-top: 1px solid #f3f4f6;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #4b2e83, #6d28d9);
          color: white;
          padding: 10px 24px;
          border-radius: 10px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          border: none;
          cursor: pointer;
          font-size: 14px;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(75, 46, 131, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          padding: 10px 24px;
          border-radius: 10px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          border: 1px solid #e5e7eb;
          background: white;
          color: #6b7280;
          font-size: 14px;
        }

        .btn-secondary:hover {
          background: #f9fafb;
          border-color: #d1d5db;
        }

        @media (max-width: 968px) {
          .form-grid {
            grid-template-columns: 1fr;
          }

          .form-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}
