import { pg } from "@/db/pool";

export async function fetchLatestLotto645DrawRaw(): Promise<DrawRaw> {
  const res = await pg.query(`
        SELECT * FROM lotto645_raw
        ORDER BY draw_date DESC
        LIMIT 1;
    `);
  return res.rows[0];
}

export type DrawRaw = {
  draw: number;
  draw_date: Date;
  draw_no1: number;
  draw_no2: number;
  draw_no3: number;
  draw_no4: number;
  draw_no5: number;
  draw_no6: number;
  bonus_no: number;
  total_prize: number;
  first_prize: number;
  first_prize_winners: number;
};
