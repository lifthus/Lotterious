import pg from "pg";
const { Client } = pg;

const client = new Client({
  connectionString: process.env.PG_CONNECTION_STRING,
});
client.connect();

await client.query(`
CREATE TABLE IF NOT EXISTS lotto645_raw (
    draw INT PRIMARY KEY,
    draw_date DATE NOT NULL,
    draw_no1 INT NOT NULL,
    draw_no2 INT NOT NULL,
    draw_no3 INT NOT NULL,
    draw_no4 INT NOT NULL,
    draw_no5 INT NOT NULL,
    draw_no6 INT NOT NULL,
    bonus_no INT NOT NULL,
    total_prize BIGINT NOT NULL,
    first_prize BIGINT NOT NULL,
    first_prize_winners INT NOT NULL
);
`);

await seed_lotto645_raw(client);

client.end();

async function seed_lotto645_raw(client) {
  for (let i = 1099; i < 1100; i++) {
    if (i % 50 === 0) console.log(i, "회 조회 중...");
    let res;
    try {
      res = await fetch(
        `https://www.dhlottery.co.kr/common.do?method=getLottoNumber&drwNo=${i}`,
      );
    } catch (e) {
      console.log(i, "회 조회 실패.");
    }
    const data = await res.json();
    if (data["returnValue"] !== "success") {
      console.log(i, "회 정보 없음.");
    }
    const {
      drwNo,
      drwNoDate,
      drwtNo1,
      drwtNo2,
      drwtNo3,
      drwtNo4,
      drwtNo5,
      drwtNo6,
      bnusNo,
      totSellamnt,
      firstWinamnt,
      firstPrzwnerCo,
    } = data;
    const insertText = `
        INSERT INTO lotto645_raw (draw, draw_date, draw_no1, draw_no2, draw_no3, draw_no4, draw_no5, draw_no6, bonus_no, total_prize, first_prize, first_prize_winners)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10 , $11, $12)
        ON CONFLICT (draw) DO NOTHING;
        `;
    const drawDate = new Date(drwNoDate);
    try {
        await client.query(insertText, [
        drwNo,
        drawDate,
        drwtNo1,
        drwtNo2,
        drwtNo3,
        drwtNo4,
        drwtNo5,
        drwtNo6,
        bnusNo,
        totSellamnt,
        firstWinamnt,
        firstPrzwnerCo,
      ]);
    } catch (e) {
      console.log(i, "회 삽입 실패.");
    }
  }
}
