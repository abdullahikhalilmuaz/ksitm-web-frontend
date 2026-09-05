"use client";

import { QRCodeSVG } from "qrcode.react";

interface QRCodeProps {
  value: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  level?: "L" | "M" | "Q" | "H";
  includeMargin?: boolean;
}

export default function QRCode({
  value,
  size = 128,
  bgColor = "#ffffff",
  fgColor = "#1a1a2e",
  level = "M",
  includeMargin = true,
}: QRCodeProps) {
  return (
    <div className="qr-container">
      <QRCodeSVG
        value={value}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        level={level}
        includeMargin={includeMargin}
      />
      <style jsx>{`
        .qr-container {
          display: inline-block;
          padding: 12px;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
