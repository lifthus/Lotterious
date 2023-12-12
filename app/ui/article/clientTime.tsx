"use client";

export function ClientTime({ today, date }: { today: Date; date: Date }) {
  let dateStr = "";
  today = new Date(today);
  date = new Date(date);
  if (today.toDateString() === date.toDateString())
    dateStr = date.toTimeString().slice(0, 5);
  else dateStr = date.toISOString().slice(0, 10);
  return (
    <p className="flex text-xs whitespace-nowrap justify-center">{dateStr}</p>
  );
}
