"use client";

import { useState, useEffect } from "react";

interface WeatherData {
  temp: number;
  condition: string;
  icon: string;
}

export default function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate weather data - replace with real API later
    const getWeather = () => {
      const conditions = [
        { condition: "Sunny", icon: "☀️", temp: 32 },
        { condition: "Cloudy", icon: "☁️", temp: 25 },
        { condition: "Hot", icon: "🔥", temp: 35 },
        { condition: "Rainy", icon: "🌧️", temp: 22 },
      ];
      const random = conditions[Math.floor(Math.random() * conditions.length)];
      setWeather({
        temp: random.temp,
        condition: random.condition,
        icon: random.icon,
      });
      setLoading(false);
    };

    getWeather();
  }, []);

  if (loading) {
    return <div className="weather-widget">Loading weather...</div>;
  }

  return (
    <div className="weather-widget">
      <div className="weather-content">
        <span className="weather-icon">{weather?.icon}</span>
        <div className="weather-info">
          <span className="weather-temp">{weather?.temp}°C</span>
          <span className="weather-condition">{weather?.condition}</span>
        </div>
      </div>
      <style jsx>{`
        .weather-widget {
          background: white;
          border-radius: 12px;
          padding: 12px 20px;
          border: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          min-width: 120px;
        }

        .weather-content {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
        }

        .weather-icon {
          font-size: 28px;
        }

        .weather-info {
          display: flex;
          flex-direction: column;
        }

        .weather-temp {
          font-size: 18px;
          font-weight: 700;
          color: #1a1a2e;
        }

        .weather-condition {
          font-size: 11px;
          color: #6b7280;
        }
      `}</style>
    </div>
  );
}
