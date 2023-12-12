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
  password: z.string().min(4).max(100),
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

  await pg.query(
    `
    INSERT INTO articles (code, board, title, content, author_ip_addr, author_nickname, author_password, created_at)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    `,
    [code, board, title, content, ipAddr, nickname, password, new Date()]
  );

  revalidatePath("/lotto645");
  redirect("/lotto645");
}
