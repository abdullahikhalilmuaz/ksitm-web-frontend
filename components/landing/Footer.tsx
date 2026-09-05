"use client";

import Link from "next/link";
import { FaTwitter, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <h3>📚 KSITM Library</h3>
            <p className="brand-tagline">Smart. Simple. Seamless.</p>
            <p className="footer-tagline">
              Empowering Knowledge, Enriching Futures
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <Link href="/">Home</Link>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
            <Link href="#features">Features</Link>
          </div>

          {/* Support */}
          <div className="footer-links">
            <h4>Support</h4>
            <Link href="/help">Help Center</Link>
            <Link href="/contact">Contact Us</Link>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>

          {/* Social */}
          <div className="footer-social">
            <h4>Connect With Us</h4>
            <div className="social-icons">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} KSITM Library System. All rights
            reserved.
          </p>
          <p className="footer-powered">Built by KSITM</p>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: #1a1a2e;
          color: white;
          padding: 60px 0 20px 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* Brand */
        .footer-brand h3 {
          font-size: 24px;
          margin: 0 0 8px 0;
          color: white;
        }

        .brand-tagline {
          color: rgba(255, 255, 255, 0.7);
          font-size: 15px;
          margin: 4px 0;
        }

        .footer-tagline {
          font-size: 14px;
          color: #f58220 !important;
          margin-top: 8px !important;
          font-weight: 500;
        }

        /* Links */
        .footer-links h4 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 16px 0;
          color: white;
        }

        .footer-links a {
          display: block;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          margin-bottom: 10px;
          font-size: 14px;
          transition: color 0.2s;
        }

        .footer-links a:hover {
          color: #f58220;
        }

        /* Social */
        .footer-social h4 {
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 16px 0;
          color: white;
        }

        .social-icons {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }

        .social-icons a {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 50%;
          text-decoration: none;
          transition: all 0.3s;
          color: white;
        }

        .social-icons a:hover {
          background: #f58220;
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(245, 130, 32, 0.3);
        }

        /* Bottom */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 20px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.5);
        }

        .footer-powered {
          color: rgba(255, 255, 255, 0.5);
        }

        /* Responsive */
        @media (max-width: 968px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr;
            gap: 30px;
          }
        }

        @media (max-width: 600px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            text-align: center;
          }

          .social-icons {
            justify-content: center;
          }

          .footer-bottom {
            flex-direction: column;
            text-align: center;
            gap: 8px;
          }
        }
      `}</style>
    </footer>
  );
}
