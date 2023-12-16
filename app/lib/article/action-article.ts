"use server";

import { generateHexCode16 } from "@/app/lib/hex-code";
import { pg } from "@/db/pool";
import { z } from "zod";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const FormSchema = z.object({
  board: z.string(),
  code: z.string(),
  nickname: z.string().min(1).max(10),
  password: z.string().min(1).max(100),
  title: z.string().min(1).max(50),
  content: z.string().min(1).max(5000),
  createdAt: z.string(),
});

const CreateArticle = FormSchema.omit({ code: true, createdAt: true });

export async function createArticle(formData: FormData) {
  // const rawFormData = Object.fromEntries(fromData.entires());
  const { board, nickname, password, title, content } = CreateArticle.parse(
    Object.fromEntries(formData.entries())
  );

  const code = generateHexCode16();
  const ipAddr = headers().get("x-forwarded-for");

  try {
    await pg.query(
      `
    INSERT INTO articles (code, board, title, content, author_ip_addr, author_nickname, author_password, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `,
      [code, board, title, content, ipAddr, nickname, password, new Date()]
    );

    revalidatePath("/lotto645");
    redirect("/lotto645");
  } catch (e) {
    return { message: "글 생성 실패" };
  }
}

const EditArticle = FormSchema.omit({ board: true, createdAt: true });

export async function editArticle(prevPw: string, formData: FormData) {
  const { code, nickname, password, title, content } = EditArticle.parse(
    Object.fromEntries(formData.entries())
  );

  const articleData = await pg.query(`SELECT * FROM articles WHERE code = $1`, [
    code,
  ]);
  const article = articleData.rows[0];

  if (article.author_password !== prevPw) {
    return { message: "비밀번호가 일치하지 않습니다." };
  }

  try {
    await pg.query(
      `
  UPDATE articles SET title=$1, content=$2, author_nickname=$3, author_password=$4 WHERE code=$5
  `,
      [title, content, nickname, password, code]
    );

    const encodedTitle = encodeURIComponent(title);
    revalidatePath(`/lotto645/article/${encodedTitle}code${code}`);
    redirect(`/lotto645/article/${encodedTitle}code${code}`);
  } catch (e) {
    return { message: "글 수정 실패" };
  }
}

const DeleteArticle = FormSchema.pick({ code: true, password: true });

export async function deleteArticle(formData: FormData) {
  const { code, password } = DeleteArticle.parse(
    Object.fromEntries(formData.entries())
  );

  try {
    const artcData = await pg.query(
      `SELECT author_password FROM articles WHERE code=$1`,
      [code]
    );
    const artc = artcData.rows[0];

    if (artc.author_password !== password) {
      return { message: "비밀번호가 일치하지 않습니다." };
    }

    await pg.query(`DELETE FROM articles WHERE code=$1`, [code]);

    redirect("/lotto645");
  } catch (e) {
    return { message: "글 삭제 실패" };
  }
}
