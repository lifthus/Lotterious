"use client";

export function ClientTime({
  className,
  today,
  date,
}: {
  className?: string;
  today: Date;
  date: Date;
}) {
  let dateStr = "";
  today = new Date(today);
  date = new Date(date);
  if (today.toDateString() === date.toDateString())
    dateStr = date.toTimeString().slice(0, 5);
  else dateStr = date.toISOString().slice(0, 10);

  const cn = className || "";
  return <p className={cn}>{dateStr}</p>;
}

export function FullClientTime({
  className,
  date,
}: {
  className?: string;
  date: Date;
}) {
  const cn = className || "";
  const dateStr = new Date(date).toISOString().slice(0, 19);
  return <p className={cn}>{dateStr}</p>;
}
