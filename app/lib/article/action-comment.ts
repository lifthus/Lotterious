"use server";

import { getCodeFromSlug } from "@/app/lib/article/slug";
import { pg } from "@/db/pool";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  code: z.string(),
  nickname: z.string().min(1).max(10),
  password: z.string().min(4).max(100),
  content: z.string().min(1).max(250),
  createdAt: z.string(),
});

const CreateComment = FormSchema.omit({ createdAt: true });

export async function createComment(formData: FormData) {
  const { code, nickname, password, content } = CreateComment.parse(
    Object.fromEntries(formData.entries())
  );

  const artcData = await pg.query(
    `SELECT id, title FROM articles WHERE code = $1`,
    [code]
  );
  const artcId = artcData.rows[0].id;

  const ipAddr = headers().get("x-forwarded-for");

  await pg.query(
    `
  INSERT INTO article_comments (article, content, created_at, author_nickname, author_password, author_ip_addr)
  VALUES ($1, $2, $3, $4, $5, $6)
  `,
    [artcId, content, new Date(), nickname, password, ipAddr]
  );

  const title = encodeURIComponent(artcData.rows[0].title);

  revalidatePath(`/lotto645/article/${title}code${code}`);
  redirect(`/lotto645/article/${title}code${code}`);
}
