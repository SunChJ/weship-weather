"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

function RainDrops() {
  const drops = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    height: `${15 + Math.random() * 25}px`,
    delay: `${Math.random() * 2}s`,
    duration: `${0.8 + Math.random() * 0.6}s`,
  }));

  return (
    <>
      {drops.map((drop) => (
        <div
          key={drop.id}
          className="rain-drop"
          style={{
            left: drop.left,
            height: drop.height,
            animationDelay: drop.delay,
            animationDuration: drop.duration,
          }}
        />
      ))}
    </>
  );
}

export function WeatherWidget() {
  const [temperature, setTemperature] = useState<number | null>(null);
  const [time, setTime] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Update clock every second (Lofoten time)
    function updateTime() {
      const now = new Date();
      const lofoten = now.toLocaleTimeString("en-US", {
        timeZone: "Europe/Oslo",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      setTime(lofoten);
    }
    updateTime();
    const clockInterval = setInterval(updateTime, 1000);

    // Fetch weather
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=68.2&longitude=14.4&current=temperature_2m&timezone=Europe%2FOslo"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Weather fetch failed");
        return res.json();
      })
      .then((data) => {
        setTemperature(Math.round(data.current.temperature_2m));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });

    return () => clearInterval(clockInterval);
  }, []);

  return (
    <div
      className="relative w-[400px] h-[400px] rounded-2xl overflow-hidden"
      style={{ padding: 32 }}
    >
      {/* Background image */}
      <Image
        src="/lofoten-bg.png"
        alt="Lofoten landscape"
        fill
        className="object-cover"
        priority
      />

      {/* Rain overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <RainDrops />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col justify-between h-full text-white">
        {/* Top row */}
        <div className="flex justify-between items-start">
          <div>
            <div className="text-lg font-semibold leading-tight">Today</div>
            <div className="text-lg font-semibold leading-tight">{time}</div>
          </div>
          <div
            className="font-black leading-none"
            style={{
              fontSize: 72,
              letterSpacing: -2,
            }}
          >
            {loading ? "—" : error ? "!" : `${temperature}°`}
          </div>
        </div>

        {/* Bottom row */}
        <div>
          <div className="text-lg font-semibold leading-tight">Lofoten</div>
          <div className="text-lg font-semibold leading-tight">Norway</div>
        </div>
      </div>
    </div>
  );
}
