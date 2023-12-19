import { cutIPAddr } from "@/app/lib/article/ip-addr";
import { pg } from "@/db/pool";

const ITEMS_PER_PAGE = 10;

export type ArticleOutline = {
  title: string;
  code: string;
  created_at: Date;
  author_nickname: string;
  author_ip_addr: string;
  comment_count: number;
  likes_count: number;
};

export async function fetchFilteredArticlesOutline(
  board: string,
  query: string,
  page: number
): Promise<ArticleOutline[]> {
  const offset = (page - 1) * ITEMS_PER_PAGE;
  try {
    const res = await pg.query(
      `
    SELECT 
    articles.title, 
    articles.code, 
    articles.created_at, 
    articles.author_nickname, 
    articles.author_ip_addr, 
    count(article_comments.article) AS comment_count,
    (SELECT like_count FROM article_like_counts as alc WHERE alc.article=articles.id)
    FROM articles
    LEFT JOIN article_comments ON articles.id = article_comments.article
    WHERE board=$1 AND (articles.title ILIKE $2)
    GROUP BY articles.id
    ORDER BY articles.created_at DESC
    LIMIT $3 OFFSET $4;
    `,
      [board, `%${query}%`, ITEMS_PER_PAGE, offset]
    );

    return res.rows.map((ol) => {
      let author_ip_addr = ol.author_ip_addr;
      author_ip_addr = cutIPAddr(author_ip_addr);
      return { ...ol, author_ip_addr };
    });
  } catch (e) {
    throw new Error("Failed to fetch articles outline");
  }
}

export type Article = {
  board: string;
  title: string;
  code: string;
  created_at: Date;
  author_nickname: string;
  author_ip_addr: string;
  content: string;
  like_count: number;
};

export async function fetchArticleByCode(
  code: string
): Promise<Article | null> {
  try {
    const res = await pg.query(
      `
    SELECT board, title, code, created_at, author_nickname, author_ip_addr, content,
    (SELECT like_count FROM article_like_counts as alc WHERE alc.article=articles.id)
    FROM articles
    WHERE code=$1;
    `,
      [code]
    );

    if (res.rows.length === 0) return null;

    res.rows[0].author_ip_addr = cutIPAddr(res.rows[0].author_ip_addr);
    return res.rows[0];
  } catch (e) {
    throw new Error("Failed to fetch article");
  }
}

export async function fetchArticlesPages(
  board: string,
  query: string
): Promise<number> {
  try {
    const count = await pg.query(
      `
  SELECT COUNT(*) FROM articles
  WHERE board=$1 AND (
    title ILIKE $2
  );`,
      [board, `%${query}%`]
    );

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (e) {
    throw new Error("Failed to fetch articles pages");
  }
}
