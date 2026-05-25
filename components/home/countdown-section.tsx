"use client";

import { useEffect, useMemo, useState } from "react";
import { event } from "@/lib/home-data";

function getTimeLeft(targetDate: string) {
  const difference = new Date(targetDate).getTime() - Date.now();
  const total = Math.max(difference, 0);

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60)
  };
}

export function CountdownSection() {
  const targetDate = useMemo(() => event.date, []);
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(targetDate));

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [targetDate]);

  const items = [
    ["Ngày", timeLeft.days],
    ["Giờ", timeLeft.hours],
    ["Phút", timeLeft.minutes],
    ["Giây", timeLeft.seconds]
  ];

  return (
    <section className="border-y border-border bg-card">
      <div className="container grid gap-6 py-8 md:grid-cols-[1fr_1.3fr] md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Đếm ngược
          </p>
          <h2 className="mt-2 text-2xl font-bold">Thời gian đến đêm khai mạc</h2>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {items.map(([label, value]) => (
            <div key={label} className="rounded-lg border border-border bg-background p-4 text-center">
              <p className="text-3xl font-bold text-primary md:text-4xl">
                {String(value).padStart(2, "0")}
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
