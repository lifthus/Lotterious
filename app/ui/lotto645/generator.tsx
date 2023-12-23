"use client";

import { useRef, useState } from "react";

import {
  lotto645Constraints,
  lotto645Generator,
} from "../../model/lotto645/generator";

export default function Lotto645Generator() {
  const [
    excludeConsecutiveNumbersChecked,
    setExcludeConsecutiveNumbersChecked,
  ] = useState(false);
  const [
    excludeConsecutiveMultiplesChecked,
    setExcludeConsecutiveMultiplesChecked,
  ] = useState(false);
  const [excloudeRangeNumbersChecked, setExcludeRangeNumbersChecked] =
    useState(false);

  const constraints = useRef(new lotto645Constraints()).current;

  const [include, setInclude] = useState<number[]>([]);
  const [exclude, setExclude] = useState<number[]>([]);

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col space-y-2 bg-yellow-200 p-4 px-14 rounded-t-lg w-[30rem]">
        {/* exclude consecutive numbers */}
        <div className="flex items-center">
          <input
            type="checkbox"
            className="w-5 h-5 mr-2"
            value="123"
            onChange={(e) => {
              if (!e.target.checked) {
                setExcludeConsecutiveNumbersChecked(false);
                constraints.excludeConsecutiveNumbers = undefined;
                return;
              }
              setExcludeConsecutiveNumbersChecked(true);
              const numInput = document.getElementsByName(
                "excludeConsecutiveNumbers"
              )[0] as HTMLInputElement;
              const v = Number(numInput.value);
              if (v >= 2 && v <= 6) constraints.excludeConsecutiveNumbers = v;
              else constraints.excludeConsecutiveNumbers = undefined;
            }}
          />
          <input
            name="excludeConsecutiveNumbers"
            type="number"
            className="border w-10 text-center"
            min="2"
            max="6"
            defaultValue="3"
            onChange={(e) => {
              const v = Number(e.target.value);
              if (v >= 2 && v <= 6) constraints.excludeConsecutiveNumbers = v;
              else constraints.excludeConsecutiveNumbers = undefined;
            }}
            onBlur={(e) => {
              const v = Number(e.target.value);
              if (v < 2 || v > 6) e.target.value = "";
            }}
            disabled={!excludeConsecutiveNumbersChecked}
          />
          개 이상 연속하는 수 제외
        </div>
        {/* exclude consecutive multiples */}
        <div className="flex items-center">
          <input
            type="checkbox"
            className="w-5 h-5 mr-2"
            onChange={(e) => {
              if (!e.target.checked) {
                setExcludeConsecutiveMultiplesChecked(false);
                constraints.excludeConsecutiveMultiples = undefined;
                return;
              }
              setExcludeConsecutiveMultiplesChecked(true);
              const numInput = document.getElementsByName(
                "excludeConsecutiveMultiples"
              )[0] as HTMLInputElement;
              const v = Number(numInput.value);
              if (v >= 2 && v <= 6) constraints.excludeConsecutiveMultiples = v;
              else constraints.excludeConsecutiveMultiples = undefined;
            }}
          />{" "}
          <input
            name="excludeConsecutiveMultiples"
            type="number"
            className="border w-10 text-center"
            min="2"
            max="6"
            onChange={(e) => {
              const v = Number(e.target.value);
              console.log(v);
              if (v >= 2 && v <= 6) constraints.excludeConsecutiveMultiples = v;
              else constraints.excludeConsecutiveMultiples = undefined;
            }}
            onBlur={(e) => {
              const v = Number(e.target.value);
              if (v < 2 || v > 6) e.target.value = "";
            }}
            disabled={!excludeConsecutiveMultiplesChecked}
            defaultValue="3"
          />
          개 이상 연속하는 배수 제외
        </div>
        {/* exclude numbers in range */}
        <div className="flex items-center">
          <input
            type="checkbox"
            className="w-5 h-5 mr-2"
            onChange={(e) => {
              if (!e.target.checked) {
                setExcludeRangeNumbersChecked(false);
                constraints.excludeNumbersInRanges = undefined;
                return;
              }
              let rangeConfig = { range: 46, count: 7 };
              setExcludeRangeNumbersChecked(true);
              const rangeInput = document.getElementsByName(
                "excludeRange"
              )[0] as HTMLInputElement;
              const numInput = document.getElementsByName(
                "numbersInRange"
              )[0] as HTMLInputElement;
              const rangeV = Number(rangeInput.value);
              const numV = Number(numInput.value);
              constraints.excludeNumbersInRanges = {
                range: rangeV === 0 ? undefined : rangeV,
                count: numV === 0 ? undefined : numV,
              };
            }}
          />{" "}
          범위&nbsp;
          <input
            name="excludeRange"
            type="number"
            className="border w-10 text-center"
            onChange={(e) => {
              const v = Number(e.target.value);
              if (!!constraints.excludeNumbersInRanges)
                constraints.excludeNumbersInRanges.range =
                  v > 0 ? v : undefined;
            }}
            min="0"
            max="45"
            disabled={!excloudeRangeNumbersChecked}
            defaultValue={"10"}
          />
          &nbsp;내에&nbsp;
          <input
            name="numbersInRange"
            type="number"
            className="border w-10 text-center"
            onChange={(e) => {
              const v = Number(e.target.value);
              if (!!constraints.excludeNumbersInRanges)
                constraints.excludeNumbersInRanges.count =
                  v > 0 ? v : undefined;
            }}
            min="0"
            max="6"
            disabled={!excloudeRangeNumbersChecked}
            defaultValue={"3"}
          />
          개 이상 몰린 수 제외
        </div>
        <NumberSelector setInclude={setInclude} setExclude={setExclude} />
      </div>
      <NumbersGenerator
        constraints={constraints}
        include={include}
        exclude={exclude}
      />
    </div>
  );
}

function NumberSelector({
  setInclude,
  setExclude,
}: {
  setInclude: (n: number[]) => void;
  setExclude: (n: number[]) => void;
}) {
  const [numbers, setNumbers] = useState<(boolean | undefined)[]>(
    new Array<boolean | undefined>(45).fill(undefined)
  );
  const getColor = (n: boolean | undefined): string => {
    if (n === true) return "bg-green-400";
    if (n === false) return "bg-gray-400";
    return "bg-yellow-300 hover:bg-yellow-400";
  };
  const greenCnt = numbers.filter((n) => n).length;
  return (
    <div>
      <div className="flex w-full justify-center items-center">
        <div className="rounded-full bg-green-400 w-3 h-3 " />
        <p className="text-sm mx-2">포함</p>
        <div className="rounded-full bg-gray-400 w-3 h-3 " />
        <p className="text-sm mx-2">제외</p>
      </div>
      {numbers.map((_, i) => {
        return (
          <button
            key={`number ${i + 1}`}
            className={`border-2 border-yellow-500 w-5 ml-1 mt-1 ${getColor(
              numbers[i]
            )}`}
            onClick={() => {
              if (numbers[i] === undefined && greenCnt < 6) numbers[i] = true;
              else if (
                numbers[i] === true ||
                (numbers[i] === undefined && greenCnt > 5)
              )
                numbers[i] = false;
              else numbers[i] = undefined;
              setInclude(
                numbers
                  .map((n, i) => (n === true ? i + 1 : 0))
                  .filter((n) => n !== 0)
              );
              setExclude(
                numbers
                  .map((n, i) => (n === false ? i + 1 : 0))
                  .filter((n) => n !== 0)
              );
              setNumbers([...numbers]);
            }}
          >
            {i + 1}
          </button>
        );
      })}
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
  return (
    <div
      className={`w-8 h-8 rounded-full ${bgColor} text-white flex justify-center items-center mr-1`}
    >
      {!!number && number}
    </div>
  );
};
