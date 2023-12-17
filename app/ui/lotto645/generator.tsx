"use client";

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
  generate(): lottoNumbers {
    return {} as lottoNumbers;
  }
}

export default function Lotto645Generator() {
  return (
    <div>
      <div className="flex">
        <input type="checkbox" /> 역대 당첨 번호 제외
      </div>
      <div className="flex">
        <input type="checkbox" />{" "}
        <input
          type="number"
          className="border w-10 text-center"
          min="2"
          max="6"
        />
        개 이상 연속하는 수 제외
      </div>
      <div className="flex">
        <input type="checkbox" />{" "}
        <input
          type="number"
          className="border w-10 text-center"
          min="2"
          max="6"
        />
        개 이상 연속하는 배수 제외
      </div>
      <div className="flex">
        <input type="checkbox" /> 범위&nbsp;
        <input type="number" className="border w-10 text-center" />
        &nbsp;내에&nbsp;
        <input type="number" className="border w-10 text-center" />개 이상 몰린
        수 제외
      </div>
    </div>
  );
}
