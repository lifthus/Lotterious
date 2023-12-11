import { fetchLatestLotto645DrawRaw } from "@/app/lib/lotto645data";

export default async function LottoDisplay() {
  const draw = await fetchLatestLotto645DrawRaw();

  const today = new Date();
  const hour = today.getHours();
  const date = draw.draw_date;
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);

  const diff = today.getTime() - date.getTime();
  const diffDays = Math.floor((diff + 10000) / 86400000);

  const weekday = today.getDay();
  let diffTillNextDraw = weekday === 7 ? 6 : 6 - today.getDay();
  if (weekday === 6 && hour >= 21) diffTillNextDraw = 7;

  return (
    <div className="flex flex-col bg-yellow-300 rounded-2xl p-5">
      <div>
        <p className="text-xl font-semibold">
          {date.getFullYear()}년 {date.getMonth() + 1}월 {date.getDate()}일,{" "}
          {diffDays}일 전 추첨 결과
        </p>
      </div>
      <div className="flex">
        <Ball number={draw.draw_no1} />
        <Ball number={draw.draw_no2} />
        <Ball number={draw.draw_no3} />
        <Ball number={draw.draw_no4} />
        <Ball number={draw.draw_no5} />
        <Ball number={draw.draw_no6} />
        +
        <Ball number={draw.bonus_no} />
      </div>
      <div className="text-right">
        <p className="text-xl font-semibold">
          다음 추첨 까지 {diffTillNextDraw}일!
        </p>
      </div>
    </div>
  );
}

const Ball = ({ number }: { number: number }) => {
  let bgColor = "bg-white";
  if (number < 10) {
    bgColor = "bg-yellow-500";
  } else if (number < 20) {
    bgColor = "bg-blue-500";
  } else if (number < 30) {
    bgColor = "bg-red-500";
  } else if (number < 40) {
    bgColor = "bg-gray-500";
  } else if (number < 45) {
    bgColor = "bg-green-500";
  }
  return (
    <div
      className={`w-14 h-14 rounded-full ${bgColor} text-white flex justify-center items-center mr-1 text-2xl`}
    >
      {number}
    </div>
  );
};
