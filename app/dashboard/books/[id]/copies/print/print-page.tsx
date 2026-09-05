"use client";

import { useState, useEffect } from "react";
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

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        Loading labels...
      </div>
    );
  }

  if (error || !book) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <p>❌ {error || "Book not found"}</p>
      </div>
    );
  }

  return (
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
          </div>
        ))}
      </div>

      <style jsx>{`
        .print-page {
          margin: 0;
          padding: 0;
          background: white;
        }

        .labels-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8mm;
          padding: 5mm;
          justify-items: center;
        }

        .label-wrapper {
          display: inline-block;
        }

        @media print {
          @page {
            margin: 5mm;
            size: A4;
          }

          body {
            margin: 0 !important;
            padding: 0 !important;
            background: white !important;
          }

          .print-page {
            margin: 0 !important;
            padding: 0 !important;
          }

          .labels-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 8mm !important;
            padding: 5mm !important;
          }

          .label-wrapper:nth-child(4n) {
            page-break-after: always;
          }
        }
      `}</style>
    </div>
  );
}
