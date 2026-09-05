"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Link from "next/link";

const API_URL = "https://ksitm-backend-api.onrender.com/api";

export default function MembersPage() {
  const [members, setMembers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMembers(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <DashboardLayout role="admin" userName="Admin User" userRole="admin">
      <div className="page-header">
        <h1 className="page-title">Members</h1>
      </div>

      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Library ID</th>
              <th>Department</th>
              <th>Level</th>
              <th>Fines</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member: any) => (
              <tr key={member._id}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.libraryId}</td>
                <td>{member.department || "—"}</td>
                <td>{member.level || "—"}</td>
                <td>₦{member.fines}</td>
                <td>
                  <Link
                    href={`/dashboard/members/${member._id}`}
                    className="action-btn view"
                  >
                    👁️ View
                  </Link>
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
        .search-box {
          position: relative;
          margin-bottom: 20px;
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
        .action-btn {
          padding: 4px 12px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        .action-btn.view {
          background: #dbeafe;
          color: #2563eb;
        }
      `}</style>
    </DashboardLayout>
  );
}
