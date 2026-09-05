"use client";

import {
  FaSearch,
  FaMobileAlt,
  FaChartLine,
  FaQrcode,
  FaCalendarCheck,
  FaShieldAlt,
} from "react-icons/fa";

export default function Features() {
  const features = [
    {
      icon: <FaSearch size={32} color="#4B2E83" />,
      title: "Quick Search",
      description:
        "Find books instantly with our powerful search engine. Search by title, author, or ISBN.",
    },
    {
      icon: <FaMobileAlt size={32} color="#F58220" />,
      title: "Mobile App",
      description:
        "Access the library anywhere with our student mobile app. Search, reserve, and track loans.",
    },
    {
      icon: <FaChartLine size={32} color="#4B2E83" />,
      title: "Real-time Analytics",
      description:
        "Monitor library usage, track popular books, and generate reports with real-time data.",
    },
    {
      icon: <FaQrcode size={32} color="#F58220" />,
      title: "QR Code System",
      description:
        "Scan QR codes on books for instant check-in, check-out, and inventory management.",
    },
    {
      icon: <FaCalendarCheck size={32} color="#4B2E83" />,
      title: "Smart Reservations",
      description:
        "Reserve books in advance and get notified when they're available for pickup.",
    },
    {
      icon: <FaShieldAlt size={32} color="#F58220" />,
      title: "Secure & Reliable",
      description:
        "Your data is safe with enterprise-grade security and regular backups.",
    },
  ];

  return (
    <section className="features-section" id="features">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Features</span>
          <h2 className="section-title">
            Everything You Need for a <br />
            <span className="gradient-text">Modern Library</span>
          </h2>
          <p className="section-description">
            Powerful tools designed for students, librarians, and
            administrators.
          </p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div className="feature-card" key={index}>
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .features-section {
          padding: 80px 0;
          background: #ffffff;
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
          background: #f5f3ff;
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
          margin: 16px 0 12px 0;
        }

        .gradient-text {
          background: linear-gradient(135deg, #4b2e83, #f58220);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-description {
          font-size: 18px;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .feature-card {
          background: white;
          padding: 30px;
          border-radius: 16px;
          border: 1px solid #f3f4f6;
          transition: all 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
          border-color: #4b2e83;
        }

        .feature-icon {
          margin-bottom: 16px;
        }

        .feature-title {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0 0 8px 0;
        }

        .feature-description {
          font-size: 15px;
          color: #6b7280;
          line-height: 1.6;
          margin: 0;
        }

        @media (max-width: 968px) {
          .features-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .section-title {
            font-size: 32px;
          }
        }

        @media (max-width: 600px) {
          .features-grid {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 26px;
          }
        }
      `}</style>
    </section>
  );
}
