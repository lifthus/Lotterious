export class lotto645Constraints {
  historicalNumbers: number[][] = [];
  excludeHistoricalNumbers: boolean = false;

  excludeConsecutiveNumbers: number | undefined = undefined;
  excludeConsecutiveMultiples: number | undefined = undefined;
  excludeNumbersInRanges:
    | { min: number; max: number; count: number }
    | undefined = undefined;

  constructor(historicalNumbers: number[][] = []) {
    this.historicalNumbers = [...historicalNumbers];
  }

  private validateHistoricalNumbers(nums: number[]): boolean {
    return true;
  }
  private validateConsecutiveNumbers(nums: number[]): boolean {
    if (this.excludeConsecutiveNumbers === undefined) return true;
    const limit = this.excludeConsecutiveNumbers;
    let maxConsecCnt = 1;
    let consecCnt = 1;
    for (let i = 1; i < 6; i++) {
      if (nums[i] === nums[i - 1] + 1) {
        consecCnt++;
        if (consecCnt > maxConsecCnt) maxConsecCnt = consecCnt;
      } else consecCnt = 1;
    }
    if (maxConsecCnt >= limit) {
      return false;
    }
    return true;
  }
  private validateConsecutiveMultiples(nums: number[]): boolean {
    if (this.excludeConsecutiveMultiples === undefined) return true;
    const limit = this.excludeConsecutiveMultiples;
    let maxConsecCnt = 1;
    for (let m = 2; m < 23; m++) {
      let consecCnt = 1;
      for (let i = 1; i < 6; i++) {
        if (nums[i] % m !== 0 || nums[i - 1] % m !== 0) {
          consecCnt = 1;
          continue;
        }
        if (nums[i] / m === nums[i - 1] / m + 1) {
          consecCnt++;
          if (consecCnt > maxConsecCnt) maxConsecCnt = consecCnt;
        } else consecCnt = 1;
      }
    }
    if (maxConsecCnt >= limit) {
      console.log(nums, maxConsecCnt);
      return false;
    }
    return true;
  }
  private validateNumbersInRanges(nums: number[]): boolean {
    return true;
  }
  validate(nums: number[]): boolean {
    return (
      this.validateHistoricalNumbers(nums) &&
      this.validateConsecutiveNumbers(nums) &&
      this.validateConsecutiveMultiples(nums) &&
      this.validateNumbersInRanges(nums)
    );
  }
}

export class lotto645Generator {
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
    let validated = false;
    let sortedChosenNumbers: number[] = [];
    let validateCnt = 0;
    while (!validated && validateCnt < 10) {
      while (chosenNumbers.size < 6) {
        const num = this.numBetween1to45();
        while (!chosenNumbers.has(num)) {
          chosenNumbers.add(num);
        }
      }
      sortedChosenNumbers = Array.from(chosenNumbers).sort((a, b) => a - b);
      validated = this.constraints.validate(sortedChosenNumbers);
      validateCnt++;
      if (!validated) chosenNumbers.clear();
    }
    if (!validated) {
      return [];
    }
    return sortedChosenNumbers;
  }
  numBetween1to45(): number {
    return Math.floor(Math.random() * 45) + 1;
  }
}
