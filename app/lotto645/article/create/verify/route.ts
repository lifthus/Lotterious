import { getVFromQRURL, verifyLotto645V } from "@/app/lib/lotto645/verify";
import * as cheerio from "cheerio";

export type VerifiedLotto645 = {
  draw: number;
  drawDate: Date;
  drawNums: number[];
  myNums: number[][];
};

export async function POST(request: Request) {
  const { qr_url } = await request.json();
  try {
    const qrv = getVFromQRURL(qr_url);
    if (qrv === null) throw new Error("no v in qr_url");
    const verified = await verifyLotto645V(qrv);
    return new Response(JSON.stringify(verified));
  } catch (e) {
    return new Response("QR interpretation failed.", { status: 500 });
  }
}
