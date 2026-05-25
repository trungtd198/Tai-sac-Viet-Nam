"use client";

import { useEffect, useState } from "react";

type CountdownBlockProps = {
  targetDate: string;
};

function getTimeLeft(targetDate: string) {
  const total = Math.max(new Date(targetDate).getTime() - Date.now(), 0);

  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60)
  };
}

export function CountdownBlock({ targetDate }: CountdownBlockProps) {
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
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map(([label, value]) => (
        <div key={label} className="rounded-lg border border-border bg-background p-4 text-center">
          <p className="text-3xl font-bold text-primary md:text-4xl">{String(value).padStart(2, "0")}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
        </div>
      ))}
    </div>
  );
}
