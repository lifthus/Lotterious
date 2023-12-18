import { cutIPAddr } from "@/app/lib/article/ip-addr";
import { pg } from "@/db/pool";

export type Comment = {
  id: number;
  content: string;
  created_at: Date;
  author_nickname: string;
  author_ip_addr: string;
};

export async function fetchComments(code: string): Promise<Comment[]> {
  try {
    const artcData = await pg.query(`SELECT id FROM articles WHERE code = $1`, [
      code,
    ]);
    const artcId = artcData.rows[0].id;

    const res = await pg.query(
      `
    SELECT id, content, created_at, author_nickname, author_ip_addr
    FROM article_comments
    WHERE article=$1
    ORDER BY created_at ASC;
    `,
      [artcId]
    );

    return res.rows.map((comment) => {
      return { ...comment, author_ip_addr: cutIPAddr(comment.author_ip_addr) };
    });
  } catch (e) {
    throw new Error("Failed to fetch comments");
  }
}
