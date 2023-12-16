"use server";

import { getCodeFromSlug } from "@/app/lib/article/slug";
import { pg } from "@/db/pool";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormSchema = z.object({
  code: z.string(),
  nickname: z
    .string({ invalid_type_error: "닉네임을 입력해주세요." })
    .min(1, { message: "닉네임은 한 글자 이상이어야 해요." })
    .max(10, { message: "닉네임은 10글자 이하로 해주세요." }),
  password: z
    .string({ invalid_type_error: "비밀번호를 입력해주세요." })
    .min(1, { message: "비밀번호는 한 글자 이상이어야 해요." })
    .max(100, { message: "비밀번호는 100글자 이하로 해주세요." }),
  content: z
    .string({ invalid_type_error: "내용을 입력해주세요." })
    .min(1, { message: "내용은 한 글자 이상이어야 해요." })
    .max(250, { message: "내용은 250글자 이하로 해주세요." }),
  createdAt: z.string(),
});

export type State = {
  errors?: {
    nickname?: string[];
    password?: string[];
    content?: string[];
  };
  message?: string | null;
};

const CreateComment = FormSchema.omit({ createdAt: true });

export async function createComment(
  state: State,
  formData: FormData
): Promise<State> {
  const validatedForm = CreateComment.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedForm.success)
    return { errors: validatedForm.error.flatten().fieldErrors };

  const { code, nickname, password, content } = validatedForm.data;

  try {
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
  } catch (e) {
    return { message: "댓글 작성 실패" };
  }
}
