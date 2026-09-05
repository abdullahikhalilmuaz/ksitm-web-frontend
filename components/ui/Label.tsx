"use client";

import QRCode from "./QRCode";
import { FaBarcode } from "react-icons/fa";

interface LabelProps {
  title: string;
  author: string;
  accessionNumber: string;
  callNumber: string;
  shelfLocation: string;
  qrValue: string;
}

export default function Label({
  title,
  author,
  accessionNumber,
  callNumber,
  shelfLocation,
  qrValue,
}: LabelProps) {
  return (
    <div className="label-container">
      <div className="label-content">
        {/* Cut corner marks */}
        <div className="cut-corner top-left"></div>
        <div className="cut-corner top-right"></div>
        <div className="cut-corner bottom-left"></div>
        <div className="cut-corner bottom-right"></div>

        {/* Header */}
        <div className="label-header">
          <div className="library-brand">
            <img src="/ksitm.png" alt="KSITM" className="library-logo" />
            <span className="library-name">KSITM</span>
          </div>
          <span className="label-type">BOOK LABEL</span>
        </div>

        {/* Body */}
        <div className="label-body">
          <div className="book-info">
            <h3 className="book-title">{title}</h3>
            <p className="book-author">By: {author}</p>
          </div>

          <div className="label-details">
            <div className="detail-row">
              <span className="detail-label">Accession</span>
              <span className="detail-value">{accessionNumber}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Call No.</span>
              <span className="detail-value">{callNumber}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label">Shelf</span>
              <span className="detail-value">{shelfLocation}</span>
            </div>
          </div>

          <div className="label-qr">
            <QRCode value={qrValue} size={80} />
          </div>
        </div>

        {/* Footer */}
        <div className="label-footer">
          <span>Scan to view details</span>
        </div>
      </div>

      <style jsx>{`
        .label-container {
          display: inline-block;
          padding: 0;
          background: transparent;
          border-radius: 0;
          position: relative;
        }

        .label-content {
          background: white;
          border: 1px solid #1a1a2e;
          border-radius: 2mm;
          padding: 3mm 4mm;
          width: 72mm;
          height: 48mm;
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          position: relative;
        }

        /* Cut corner marks */
        .cut-corner {
          position: absolute;
          width: 4mm;
          height: 4mm;
          pointer-events: none;
          z-index: 10;
        }

        .cut-corner.top-left {
          top: -1mm;
          left: -1mm;
          border-top: 1px solid #666;
          border-left: 1px solid #666;
        }

        .cut-corner.top-right {
          top: -1mm;
          right: -1mm;
          border-top: 1px solid #666;
          border-right: 1px solid #666;
        }

        .cut-corner.bottom-left {
          bottom: -1mm;
          left: -1mm;
          border-bottom: 1px solid #666;
          border-left: 1px solid #666;
        }

        .cut-corner.bottom-right {
          bottom: -1mm;
          right: -1mm;
          border-bottom: 1px solid #666;
          border-right: 1px solid #666;
        }

        /* Header */
        .label-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1.5px solid #4b2e83;
          padding-bottom: 1.5mm;
          margin-bottom: 2mm;
        }

        .library-brand {
          display: flex;
          align-items: center;
          gap: 1.5mm;
        }

        .library-logo {
          height: 12px;
          width: auto;
        }

        .library-name {
          font-size: 8pt;
          font-weight: 700;
          color: #4b2e83;
          letter-spacing: 0.3pt;
        }

        .label-type {
          font-size: 5pt;
          font-weight: 600;
          color: #6b7280;
          background: #f3f4f6;
          padding: 0.5mm 3mm;
          border-radius: 1mm;
        }

        /* Body */
        .label-body {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 2mm;
          flex: 1;
        }

        .book-info {
          grid-column: 1;
        }

        .book-title {
          font-size: 9pt;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 0.5mm 0;
          line-height: 1.2;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .book-author {
          font-size: 6pt;
          color: #6b7280;
          margin: 0;
        }

        .label-details {
          grid-column: 1;
          margin: 1mm 0;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          padding: 0.5mm 0;
          border-bottom: 0.5px solid #f3f4f6;
          font-size: 6pt;
        }

        .detail-label {
          color: #6b7280;
          font-weight: 500;
        }

        .detail-value {
          color: #1a1a2e;
          font-weight: 600;
          font-family: monospace;
          font-size: 5.5pt;
        }

        .label-qr {
          grid-column: 2;
          grid-row: 1 / 4;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 1mm;
        }

        .label-qr :global(.qr-container) {
          padding: 2mm;
          border-radius: 1mm;
        }

        .label-footer {
          text-align: center;
          margin-top: 1mm;
          padding-top: 1mm;
          border-top: 0.5px solid #e5e7eb;
          font-size: 4pt;
          color: #9ca3af;
          letter-spacing: 0.3pt;
        }

        @media print {
          .label-container {
            padding: 0 !important;
            background: transparent !important;
          }

          .label-content {
            border: 1px dashed #aaa !important;
            box-shadow: none !important;
          }

          .cut-corner {
            border-color: #888 !important;
          }
        }

        @media screen {
          .label-container {
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          }
        }
      `}</style>
    </div>
  );
}
