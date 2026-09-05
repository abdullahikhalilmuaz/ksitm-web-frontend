"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface DashboardLayoutProps {
  children: ReactNode;
  role?: "admin" | "librarian" | "student";
  userName?: string;
  userRole?: string;
}

export default function DashboardLayout({
  children,
  role = "admin",
  userName = "Admin User",
  userRole = "admin",
}: DashboardLayoutProps) {
  return (
    <div className="dashboard-layout">
      <Sidebar role={role} />
      <div className="main-content">
        <Header userName={userName} userRole={userRole} />
        <main className="content-area">
          <div className="content-wrapper">{children}</div>
        </main>
      </div>

      <style jsx>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background: #f9fafb;
        }

        .main-content {
          flex: 1;
          margin-left: 260px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .content-area {
          flex: 1;
          padding: 24px 32px;
        }

        .content-wrapper {
          max-width: 1400px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .main-content {
            margin-left: 70px;
          }

          .content-area {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
}
