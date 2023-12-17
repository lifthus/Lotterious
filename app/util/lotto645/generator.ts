export class lotto645Constraints {
  excludeHistoricalNumbers: boolean = false;

  excludeConsecutiveNumbers: number | undefined = undefined;
  excludeConsecutiveMultiples: number | undefined = undefined;
  excludeNumbersInRanges:
    | { range: number | undefined; count: number | undefined }
    | undefined = undefined;

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
    if (
      !this.excludeNumbersInRanges ||
      !this.excludeNumbersInRanges.range ||
      !this.excludeNumbersInRanges.count
    )
      return true;
    const range = this.excludeNumbersInRanges.range;
    const count = this.excludeNumbersInRanges.count;
    let rp = 0;
    for (let l = 0; l < 6; l++) {
      for (let r = Math.max(l, rp); r < 6; r++) {
        if (nums[r] - nums[l] + 1 > range) {
          rp = r;
          break;
        }
        if (r - l + 1 >= count) {
          return false;
        }
      }
    }
    return true;
  }
  validate(nums: number[]): boolean {
    return (
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
    console.log(this.includeNumbers);
    let validated = false;
    let sortedChosenNumbers: number[] = [];
    let validateCnt = 0;
    while (!validated && validateCnt < 50) {
      const chosenNumbers: Set<number> = new Set(this.includeNumbers);
      let candidates = Array.from({ length: 45 }, (_, i) => i + 1);
      candidates = candidates.filter((n) => !this.includeNumbers.includes(n));
      candidates = candidates.filter((n) => !this.excludeNumbers.includes(n));
      while (chosenNumbers.size < 6 && candidates.length > 0) {
        const num = this.selectBetween(candidates);
        chosenNumbers.add(num);
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
  selectBetween(nums: number[]): number {
    const idx = Math.floor(Math.random() * nums.length);
    return nums.splice(idx, 1)[0];
  }
}
