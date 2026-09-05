"use client";

import { FaBook, FaUserGraduate, FaBookOpen, FaStar } from "react-icons/fa";

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-icon">
              <FaBook size={40} color="white" />
            </div>
            <h3 className="stat-number">10,000+</h3>
            <p className="stat-label">Books Available</p>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <FaUserGraduate size={40} color="white" />
            </div>
            <h3 className="stat-number">2,500+</h3>
            <p className="stat-label">Active Students</p>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <FaBookOpen size={40} color="white" />
            </div>
            <h3 className="stat-number">5,000+</h3>
            <p className="stat-label">Books Borrowed</p>
          </div>
          <div className="stat-item">
            <div className="stat-icon">
              <FaStar size={40} color="white" />
            </div>
            <h3 className="stat-number">98%</h3>
            <p className="stat-label">Satisfaction Rate</p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .stats-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #4b2e83, #6d28d9);
          color: white;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        .stat-item {
          text-align: center;
        }

        .stat-icon {
          margin-bottom: 12px;
        }

        .stat-number {
          font-size: 36px;
          font-weight: 800;
          margin: 0;
        }

        .stat-label {
          font-size: 16px;
          opacity: 0.8;
          margin: 8px 0 0 0;
        }

        @media (max-width: 768px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }

          .stat-number {
            font-size: 28px;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
