import * as cheerio from "cheerio";

export type VerifiedLotto645 = {
  draw: number;
  drawDate: Date;
  drawNums: number[];
  myNums: number[][];
};

export function getVFromQRURL(qr_url: string): string | null {
  const queryParamString = qr_url.split("?")[1];
  const urlParams = new URLSearchParams(queryParamString);
  return urlParams.get("v");
}

export async function verifyLotto645V(v: string): Promise<VerifiedLotto645> {
  try {
    // get HTML to parse
    const res = await fetch(
      "https://m.dhlottery.co.kr/qr.do?method=winQr&v=" + v
    );

    if (res.status !== 200) {
      throw new Error("wrong URL");
    }

    const $ = cheerio.load(await res.text());

    const draw = Number($(".key_clr1").text().slice(2, -1));

    const drawDate = new Date($(".date").text().slice(0, 10));

    const drawNums: number[] = [];
    for (let ball of Array.from($("div.clr"))) {
      drawNums.push(Number($(ball).text()));
    }

    const myNums: number[][] = [];
    let idx = 0;
    let cnt = 0;
    for (let ball of Array.from($("span.clr"))) {
      if (cnt === 0) {
        myNums.push([]);
      }
      myNums[idx].push(Number($(ball).text()));
      cnt += 1;
      if (cnt === 6) {
        cnt = 0;
        idx += 1;
      }
    }

    return { draw, drawDate, drawNums, myNums };
  } catch (e) {
    throw new Error("verifying QR URL failed.");
  }
}
