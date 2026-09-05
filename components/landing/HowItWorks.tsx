"use client";

import { FaUserPlus, FaSearch, FaBookReader } from "react-icons/fa";

export default function HowItWorks() {
  return (
    <section className="how-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">How It Works</span>
          <h2 className="section-title">
            Simple Steps to <span className="gradient-text">Get Started</span>
          </h2>
        </div>

        <div className="steps-grid">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <div className="step-icon">
                <FaUserPlus size={24} color="#4B2E83" />
              </div>
              <h3>Create Account</h3>
              <p>
                Sign up as a student, librarian, or admin with your email and
                password.
              </p>
            </div>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <div className="step-icon">
                <FaSearch size={24} color="#4B2E83" />
              </div>
              <h3>Search & Discover</h3>
              <p>
                Browse thousands of books, search by title, author, or category.
              </p>
            </div>
          </div>

          <div className="step-arrow">→</div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <div className="step-icon">
                <FaBookReader size={24} color="#4B2E83" />
              </div>
              <h3>Borrow & Enjoy</h3>
              <p>
                Reserve books, track loans, and manage your library experience
                seamlessly.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .how-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #faf5ff, #f5f3ff);
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-badge {
          display: inline-block;
          background: #ede9fe;
          color: #4b2e83;
          padding: 4px 16px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
        }

        .section-title {
          font-size: 40px;
          font-weight: 800;
          color: #1a1a2e;
          margin: 16px 0 0 0;
        }

        .gradient-text {
          background: linear-gradient(135deg, #4b2e83, #f58220);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .steps-grid {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .step {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          background: white;
          padding: 30px;
          border-radius: 16px;
          flex: 1;
          max-width: 300px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
        }

        .step-number {
          background: linear-gradient(135deg, #4b2e83, #6d28d9);
          color: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 18px;
          flex-shrink: 0;
        }

        .step-content {
          flex: 1;
        }

        .step-icon {
          margin-bottom: 8px;
        }

        .step-content h3 {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 8px 0;
        }

        .step-content p {
          font-size: 14px;
          color: #6b7280;
          line-height: 1.6;
          margin: 0;
        }

        .step-arrow {
          font-size: 30px;
          color: #4b2e83;
          font-weight: 700;
        }

        @media (max-width: 968px) {
          .steps-grid {
            flex-direction: column;
          }

          .step {
            max-width: 100%;
            width: 100%;
          }

          .step-arrow {
            transform: rotate(90deg);
          }

          .section-title {
            font-size: 32px;
          }
        }
      `}</style>
    </section>
  );
}
