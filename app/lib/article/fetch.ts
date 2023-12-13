import { cutIPAddr } from "@/app/lib/article/ip-addr";
import { pg } from "@/db/pool";

type ArticleOutline = {
  title: string;
  code: string;
  created_at: Date;
  author_nickname: string;
  author_ip_addr: string;
};

export async function fetchArticlesOutline(
  board: string
): Promise<ArticleOutline[]> {
  const res = await pg.query(
    `
    SELECT title, code, created_at, author_nickname, author_ip_addr
    FROM articles
    WHERE board=$1
    ORDER BY created_at DESC;
    `,
    [board]
  );
  return res.rows.map((ol) => {
    let author_ip_addr = ol.author_ip_addr;
    author_ip_addr = cutIPAddr(author_ip_addr);
    return { ...ol, author_ip_addr };
  });
}

type Article = {
  title: string;
  code: string;
  created_at: Date;
  author_nickname: string;
  author_ip_addr: string;
  content: string;
};

export async function fetchArticle(code: string): Promise<Article> {
  const res = await pg.query(
    `
    SELECT title, code, created_at, author_nickname, author_ip_addr, content
    FROM articles
    WHERE code=$1;
    `,
    [code]
  );
  res.rows[0].author_ip_addr = cutIPAddr(res.rows[0].author_ip_addr);
  return res.rows[0];
}
