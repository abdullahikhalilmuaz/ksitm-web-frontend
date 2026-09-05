"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaHome,
  FaBook,
  FaCopy,
  FaUsers,
  FaCog,
  FaBookmark,
  FaSignOutAlt,
  FaUserGraduate,
} from "react-icons/fa";
import "../../styles/sidebar.css";

interface SidebarProps {
  role: "admin" | "librarian" | "student";
}

export default function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const getMenuItems = () => {
    const baseItems = [
      { href: "/dashboard", label: "Dashboard", icon: FaHome },
      { href: "/dashboard/books", label: "Books", icon: FaBook },
      { href: "/dashboard/copies", label: "Book Copies", icon: FaCopy },
      { href: "/dashboard/loans", label: "Loans", icon: FaBookmark },
      {
        href: "/dashboard/reservations",
        label: "Reservations",
        icon: FaUserGraduate,
      },
      { href: "/dashboard/members", label: "Members", icon: FaUsers },
    ];

    const adminItems = [
      { href: "/dashboard/librarians", label: "Librarians", icon: FaUsers },
      { href: "/dashboard/settings", label: "Settings", icon: FaCog },
    ];

    if (role === "admin") {
      return [...baseItems, ...adminItems];
    }
    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="brand-icon">📚</span>
        <span className="brand-text">KSITM Library</span>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item ${isActive(item.href) ? "active" : ""}`}
            >
              <Icon className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">
          <FaSignOutAlt className="nav-icon" />
          <span className="nav-label">Logout</span>
        </button>
      </div>
    </aside>
  );
}
