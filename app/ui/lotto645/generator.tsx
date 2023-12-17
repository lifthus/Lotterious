"use client";

import { useState } from "react";
import { set } from "zod";

type lottoNumbers = {
  draw_no1: number;
  draw_no2: number;
  draw_no3: number;
  draw_no4: number;
  draw_no5: number;
  draw_no6: number;
};

class lotto645Constraints {
  historicalNumbers: lottoNumbers[] = [];
  excludeHistoricalNumbersFlag: boolean = false;

  excludeConsecutiveNumbersFlag: number | undefined = undefined;
  excludeConsecutiveMultiples: number | undefined = undefined;
  excludeNumbersInRanges:
    | { min: number; max: number; count: number }
    | undefined = undefined;

  constructor(historicalNumbers: lottoNumbers[] = []) {
    this.historicalNumbers = [...historicalNumbers];
  }

  private validateHistoricalNumbers(nums: lottoNumbers): boolean {
    return false;
  }
  private validateConsecutiveNumbers(nums: lottoNumbers): boolean {
    return false;
  }
  private validateConsecutiveMultiples(nums: lottoNumbers): boolean {
    return false;
  }
  private validateNumbersInRanges(nums: lottoNumbers): boolean {
    return false;
  }
  validate(nums: lottoNumbers): boolean {
    return (
      this.validateHistoricalNumbers(nums) &&
      this.validateConsecutiveNumbers(nums) &&
      this.validateConsecutiveMultiples(nums) &&
      this.validateNumbersInRanges(nums)
    );
  }
}

class lotto645Generator {
  private constraints: lotto645Constraints;
  private includeNumbers: number[];
  private excludeNumbers: number[];
  constructor(
    constraints: lotto645Constraints,
    include: number[],
    exclude: number[]
  ) {
    this.constraints = constraints;
    this.includeNumbers = include;
    this.excludeNumbers = exclude;
  }
  generate(): number[] {
    const chosenNumbers: Set<number> = new Set();
    while (chosenNumbers.size < 6) {
      const num = this.numBetween1to45();
      while (!chosenNumbers.has(num)) {
        chosenNumbers.add(num);
      }
    }
    const sortedChosenNumbers = Array.from(chosenNumbers).sort((a, b) => a - b);
    return sortedChosenNumbers;
  }
  numBetween1to45(): number {
    return Math.floor(Math.random() * 45) + 1;
  }
}

export default function Lotto645Generator() {
  const constraints = new lotto645Constraints();
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col space-y-2 bg-yellow-200 p-4 px-14 rounded-t-lg">
        <div className="flex items-center">
          <input type="checkbox" className="w-5 h-5 mr-2" disabled />{" "}
          <p className="">역대 당첨 번호 제외</p>
        </div>
        <div className="flex items-center">
          <input type="checkbox" className="w-5 h-5 mr-2" value="123" />
          <input
            type="number"
            className="border w-10 text-center"
            min="2"
            max="6"
          />
          개 이상 연속하는 수 제외
        </div>
        <div className="flex items-center">
          <input type="checkbox" className="w-5 h-5 mr-2" />{" "}
          <input
            type="number"
            className="border w-10 text-center"
            min="2"
            max="6"
          />
          개 이상 연속하는 배수 제외
        </div>
        <div className="flex items-center">
          <input type="checkbox" className="w-5 h-5 mr-2" /> 범위&nbsp;
          <input type="number" className="border w-10 text-center" />
          &nbsp;내에&nbsp;
          <input type="number" className="border w-10 text-center" />개 이상
          몰린 수 제외
        </div>
      </div>
      <NumbersGenerator constraints={constraints} include={[]} exclude={[]} />
    </div>
  );
}

function NumbersGenerator({
  constraints,
  include,
  exclude,
}: {
  constraints: lotto645Constraints;
  include: number[];
  exclude: number[];
}) {
  const generator = new lotto645Generator(constraints, include, exclude);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [numHistory, setNumHistory] = useState<number[][]>([]);
  return (
    <div className="flex flex-col items-center">
      <div className="flex space-x-1 items-center bg-yellow-300 rounded-3xl p-10">
        {[0, 1, 2, 3, 4, 5].map((n) => {
          return <Ball key={`ball ${n}`} number={numbers[n]} />;
        })}
        <button
          className="bg-yellow-400 text-3xl text-white p-3 border-2 border-yellow-500 shadow-xl shadow-yellow-500 rounded-3xl"
          onClick={() => {
            if (numbers.length === 6)
              setNumHistory([[...numbers], ...numHistory]);
            setNumbers(generator.generate());
          }}
        >
          생성
        </button>
        <button
          className="bg-gray-400 text-3xl text-white p-3 border-2 shadow-xl shadow-yellow-500 rounded-3xl"
          onClick={() => {
            setNumHistory([]);
            setNumbers([]);
          }}
        >
          삭제
        </button>
      </div>
      <NumberPaper numbers={numHistory} />
    </div>
  );
}

const Ball = ({ number }: { number?: number }) => {
  let bgColor = "bg-white";
  if (number === undefined) {
    bgColor = "bg-gray-300";
  } else if (number < 10) {
    bgColor = "bg-yellow-500";
  } else if (number < 20) {
    bgColor = "bg-blue-500";
  } else if (number < 30) {
    bgColor = "bg-red-500";
  } else if (number < 40) {
    bgColor = "bg-gray-500";
  } else if (number < 46) {
    bgColor = "bg-green-500";
  }
  return (
    <div
      className={`w-8 h-8 md:w-14 md:h-14 rounded-full ${bgColor} text-white flex justify-center items-center mr-1 text-2xl`}
    >
      {!!number && number}
    </div>
  );
};

const NumberPaper = ({ numbers }: { numbers: number[][] }) => {
  const visible = numbers.length > 0;
  return (
    <div
      className={`flex flex-col items-center justify-center border-2 p-4 border-t-0 ${
        visible ? "" : "hidden"
      }`}
    >
      {numbers.map((nums, i) => {
        return (
          <div key={`number ${i}`}>
            <div className="flex my-[0.1rem]">
              {nums.map((n) => {
                return <SmallBall key={`small ball ${n}`} number={n} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const SmallBall = ({ number }: { number?: number }) => {
  let bgColor = "bg-white";
  if (number === undefined) {
    bgColor = "bg-gray-300";
  } else if (number < 10) {
    bgColor = "bg-yellow-500";
  } else if (number < 20) {
    bgColor = "bg-blue-500";
  } else if (number < 30) {
    bgColor = "bg-red-500";
  } else if (number < 40) {
    bgColor = "bg-gray-500";
  } else if (number < 46) {
    bgColor = "bg-green-500";
  }
  return (
    <div
      className={`w-8 h-8 rounded-full ${bgColor} text-white flex justify-center items-center mr-1`}
    >
      {!!number && number}
    </div>
  );
};
