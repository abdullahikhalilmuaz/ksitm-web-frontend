"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import axios from "axios";

const API_URL = "https://ksitm-backend-api.onrender.com/api";

export default function ReservationsPage() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/reservations`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout role="admin" userName="Admin User" userRole="admin">
      <div className="page-header">
        <h1 className="page-title">Reservations</h1>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Book</th>
              <th>Date</th>
              <th>Position</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((res: any) => (
              <tr key={res._id}>
                <td>{res.user?.name}</td>
                <td>{res.book?.title}</td>
                <td>{new Date(res.reservationDate).toLocaleDateString()}</td>
                <td>{res.position}</td>
                <td>
                  <span className={`status-badge ${res.status}`}>
                    {res.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn">✅ Ready</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .page-header {
          margin-bottom: 20px;
        }
        .page-title {
          font-size: 24px;
          font-weight: 700;
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
        }
        th {
          padding: 12px 16px;
          text-align: left;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
          color: #6b7280;
          background: #f9fafb;
        }
        td {
          padding: 12px 16px;
          border-bottom: 1px solid #f3f4f6;
        }
        .status-badge {
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 12px;
          font-weight: 600;
        }
        .status-badge.pending {
          background: #fef3c7;
          color: #d97706;
        }
        .status-badge.ready {
          background: #d1fae5;
          color: #059669;
        }
        .status-badge.collected {
          background: #dbeafe;
          color: #2563eb;
        }
        .action-btn {
          padding: 4px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          background: #d1fae5;
          color: #059669;
        }
      `}</style>
    </DashboardLayout>
  );
}
