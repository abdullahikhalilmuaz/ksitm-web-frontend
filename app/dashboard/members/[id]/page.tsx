"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export default function MemberDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [member, setMember] = useState<any>(null);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) fetchMember();
  }, [id]);

  const fetchMember = async () => {
    try {
      const token = localStorage.getItem("token");
      const [userRes, loansRes] = await Promise.all([
        axios.get(`${API_URL}/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/users/${id}/loans`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setMember(userRes.data.data);
      setLoans(loansRes.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <DashboardLayout>
        <div>Loading...</div>
      </DashboardLayout>
    );
  if (!member)
    return (
      <DashboardLayout>
        <div>Member not found</div>
      </DashboardLayout>
    );

  return (
    <DashboardLayout role="admin" userName="Admin User" userRole="admin">
      <div className="page">
        <Link href="/dashboard/members" className="back-link">
          <FaArrowLeft /> Back to Members
        </Link>

        <h1 className="page-title">{member.name}</h1>
        <p className="page-subtitle">{member.email}</p>

        <div className="info-grid">
          <div>
            <strong>Library ID:</strong> {member.libraryId}
          </div>
          <div>
            <strong>Department:</strong> {member.department}
          </div>
          <div>
            <strong>Level:</strong> {member.level}
          </div>
          <div>
            <strong>Fines:</strong> ₦{member.fines}
          </div>
        </div>

        <h2>Borrowing History</h2>
        <table>
          <thead>
            <tr>
              <th>Book</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loans.length === 0 ? (
              <tr>
                <td colSpan={4}>No borrowing history</td>
              </tr>
            ) : (
              loans.map((loan: any) => (
                <tr key={loan._id}>
                  <td>{loan.book?.title}</td>
                  <td>{new Date(loan.issueDate).toLocaleDateString()}</td>
                  <td>{new Date(loan.dueDate).toLocaleDateString()}</td>
                  <td>
                    <span className={`status ${loan.status}`}>
                      {loan.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .page {
          padding: 0;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #6b7280;
          text-decoration: none;
          margin-bottom: 16px;
        }
        .page-title {
          font-size: 28px;
          font-weight: 700;
          margin: 0;
        }
        .page-subtitle {
          color: #6b7280;
          margin-bottom: 20px;
        }
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          background: #f9fafb;
          padding: 16px;
          border-radius: 8px;
          margin-bottom: 24px;
        }
        .info-grid div {
          padding: 4px 0;
        }
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th {
          padding: 10px 12px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #6b7280;
          background: #f9fafb;
          border-bottom: 2px solid #e5e7eb;
        }
        td {
          padding: 10px 12px;
          border-bottom: 1px solid #f3f4f6;
        }
        .status {
          padding: 2px 10px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
        }
        .status.active {
          background: #dbeafe;
          color: #2563eb;
        }
        .status.returned {
          background: #d1fae5;
          color: #059669;
        }
      `}</style>
    </DashboardLayout>
  );
}
