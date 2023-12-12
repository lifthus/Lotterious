import { pg } from "@/db/pool";

export async function fetchArticlesOutline(
  board: string
): Promise<ArticleOutline[]> {
  const res = await pg.query(
    `
    SELECT title, code, created_at, author_nickname, author_ip_addr
    FROM articles
    WHERE board=$1
    ORDER BY created_at DESC
    `,
    [board]
  );
  return res.rows.map((ol) => {
    let author_ip_addr = ol.author_ip_addr;
    author_ip_addr = author_ip_addr.split(".").slice(0, 2).join(".");
    return { ...ol, author_ip_addr };
  });
}

type ArticleOutline = {
  title: string;
  code: string;
  created_at: Date;
  author_nickname: string;
  author_ip_addr: string;
};
