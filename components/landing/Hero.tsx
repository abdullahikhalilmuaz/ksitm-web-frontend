"use client";

import Link from "next/link";
import { FaBook, FaMobileAlt, FaChartLine } from "react-icons/fa";
import { MdMenuBook } from "react-icons/md";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            <div className="badge">📚 KSITM Library System</div>
            <h1 className="hero-title">
              Smart. Simple. <br />
              <span className="gradient-text">Seamless.</span>
            </h1>
            <p className="hero-description">
              Empower your library experience with our modern management system.
              Search books, track loans, and access resources anywhere, anytime.
            </p>
            <div className="hero-buttons">
              <Link href="/login" className="btn-primary">
                Get Started →
              </Link>
              <Link href="#features" className="btn-secondary">
                Learn More
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Books</span>
              </div>
              <div>
                <span className="stat-number">2,000+</span>
                <span className="stat-label">Students</span>
              </div>
              <div>
                <span className="stat-number">50+</span>
                <span className="stat-label">Staff</span>
              </div>
            </div>
          </div>

          <div className="hero-image">
            <div className="hero-illustration">
              <div className="floating-card card-1">
                <FaBook size={24} color="#4B2E83" />
                <div>
                  <p className="card-title">Introduction to Algorithms</p>
                  <p className="card-sub">Available: 3 copies</p>
                </div>
              </div>
              <div className="floating-card card-2">
                <FaMobileAlt size={24} color="#F58220" />
                <div>
                  <p className="card-title">Mobile App</p>
                  <p className="card-sub">Scan & Borrow</p>
                </div>
              </div>
              <div className="floating-card card-3">
                <FaChartLine size={24} color="#4B2E83" />
                <div>
                  <p className="card-title">Dashboard</p>
                  <p className="card-sub">Real-time analytics</p>
                </div>
              </div>
              <div className="main-illustration">
                <MdMenuBook size={80} color="white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #f5f3ff 0%, #ffffff 100%);
          overflow: hidden;
          position: relative;
        }

        .hero-section::before {
          content: "";
          position: absolute;
          top: -50%;
          right: -20%;
          width: 600px;
          height: 600px;
          background: radial-gradient(
            circle,
            rgba(75, 46, 131, 0.08) 0%,
            transparent 70%
          );
          border-radius: 50%;
          pointer-events: none;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          min-height: 70vh;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .badge {
          display: inline-block;
          background: linear-gradient(135deg, #4b2e83, #6d28d9);
          color: white;
          padding: 6px 16px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          width: fit-content;
        }

        .hero-title {
          font-size: 56px;
          font-weight: 800;
          line-height: 1.1;
          color: #1a1a2e;
          margin: 0;
        }

        .gradient-text {
          background: linear-gradient(135deg, #4b2e83, #f58220);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 18px;
          color: #4b5563;
          line-height: 1.8;
          max-width: 500px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: linear-gradient(135deg, #4b2e83, #6d28d9);
          color: white;
          padding: 14px 32px;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          transition:
            transform 0.2s,
            box-shadow 0.2s;
          display: inline-block;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(75, 46, 131, 0.3);
        }

        .btn-secondary {
          background: white;
          color: #4b2e83;
          padding: 14px 32px;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          border: 2px solid #4b2e83;
          transition: all 0.2s;
          display: inline-block;
        }

        .btn-secondary:hover {
          background: #4b2e83;
          color: white;
        }

        .hero-stats {
          display: flex;
          gap: 40px;
          padding-top: 20px;
          border-top: 2px solid #e5e7eb;
        }

        .hero-stats div {
          display: flex;
          flex-direction: column;
        }

        .stat-number {
          font-size: 24px;
          font-weight: 800;
          color: #1a1a2e;
        }

        .stat-label {
          font-size: 14px;
          color: #6b7280;
        }

        .hero-image {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .hero-illustration {
          position: relative;
          width: 100%;
          max-width: 500px;
          height: 400px;
        }

        .main-illustration {
          width: 200px;
          height: 200px;
          background: linear-gradient(135deg, #4b2e83, #6d28d9);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
          box-shadow: 0 20px 60px rgba(75, 46, 131, 0.3);
          animation: float 3s ease-in-out infinite;
        }

        .floating-card {
          position: absolute;
          background: white;
          padding: 12px 18px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 12px;
          animation: float 4s ease-in-out infinite;
          min-width: 160px;
        }

        .card-title {
          font-weight: 600;
          font-size: 13px;
          color: #1a1a2e;
          margin: 0;
        }

        .card-sub {
          font-size: 11px;
          color: #6b7280;
          margin: 0;
        }

        .card-1 {
          top: 20px;
          left: -20px;
          animation-delay: 0s;
        }

        .card-2 {
          bottom: 40px;
          right: -10px;
          animation-delay: 1s;
        }

        .card-3 {
          bottom: 120px;
          left: -30px;
          animation-delay: 2s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @media (max-width: 968px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-title {
            font-size: 40px;
          }

          .hero-description {
            margin: 0 auto;
          }

          .hero-buttons {
            justify-content: center;
          }

          .hero-stats {
            justify-content: center;
          }

          .floating-card {
            display: none;
          }

          .hero-illustration {
            height: 250px;
          }

          .main-illustration {
            width: 150px;
            height: 150px;
          }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 30px;
          }

          .hero-section {
            padding: 60px 0;
          }

          .hero-stats {
            gap: 20px;
          }

          .stat-number {
            font-size: 18px;
          }
        }
      `}</style>
    </section>
  );
}
