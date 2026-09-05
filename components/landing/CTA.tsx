"use client"

import Link from "next/link";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-content">
          <h2 className="cta-title">
            Ready to Transform Your <br />
            <span className="gradient-text">Library Experience?</span>
          </h2>
          <p className="cta-description">
            Join thousands of students and staff using the KSITM Library System.
          </p>
          <div className="cta-buttons">
            <Link href="/login" className="btn-primary">
              Get Started Now →
            </Link>
            <Link href="/register" className="btn-secondary">
              Create Account
            </Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .cta-section {
          padding: 80px 0;
          background: linear-gradient(135deg, #1a1a2e, #4B2E83);
          position: relative;
          overflow: hidden;
        }
        
        .cta-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -20%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(245, 130, 32, 0.2), transparent 70%);
          border-radius: 50%;
        }
        
        .cta-section::after {
          content: '';
          position: absolute;
          bottom: -50%;
          left: -20%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(75, 46, 131, 0.3), transparent 70%);
          border-radius: 50%;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }
        
        .cta-content {
          text-align: center;
        }
        
        .cta-title {
          font-size: 44px;
          font-weight: 800;
          color: white;
          margin: 0 0 16px 0;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #F58220, #fb923c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .cta-description {
          font-size: 18px;
          color: rgba(255,255,255,0.8);
          max-width: 500px;
          margin: 0 auto 32px auto;
        }
        
        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #F58220, #fb923c);
          color: white;
          padding: 14px 36px;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: transform 0.2s, box-shadow 0.2s;
          display: inline-block;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(245, 130, 32, 0.4);
        }
        
        .btn-secondary {
          background: transparent;
          color: white;
          padding: 14px 36px;
          border-radius: 12px;
          font-weight: 600;
          text-decoration: none;
          border: 2px solid rgba(255,255,255,0.3);
          transition: all 0.2s;
          display: inline-block;
        }
        
        .btn-secondary:hover {
          background: rgba(255,255,255,0.1);
          border-color: white;
        }
        
        @media (max-width: 768px) {
          .cta-title {
            font-size: 32px;
          }
          
          .cta-description {
            font-size: 16px;
          }
        }
      `}</style>
    </section>
  );
}