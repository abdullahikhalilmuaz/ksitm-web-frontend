"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div className="landing-page">
      <div className="landing-container">
        <div className="landing-content">
          <h1 className="landing-title">
            📚 KSITM <br />
            <span className="gradient-text">Library System</span>
          </h1>
          <p className="landing-description">Smart. Simple. Seamless.</p>
          <div className="landing-buttons">
            <Link href="/dashboard" className="btn-primary">
              Go to Dashboard →
            </Link>
            <Link href="/login" className="btn-secondary">
              Login
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .landing-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #f5f3ff 0%, #ffffff 100%);
        }

        .landing-container {
          max-width: 600px;
          padding: 40px;
        }

        .landing-content {
          text-align: center;
        }

        .landing-title {
          font-size: 48px;
          font-weight: 800;
          line-height: 1.2;
          color: #1a1a2e;
          margin: 0 0 16px 0;
        }

        .gradient-text {
          background: linear-gradient(135deg, #4b2e83, #f58220);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .landing-description {
          font-size: 20px;
          color: #6b7280;
          margin: 0 0 32px 0;
        }

        .landing-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .btn-primary {
          background: linear-gradient(135deg, #4b2e83, #6d28d9);
          color: white;
          padding: 14px 32px;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
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
        }

        .btn-secondary:hover {
          background: #4b2e83;
          color: white;
        }
      `}</style>
    </div>
  );
}
