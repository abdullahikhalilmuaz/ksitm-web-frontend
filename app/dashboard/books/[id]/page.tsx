"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaEdit, FaPrint, FaQrcode, FaCopy } from "react-icons/fa";
import { bookService, Book } from "@/services/book.service";

export default function ViewBookPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await bookService.getById(id);
        setBook(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBook();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout role="admin" userName="Admin User" userRole="admin">
        <div className="loading-state">Loading book details...</div>
      </DashboardLayout>
    );
  }

  if (error || !book) {
    return (
      <DashboardLayout role="admin" userName="Admin User" userRole="admin">
        <div className="error-state">
          <p>❌ {error || "Book not found"}</p>
          <Link href="/dashboard/books" className="btn-secondary">
            Back to Books
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="admin" userName="Admin User" userRole="admin">
      <div className="view-book-page">
        <div className="page-header">
          <div>
            <Link href="/dashboard/books" className="back-link">
              <FaArrowLeft /> Back to Books
            </Link>
            <h1 className="page-title">{book.title}</h1>
            <p className="page-subtitle">Book Details</p>
          </div>
          <div className="header-actions">
            <button className="btn-outline">
              <FaQrcode /> Generate QR
            </button>
            <Link
              href={`/dashboard/books/${book._id}/copies/print`}
              className="btn-outline"
            >
              <FaPrint /> Print Labels
            </Link>
            <Link
              href={`/dashboard/books/${book._id}/copies`}
              className="btn-outline"
            >
              <FaCopy /> Manage Copies
            </Link>
            <Link
              href={`/dashboard/books/edit/${book._id}`}
              className="btn-primary"
            >
              <FaEdit /> Edit Book
            </Link>
          </div>
        </div>

        <div className="book-details-grid">
          <div className="detail-section">
            <h3>Basic Information</h3>
            <div className="detail-row">
              <span className="detail-label">Title</span>
              <span className="detail-value">{book.title}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Author</span>
              <span className="detail-value">{book.author}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">ISBN</span>
              <span className="detail-value">{book.isbn || "—"}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Publisher</span>
              <span className="detail-value">{book.publisher || "—"}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Year</span>
              <span className="detail-value">{book.year || "—"}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Category</span>
              <span className="detail-value">{book.category?.name || "—"}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Description</span>
              <span className="detail-value">
                {book.description || "No description available"}
              </span>
            </div>
          </div>

          <div className="detail-section">
            <h3>Library Details</h3>
            <div className="detail-row">
              <span className="detail-label">Total Copies</span>
              <span className="detail-value">{book.totalCopies}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Available Copies</span>
              <span className="detail-value">{book.availableCopies || 0}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Shelf Location</span>
              <span className="detail-value">{book.shelfLocation || "—"}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Call Number</span>
              <span className="detail-value">{book.callNumber || "—"}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Status</span>
              <span
                className={`status-badge ${book.isActive !== false ? "active" : "inactive"}`}
              >
                {book.isActive !== false ? "Active" : "Inactive"}
              </span>
            </div>

            {book.accessionNumbers && book.accessionNumbers.length > 0 && (
              <div className="accession-section">
                <h4>Accession Numbers</h4>
                <div className="accession-list">
                  {book.accessionNumbers.map((acc, index) => (
                    <span key={index} className="accession-tag">
                      {acc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .view-book-page {
          padding: 0;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 16px;
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

        .header-actions {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
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

        .btn-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          border: 1px solid #e5e7eb;
          background: white;
          color: #6b7280;
          font-size: 14px;
          cursor: pointer;
        }

        .btn-outline:hover {
          background: #f9fafb;
          border-color: #d1d5db;
        }

        .btn-secondary {
          display: inline-flex;
          align-items: center;
          padding: 10px 20px;
          border-radius: 10px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
          border: 1px solid #e5e7eb;
          background: white;
          color: #6b7280;
          font-size: 14px;
        }

        .book-details-grid {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 24px;
        }

        .detail-section {
          background: white;
          border-radius: 12px;
          border: 1px solid #f3f4f6;
          padding: 24px;
        }

        .detail-section h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a2e;
          margin: 0 0 20px 0;
          padding-bottom: 12px;
          border-bottom: 2px solid #f3f4f6;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #f9fafb;
        }

        .detail-row:last-child {
          border-bottom: none;
        }

        .detail-label {
          font-size: 14px;
          color: #6b7280;
          font-weight: 500;
        }

        .detail-value {
          font-size: 14px;
          color: #1a1a2e;
          font-weight: 500;
          text-align: right;
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

        .accession-section {
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid #f3f4f6;
        }

        .accession-section h4 {
          font-size: 14px;
          font-weight: 600;
          color: #1a1a2e;
          margin: 0 0 12px 0;
        }

        .accession-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .accession-tag {
          background: #f3f4f6;
          padding: 4px 12px;
          border-radius: 6px;
          font-size: 12px;
          font-family: monospace;
          color: #374151;
        }

        .loading-state {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .error-state {
          text-align: center;
          padding: 60px 20px;
        }

        .error-state p {
          color: #dc2626;
          font-size: 16px;
          margin-bottom: 16px;
        }

        @media (max-width: 968px) {
          .book-details-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}
