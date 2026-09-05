"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Label from "@/components/ui/Label";
import { bookService } from "@/services/book.service";
import { copyService, BookCopy } from "@/services/copy.service";

export default function PrintPage() {
  const params = useParams();
  const bookId = params?.id as string;

  const [book, setBook] = useState<any>(null);
  const [copies, setCopies] = useState<BookCopy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookData = await bookService.getById(bookId);
        setBook(bookData);
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

  useEffect(() => {
    if (!loading && copies.length > 0) {
      setTimeout(() => window.print(), 800);
    }
  }, [loading, copies]);

  if (loading)
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        Loading labels...
      </div>
    );
  if (error || !book)
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        ❌ {error || "Book not found"}
      </div>
    );

  return (
    <html>
      <head>
        <title>Print Labels - {book.title}</title>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { margin: 0; padding: 0; background: white; font-family: Arial, sans-serif; }
          .print-page { margin: 0; padding: 0; background: white; }

          .labels-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2.5mm;
            padding: 2.5mm;
            justify-items: center;
          }

          .label-wrapper {
            display: inline-block;
            width: 100%;
            max-width: 72mm;
          }

          .label-wrapper :global(.label-content) {
            border: 1px dashed #ccc !important;
            position: relative;
            padding: 1.5mm 2.5mm !important;
            height: 33mm !important;
            width: 100% !important;
          }

          .label-wrapper :global(.label-header) {
            padding-bottom: 0.5mm !important;
            margin-bottom: 0.5mm !important;
          }

          .label-wrapper :global(.library-name) {
            font-size: 6.5pt !important;
          }

          .label-wrapper :global(.label-type) {
            font-size: 4pt !important;
            padding: 0.2mm 1.5mm !important;
          }

          .label-wrapper :global(.book-title) {
            font-size: 7pt !important;
            -webkit-line-clamp: 1 !important;
          }

          .label-wrapper :global(.book-author) {
            font-size: 4.5pt !important;
          }

          .label-wrapper :global(.detail-row) {
            padding: 0.2mm 0 !important;
            font-size: 4.5pt !important;
          }

          .label-wrapper :global(.detail-value) {
            font-size: 4pt !important;
          }

          .label-wrapper :global(.label-qr) :global(.qr-container) {
            padding: 1mm !important;
          }

          .label-wrapper :global(.label-qr) canvas {
            width: 40px !important;
            height: 40px !important;
          }

          .label-wrapper :global(.label-footer) {
            font-size: 3pt !important;
            margin-top: 0.3mm !important;
            padding-top: 0.3mm !important;
          }

          /* Cut corners */
          .label-wrapper :global(.cut-corner) {
            position: absolute;
            width: 2.5mm;
            height: 2.5mm;
            pointer-events: none;
            z-index: 10;
          }
          .label-wrapper :global(.cut-corner.top-left) {
            top: -0.5mm;
            left: -0.5mm;
            border-top: 1px solid #666;
            border-left: 1px solid #666;
          }
          .label-wrapper :global(.cut-corner.top-right) {
            top: -0.5mm;
            right: -0.5mm;
            border-top: 1px solid #666;
            border-right: 1px solid #666;
          }
          .label-wrapper :global(.cut-corner.bottom-left) {
            bottom: -0.5mm;
            left: -0.5mm;
            border-bottom: 1px solid #666;
            border-left: 1px solid #666;
          }
          .label-wrapper :global(.cut-corner.bottom-right) {
            bottom: -0.5mm;
            right: -0.5mm;
            border-bottom: 1px solid #666;
            border-right: 1px solid #666;
          }

          @media print {
            @page { margin: 2.5mm; size: A4; }
            body { margin: 0 !important; padding: 0 !important; background: white !important; }
            .print-page { margin: 0 !important; padding: 0 !important; }
            .labels-grid {
              display: grid !important;
              grid-template-columns: repeat(3, 1fr) !important;
              gap: 2mm !important;
              padding: 1.5mm !important;
            }
            .label-wrapper { width: 100% !important; max-width: 72mm !important; }
            .label-wrapper:nth-child(18n) { page-break-after: always; }
            .label-wrapper :global(.label-content) { border: 1px dashed #aaa !important; }
          }

          @media screen {
            .labels-grid { gap: 5mm; padding: 8mm; }
            .label-wrapper { max-width: 72mm; }
            .label-wrapper :global(.label-content) { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
          }
        `}</style>
      </head>
      <body>
        <div className="print-page">
          <div className="labels-grid">
            {copies.map((copy) => (
              <div className="label-wrapper" key={copy.accessionNumber}>
                <Label
                  title={book.title}
                  author={book.author}
                  accessionNumber={copy.accessionNumber}
                  callNumber={book.callNumber || "N/A"}
                  shelfLocation={book.shelfLocation || "N/A"}
                  qrValue={copy.accessionNumber}
                />
                <div className="cut-corner top-left"></div>
                <div className="cut-corner top-right"></div>
                <div className="cut-corner bottom-left"></div>
                <div className="cut-corner bottom-right"></div>
              </div>
            ))}
          </div>
        </div>
      </body>
    </html>
  );
}
