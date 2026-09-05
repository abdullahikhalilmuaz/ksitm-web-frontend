"use client";

import DashboardLayout from "@/components/layout/DashboardLayout";
import WeatherWidget from "@/components/ui/WeatherWidget";
import { FaBook, FaCopy, FaUsers, FaChartLine } from "react-icons/fa";

export default function DashboardPage() {
  const stats = [
    { label: "Total Books", value: "12,345", icon: FaBook, color: "#4B2E83" },
    { label: "Total Copies", value: "25,678", icon: FaCopy, color: "#F58220" },
    {
      label: "Active Members",
      value: "3,456",
      icon: FaUsers,
      color: "#10b981",
    },
    {
      label: "Overdue Loans",
      value: "12%",
      icon: FaChartLine,
      color: "#ef4444",
    },
  ];

  const recentLoans = [
    {
      student: "John Doe",
      book: "Introduction to Algorithms",
      date: "2026-09-04",
      status: "Active",
    },
    {
      student: "Jane Smith",
      book: "Database Systems",
      date: "2026-09-03",
      status: "Active",
    },
    {
      student: "Mike Johnson",
      book: "Computer Networks",
      date: "2026-09-02",
      status: "Returned",
    },
  ];

  return (
    <DashboardLayout role="admin" userName="Admin User" userRole="admin">
      <div>
        {/* Header with Weather */}
        <div className="dashboard-header">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle">Welcome back, Admin</p>
          </div>
          <WeatherWidget />
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div className="stat-card" key={index}>
                <div
                  className="stat-icon"
                  style={{ background: `${stat.color}15`, color: stat.color }}
                >
                  <Icon size={24} />
                </div>
                <div className="stat-info">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Loans Table */}
        <div className="recent-section">
          <div className="section-header">
            <h2>Recent Loans</h2>
            <button className="view-all">View All →</button>
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Book</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentLoans.map((loan, index) => (
                  <tr key={index}>
                    <td>{loan.student}</td>
                    <td>{loan.book}</td>
                    <td>{loan.date}</td>
                    <td>
                      <span
                        className={`status-badge ${loan.status.toLowerCase()}`}
                      >
                        {loan.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-header {
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 32px;
        }

        .stat-card {
          background: white;
          padding: 20px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          border: 1px solid #f3f4f6;
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stat-info {
          display: flex;
          flex-direction: column;
        }

        .stat-value {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a2e;
        }

        .stat-label {
          font-size: 14px;
          color: #6b7280;
        }

        .recent-section {
          background: white;
          border-radius: 12px;
          padding: 20px;
          border: 1px solid #f3f4f6;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .section-header h2 {
          font-size: 18px;
          font-weight: 600;
          color: #1a1a2e;
          margin: 0;
        }

        .view-all {
          background: none;
          border: none;
          color: #4b2e83;
          font-weight: 600;
          cursor: pointer;
          font-size: 14px;
        }

        .view-all:hover {
          text-decoration: underline;
        }

        .table-container {
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
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

        tr:last-child td {
          border-bottom: none;
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

        .status-badge.returned {
          background: #d1fae5;
          color: #059669;
        }

        .status-badge.overdue {
          background: #fee2e2;
          color: #dc2626;
        }

        @media (max-width: 968px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-value {
            font-size: 20px;
          }

          .dashboard-header {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </DashboardLayout>
  );
}
