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
  const cd = new Date(date);
  const locStr = cd.toLocaleString(); // "1/2/2023, 12:34:56 AM" in local time zone
  const y = locStr.split("/")[2].slice(0, 4);
  const md = locStr.split("/").slice(0, 2).join("-");
  const t = cd.toTimeString().slice(0, 8); // "01:23:45 GMT+... (...)" in local time zone
  return <p className={cn}>{`${y}-${md} ${t}`}</p>;
}
