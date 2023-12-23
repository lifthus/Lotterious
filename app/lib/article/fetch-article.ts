import { cutIPAddr } from "@/app/lib/article/ip-addr";
import { VerifiedLotto645 } from "@/app/lib/lotto645/verify";
import { pg } from "@/db/pool";

const ITEMS_PER_PAGE = 10;

export type ArticleOutline = {
  title: string;
  code: string;
  created_at: Date;
  author_nickname: string;
  author_ip_addr: string;
  comment_count: number;
  like_count: number;
  verified: boolean;
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
    articles.verified,
    acc.whole_count as comment_count,
    alc.like_count as like_count
    FROM articles
    JOIN article_comment_counts as acc ON articles.id=acc.article
    JOIN article_like_counts as alc ON articles.id=alc.article
    WHERE board=$1 AND (articles.title ILIKE $2)
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

  verifiedLotto645?: VerifiedLotto645;
};

export async function fetchArticleByCode(
  code: string
): Promise<Article | null> {
  try {
    // first query the article.
    const articleData = await pg.query(
      `
    SELECT id, board, title, code, created_at, author_nickname, author_ip_addr, content,
    (SELECT like_count FROM article_like_counts as alc WHERE alc.article=articles.id)
    FROM articles
    WHERE code=$1;
    `,
      [code]
    );
    if (articleData.rows.length === 0) return null;
    const article = articleData.rows[0];

    // second query the lotto645 data related to the article.
    const lotto645Data = await pg.query(
      `SELECT * FROM article_lotto645 WHERE article=$1`,
      [article.id]
    );
    // if exists, trim and provide the data.
    if (lotto645Data.rows.length > 0) {
      const drawOrd = lotto645Data.rows[0].draw;
      const drawData = await pg.query(
        `SELECT * FROM lotto645_raw WHERE draw=$1`,
        [drawOrd]
      );
      const draw = drawData.rows[0];
      const drawDate = draw.draw_date;
      const drawNums = [
        draw.draw_no1,
        draw.draw_no2,
        draw.draw_no3,
        draw.draw_no4,
        draw.draw_no5,
        draw.draw_no6,
        draw.bonus_no,
      ];
      const myNums = lotto645Data.rows.map((l) => [
        l.draw_no1,
        l.draw_no2,
        l.draw_no3,
        l.draw_no4,
        l.draw_no5,
        l.draw_no6,
      ]);

      article.verifiedLotto645 = {
        draw: drawOrd,
        drawDate,
        drawNums,
        myNums,
      };
    }

    article.author_ip_addr = cutIPAddr(article.author_ip_addr);
    return article;
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
