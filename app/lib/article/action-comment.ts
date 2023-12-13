"use server";

import { getCodeFromSlug } from "@/app/lib/article/slug";
import { pg } from "@/db/pool";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  slug: z.string(),
  nickname: z.string().min(1).max(10),
  password: z.string().min(4).max(100),
  content: z.string().min(1).max(250),
  createdAt: z.string(),
});

const CreateComment = FormSchema.omit({ createdAt: true });

export async function createComment(formData: FormData) {
  const { slug, nickname, password, content } = CreateComment.parse(
    Object.fromEntries(formData.entries())
  );

  const code = getCodeFromSlug(slug);

  const artcData = await pg.query(`SELECT id FROM articles WHERE code = $1`, [
    code,
  ]);
  const artcId = artcData.rows[0].id;

  const ipAddr = headers().get("x-forwarded-for");

  await pg.query(
    `
  INSERT INTO article_comments (article, content, created_at, author_nickname, author_password, author_ip_addr)
  VALUES ($1, $2, $3, $4, $5, $6)
  `,
    [artcId, content, new Date(), nickname, password, ipAddr]
  );

  revalidatePath(`/lotto645/article/${slug}`);
  redirect(`/lotto645/article/${slug}`);
}
