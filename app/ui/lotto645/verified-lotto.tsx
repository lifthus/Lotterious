import { VerifiedLotto645 } from "@/app/lotto645/article/create/verify/route";

export function VerifiedLotto645Nums({
  lotto645,
}: {
  lotto645: VerifiedLotto645;
}) {
  const drawDate = new Date(lotto645.drawDate).toISOString().slice(0, 10);

  const lotto6Nums = lotto645.drawNums.slice(0, 6);
  const lottoBonusNum = lotto645.drawNums[6];
  return (
    <div className="flex flex-col items-center justify-center">
      <p className="font-semibold">제 {lotto645.draw}회</p>
      <p className="text-sm">{drawDate}</p>
      <div>
        {lotto645.myNums.map((nums) => {
          return (
            <div className="flex" key={nums.toString()}>
              {nums.map((num) => {
                return (
                  <VerifiedBall
                    key={num}
                    number={num}
                    colored={lotto6Nums.includes(num)}
                    bonus={num === lottoBonusNum}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const VerifiedBall = ({
  number,
  colored,
  bonus,
}: {
  number?: number;
  colored: boolean;
  bonus?: boolean;
}) => {
  let bgColor = "bg-white";
  if (number === undefined) {
    bgColor = "bg-gray-300";
  } else if (number <= 10) {
    bgColor = "bg-yellow-500";
  } else if (number <= 20) {
    bgColor = "bg-blue-500";
  } else if (number <= 30) {
    bgColor = "bg-red-500";
  } else if (number <= 40) {
    bgColor = "bg-gray-500";
  } else if (number <= 45) {
    bgColor = "bg-green-500";
  }
  if (!colored) bgColor = "border-2 text-gray-500";
  else bgColor += " text-white";
  if (bonus) bgColor += " border-2 border-yellow-500 border-double";
  return (
    <div
      className={`w-8 h-8 rounded-full ${bgColor} flex justify-center items-center mr-1`}
    >
      {!!number && number}
    </div>
  );
};
