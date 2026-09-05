"use client";

import {
  FaUserGraduate,
  FaChalkboardTeacher,
  FaLaptopCode,
} from "react-icons/fa";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Amina Yusuf",
      role: "Student, Computer Science",
      content:
        "The KSITM Library System has made finding and borrowing books so much easier. I love the mobile app!",
      icon: <FaUserGraduate size={48} color="#4B2E83" />,
    },
    {
      name: "Dr. Ahmed Bello",
      role: "Librarian",
      content:
        "Managing thousands of books has never been this simple. The QR code system is a game changer.",
      icon: <FaChalkboardTeacher size={48} color="#F58220" />,
    },
    {
      name: "Zainab Muhammad",
      role: "Student, Engineering",
      content:
        "I can reserve books from anywhere and get notified when they're ready. Amazing system!",
      icon: <FaLaptopCode size={48} color="#4B2E83" />,
    },
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-header">
          <span className="section-badge">Testimonials</span>
          <h2 className="section-title">
            What Our <span className="gradient-text">Community Says</span>
          </h2>
        </div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <div className="testimonial-card" key={index}>
              <div className="testimonial-avatar">{testimonial.icon}</div>
              <p className="testimonial-content">"{testimonial.content}"</p>
              <h4 className="testimonial-name">{testimonial.name}</h4>
              <p className="testimonial-role">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonials-section {
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
          margin: 16px 0 0 0;
        }

        .gradient-text {
          background: linear-gradient(135deg, #4b2e83, #f58220);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        .testimonial-card {
          background: #faf5ff;
          padding: 30px;
          border-radius: 16px;
          text-align: center;
          transition: transform 0.3s;
        }

        .testimonial-card:hover {
          transform: translateY(-4px);
        }

        .testimonial-avatar {
          margin-bottom: 12px;
        }

        .testimonial-content {
          font-size: 16px;
          color: #374151;
          line-height: 1.7;
          font-style: italic;
          margin: 0 0 16px 0;
        }

        .testimonial-name {
          font-size: 16px;
          font-weight: 700;
          color: #1a1a2e;
          margin: 0;
        }

        .testimonial-role {
          font-size: 14px;
          color: #6b7280;
          margin: 4px 0 0 0;
        }

        @media (max-width: 968px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin: 0 auto;
          }

          .section-title {
            font-size: 32px;
          }
        }
      `}</style>
    </section>
  );
}
