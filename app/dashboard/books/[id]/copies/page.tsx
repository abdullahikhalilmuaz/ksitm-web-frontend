"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  FaArrowLeft,
  FaPlus,
  FaTrash,
  FaEdit,
  FaQrcode,
  FaPrint,
  FaCopy,
  FaSearch,
} from "react-icons/fa";
import { bookService } from "@/services/book.service";
import { copyService, BookCopy } from "@/services/copy.service";
import { qrService } from "@/services/qr.service";
import QRCode from "@/components/ui/QRCode";

export default function BookCopiesPage() {
  const params = useParams();
  const router = useRouter();
  const bookId = params?.id as string;

  const [copies, setCopies] = useState<BookCopy[]>([]);
  const [bookTitle, setBookTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkCount, setBulkCount] = useState(5);
  const [showQRModal, setShowQRModal] = useState(false);
  const [selectedAccession, setSelectedAccession] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api" ||
    "https://ksitm-backend-api.onrender.com";

  // Fetch book and copies
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get book details
        const book = await bookService.getById(bookId);
        setBookTitle(book.title);

        // Get copies
        const copiesData = await copyService.getCopies(bookId);
        setCopies(copiesData);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (bookId) fetchData();
  }, [bookId]);

  // Add single copy
  const handleAddCopy = async () => {
    try {
      const result = await copyService.addCopy(bookId);
      const updatedCopies = await copyService.getCopies(bookId);
      setCopies(updatedCopies);
      alert(`Copy added successfully: ${result.accessionNumber}`);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Bulk add copies
  const handleBulkAdd = async () => {
    try {
      const result = await copyService.addBulkCopies(bookId, bulkCount);
      const updatedCopies = await copyService.getCopies(bookId);
      setCopies(updatedCopies);
      alert(`${bulkCount} copies added successfully!`);
      setShowBulkModal(false);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Delete copy
  const handleDelete = async (accession: string) => {
    if (!confirm(`Delete copy ${accession}?`)) return;
    try {
      await copyService.deleteCopy(bookId, accession);
      const updatedCopies = await copyService.getCopies(bookId);
      setCopies(updatedCopies);
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Open QR Modal
  const handleOpenQR = async (accession: string) => {
    setSelectedAccession(accession);
    try {
      const qrData = await qrService.getQR(accession);
      setQrUrl(qrData.qrUrl || `${API_URL}/qr/scan/${accession}`);
      setShowQRModal(true);
    } catch (err: any) {
      alert(err.message || "Failed to load QR code");
    }
  };

  // Filter copies
  const filteredCopies = copies.filter(
    (copy) =>
      copy.accessionNumber.toLowerCase().includes(search.toLowerCase()) ||
      copy.title.toLowerCase().includes(search.toLowerCase()),
  );

  // Count statuses
  const statusCounts = copies.reduce(
    (acc, copy) => {
      acc[copy.status] = (acc[copy.status] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <DashboardLayout role="admin" userName="Admin User" userRole="admin">
      <div className="copies-page">
        {/* Header */}
        <div className="page-header">
          <div>
            <Link href={`/dashboard/books/${bookId}`} className="back-link">
              <FaArrowLeft /> Back to Book
            </Link>
            <h1 className="page-title">Book Copies</h1>
            <p className="page-subtitle">
              {bookTitle} - Manage individual copies
            </p>
          </div>
          <div className="header-actions">
            <Link
              href={`/dashboard/books/${bookId}/copies/print`}
              className="btn-outline"
            >
              <FaPrint /> Print Labels
            </Link>
            <button
              onClick={() => setShowBulkModal(true)}
              className="btn-outline"
            >
              <FaCopy /> Bulk Add
            </button>
            <button onClick={handleAddCopy} className="btn-primary">
              <FaPlus /> Add Copy
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-box">
            <span className="stat-value">{copies.length}</span>
            <span className="stat-label">Total Copies</span>
          </div>
          <div className="stat-box">
            <span className="stat-value text-green">
              {statusCounts.available || 0}
            </span>
            <span className="stat-label">Available</span>
          </div>
          <div className="stat-box">
            <span className="stat-value text-blue">
              {statusCounts.borrowed || 0}
            </span>
            <span className="stat-label">Borrowed</span>
          </div>
          <div className="stat-box">
            <span className="stat-value text-yellow">
              {statusCounts.reserved || 0}
            </span>
            <span className="stat-label">Reserved</span>
          </div>
          <div className="stat-box">
            <span className="stat-value text-red">
              {statusCounts.lost || 0}
            </span>
            <span className="stat-label">Lost</span>
          </div>
        </div>

        {/* Search */}
        <div className="search-section">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by accession number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="error-state">
            <p>❌ {error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && <div className="loading-state">Loading copies...</div>}

        {/* Copies Table */}
        {!loading && !error && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Accession Number</th>
                  <th>Status</th>
                  <th>Shelf Location</th>
                  <th>Call Number</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCopies.length > 0 ? (
                  filteredCopies.map((copy, index) => (
                    <tr key={copy.accessionNumber}>
                      <td>{index + 1}</td>
                      <td className="accession">{copy.accessionNumber}</td>
                      <td>
                        <span className={`status-badge ${copy.status}`}>
                          {copy.status.charAt(0).toUpperCase() +
                            copy.status.slice(1)}
                        </span>
                      </td>
                      <td>{copy.shelfLocation || "—"}</td>
                      <td>{copy.callNumber || "—"}</td>
                      <td>
                        <div className="action-buttons">
                          <button
                            onClick={() => handleOpenQR(copy.accessionNumber)}
                            className="action-btn qr"
                            title="Generate QR"
                          >
                            <FaQrcode />
                          </button>
                          <Link
                            href={`/dashboard/books/${bookId}/copies/print`}
                            className="action-btn print"
                            title="Print Label"
                          >
                            <FaPrint />
                          </Link>
                          <button className="action-btn edit" title="Edit">
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(copy.accessionNumber)}
                            className="action-btn delete"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="empty-state">
                      <p>No copies found. Add your first copy!</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Bulk Add Modal */}
      {showBulkModal && (
        <div className="modal-overlay" onClick={() => setShowBulkModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Bulk Add Copies</h2>
            <p>How many copies do you want to add?</p>
            <div className="modal-body">
              <input
                type="number"
                value={bulkCount}
                onChange={(e) => setBulkCount(parseInt(e.target.value) || 1)}
                min="1"
                max="50"
              />
              <small>
                Each copy will get a unique accession number and QR code
              </small>
            </div>
            <div className="modal-actions">
              <button
                onClick={() => setShowBulkModal(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button onClick={handleBulkAdd} className="btn-primary">
                Add {bulkCount} Copies
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Modal */}
      {showQRModal && (
        <div className="modal-overlay" onClick={() => setShowQRModal(false)}>
          <div className="modal qr-modal" onClick={(e) => e.stopPropagation()}>
            <h2>QR Code</h2>
            <p>Accession: {selectedAccession}</p>
            <div className="qr-display">
              <QRCode value={qrUrl} size={200} />
            </div>
            <div className="qr-info">
              <p className="qr-hint">Scan this QR to view book details</p>
              <p className="qr-url">{qrUrl}</p>
            </div>
            <div className="modal-actions">
              <button
                onClick={() => {
                  const canvas = document.querySelector("canvas");
                  if (canvas) {
                    const link = document.createElement("a");
                    link.download = `qr-${selectedAccession}.png`;
                    link.href = canvas.toDataURL();
                    link.click();
                  }
                }}
                className="btn-primary"
              >
                Download QR
              </button>
              <button
                onClick={() => setShowQRModal(false)}
                className="btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .copies-page {
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
          padding: 8px 20px;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
          background: white;
          color: #6b7280;
          cursor: pointer;
          font-weight: 500;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 16px;
          margin-bottom: 24px;
        }

        .stat-box {
          background: white;
          border-radius: 10px;
          padding: 16px;
          border: 1px solid #f3f4f6;
          text-align: center;
        }

        .stat-value {
          display: block;
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
        }

        .stat-value.text-green {
          color: #059669;
        }
        .stat-value.text-blue {
          color: #2563eb;
        }
        .stat-value.text-yellow {
          color: #d97706;
        }
        .stat-value.text-red {
          color: #dc2626;
        }

        .stat-label {
          font-size: 13px;
          color: #6b7280;
          margin-top: 4px;
        }

        .search-section {
          margin-bottom: 24px;
        }

        .search-box {
          position: relative;
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
          background: white;
          transition: border-color 0.2s;
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
          min-width: 600px;
        }

        thead {
          background: #f9fafb;
        }

        th {
          padding: 12px 16px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #6b7280;
          letter-spacing: 0.5px;
        }

        td {
          padding: 12px 16px;
          font-size: 14px;
          border-bottom: 1px solid #f3f4f6;
          color: #1a1a2e;
        }

        tr:hover td {
          background: #f9fafb;
        }

        .accession {
          font-family: monospace;
          font-weight: 500;
        }

        .status-badge {
          display: inline-block;
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
          text-transform: capitalize;
        }

        .status-badge.available {
          background: #d1fae5;
          color: #059669;
        }

        .status-badge.borrowed {
          background: #dbeafe;
          color: #2563eb;
        }

        .status-badge.reserved {
          background: #fef3c7;
          color: #d97706;
        }

        .status-badge.lost {
          background: #fee2e2;
          color: #dc2626;
        }

        .status-badge.damaged {
          background: #fef3c7;
          color: #d97706;
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
          font-size: 13px;
          text-decoration: none;
        }

        .action-btn.qr {
          background: #dbeafe;
          color: #2563eb;
        }
        .action-btn.qr:hover {
          background: #bfdbfe;
        }

        .action-btn.print {
          background: #d1fae5;
          color: #059669;
        }
        .action-btn.print:hover {
          background: #a7f3d0;
        }

        .action-btn.edit {
          background: #fef3c7;
          color: #d97706;
        }
        .action-btn.edit:hover {
          background: #fde68a;
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

        .loading-state {
          text-align: center;
          padding: 40px;
          color: #6b7280;
        }

        .error-state {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 12px 16px;
          margin-bottom: 16px;
          color: #dc2626;
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
          max-width: 400px;
          width: 90%;
        }

        .modal h2 {
          font-size: 20px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 8px 0;
        }

        .modal p {
          color: #6b7280;
          margin: 0 0 20px 0;
        }

        .modal-body {
          margin-bottom: 20px;
        }

        .modal-body input {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          font-size: 16px;
        }

        .modal-body small {
          display: block;
          color: #6b7280;
          font-size: 12px;
          margin-top: 4px;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
        }

        .qr-modal {
          max-width: 400px;
          text-align: center;
        }

        .qr-display {
          display: flex;
          justify-content: center;
          padding: 16px 0;
        }

        .qr-info {
          margin-bottom: 16px;
        }

        .qr-hint {
          font-size: 13px;
          color: #6b7280;
          margin: 0 0 4px 0;
        }

        .qr-url {
          font-size: 11px;
          color: #9ca3af;
          word-break: break-all;
          margin: 0;
          font-family: monospace;
        }

        @media (max-width: 768px) {
          .stats-row {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 480px) {
          .stats-row {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </DashboardLayout>
  );
}
