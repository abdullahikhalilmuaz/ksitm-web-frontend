"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaPrint, FaCheckSquare, FaSquare } from "react-icons/fa";
import { bookService } from "@/services/book.service";
import { copyService, BookCopy } from "@/services/copy.service";
import Label from "@/components/ui/Label"; // ← ADD THIS IMPORT

export default function PrintLabelsPage() {
  const params = useParams();
  const bookId = params?.id as string;

  const [book, setBook] = useState<any>(null);
  const [copies, setCopies] = useState<BookCopy[]>([]);
  const [selectedCopies, setSelectedCopies] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await bookService.getById(bookId);
        setBook(bookData);

        const copiesData = await copyService.getCopies(bookId);
        setCopies(copiesData);
        setSelectedCopies(copiesData.map((c) => c.accessionNumber));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (bookId) fetchData();
  }, [bookId]);

  const toggleSelect = (accession: string) => {
    setSelectedCopies((prev) =>
      prev.includes(accession)
        ? prev.filter((a) => a !== accession)
        : [...prev, accession],
    );
  };

  const toggleSelectAll = () => {
    if (selectedCopies.length === copies.length) {
      setSelectedCopies([]);
    } else {
      setSelectedCopies(copies.map((c) => c.accessionNumber));
    }
  };

  const handlePrint = () => {
    // Open print page in new tab
    const url = `/dashboard/books/${bookId}/copies/print-page`;
    window.open(url, "_blank", "width=800,height=600");
  };

  const selectedCopyData = copies.filter((c) =>
    selectedCopies.includes(c.accessionNumber),
  );

  if (loading) {
    return (
      <DashboardLayout role="admin" userName="Admin User" userRole="admin">
        <div className="loading-state">Loading labels...</div>
      </DashboardLayout>
    );
  }

  if (error || !book) {
    return (
      <DashboardLayout role="admin" userName="Admin User" userRole="admin">
        <div className="error-state">
          <p>❌ {error || "Book not found"}</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="admin" userName="Admin User" userRole="admin">
      <div className="print-labels-page">
        <div className="page-header">
          <div>
            <Link
              href={`/dashboard/books/${bookId}/copies`}
              className="back-link"
            >
              <FaArrowLeft /> Back to Copies
            </Link>
            <h1 className="page-title">Print Labels</h1>
            <p className="page-subtitle">
              {book.title} - 3-inch labels (fits on book spines)
            </p>
          </div>
          <div className="header-actions">
            <button
              onClick={handlePrint}
              className="btn-primary"
              disabled={selectedCopies.length === 0}
            >
              <FaPrint /> Print {selectedCopies.length} Labels
            </button>
          </div>
        </div>

        <div className="selection-section">
          <div className="selection-header">
            <button onClick={toggleSelectAll} className="select-all-btn">
              {selectedCopies.length === copies.length ? (
                <FaCheckSquare />
              ) : (
                <FaSquare />
              )}
              {selectedCopies.length === copies.length
                ? "Deselect All"
                : "Select All"}
            </button>
            <span className="selection-count">
              {selectedCopies.length} of {copies.length} selected
            </span>
          </div>

          <div className="copies-grid">
            {copies.map((copy) => (
              <div
                key={copy.accessionNumber}
                className={`copy-card ${
                  selectedCopies.includes(copy.accessionNumber)
                    ? "selected"
                    : ""
                }`}
                onClick={() => toggleSelect(copy.accessionNumber)}
              >
                <div className="copy-card-content">
                  <div className="copy-icon">📄</div>
                  <div className="copy-info">
                    <span className="copy-accession">
                      {copy.accessionNumber}
                    </span>
                    <span className="copy-status">{copy.status}</span>
                  </div>
                  {selectedCopies.includes(copy.accessionNumber) && (
                    <span className="check-mark">✅</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="labels-preview">
          <h3>Labels Preview (3 inches each)</h3>
          <div className="labels-grid" id="labels-container">
            {selectedCopyData.map((copy) => (
              <div className="label-wrapper" key={copy.accessionNumber}>
                <Label
                  title={book.title}
                  author={book.author}
                  accessionNumber={copy.accessionNumber}
                  callNumber={book.callNumber || "N/A"}
                  shelfLocation={book.shelfLocation || "N/A"}
                  qrValue={copy.accessionNumber}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .print-labels-page {
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

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(75, 46, 131, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .selection-section {
          background: white;
          border-radius: 12px;
          border: 1px solid #f3f4f6;
          padding: 20px;
          margin-bottom: 24px;
        }

        .selection-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .select-all-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #4b2e83;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        }

        .selection-count {
          font-size: 14px;
          color: #6b7280;
        }

        .copies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 12px;
        }

        .copy-card {
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .copy-card:hover {
          border-color: #4b2e83;
        }

        .copy-card.selected {
          border-color: #4b2e83;
          background: #f5f3ff;
        }

        .copy-card-content {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .copy-icon {
          font-size: 20px;
        }

        .copy-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .copy-accession {
          font-size: 13px;
          font-weight: 600;
          color: #1a1a2e;
          font-family: monospace;
        }

        .copy-status {
          font-size: 11px;
          color: #6b7280;
          text-transform: capitalize;
        }

        .check-mark {
          font-size: 18px;
        }

        .labels-preview {
          margin-top: 24px;
        }

        .labels-preview h3 {
          font-size: 16px;
          font-weight: 600;
          color: #1a1a2e;
          margin: 0 0 16px 0;
        }

        .labels-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 20px;
          justify-items: center;
        }

        .label-wrapper {
          display: inline-block;
        }

        .loading-state {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .error-state {
          text-align: center;
          padding: 60px 20px;
          color: #dc2626;
        }
      `}</style>
    </DashboardLayout>
  );
}
