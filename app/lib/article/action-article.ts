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
  nickname: z
    .string({
      invalid_type_error: "닉네임을 입력해주세요.",
    })
    .min(1, { message: "닉네임은 한 글자 이상이어야 해요." })
    .max(10, { message: "닉네임은 10글자 이하로 해주세요." }),
  password: z
    .string({
      invalid_type_error: "비밀번호를 입력해주세요.",
    })
    .min(1, {
      message: "비밀번호는 한 글자 이상이어야 해요.",
    })
    .max(100, {
      message: "비밀번호는 100글자 이하로 해주세요.",
    }),
  title: z
    .string({
      invalid_type_error: "제목을 입력해주세요.",
    })
    .min(1, {
      message: "제목은 한 글자 이상이어야 해요.",
    })
    .max(50, {
      message: "제목은 50글자 이하로 해주세요.",
    }),
  content: z
    .string({
      invalid_type_error: "내용을 입력해주세요.",
    })
    .min(1, {
      message: "내용은 한 글자 이상이어야 해요.",
    })
    .max(5000, {
      message: "내용은 5000글자 이하로 해주세요.",
    }),
  createdAt: z.string(),
});

export type State = {
  errors?: {
    nickname?: string[];
    password?: string[];
    title?: string[];
    content?: string[];
  };
  message?: string | null;
};

const CreateArticle = FormSchema.omit({ code: true, createdAt: true });

export async function createArticle(
  prevState: State,
  formData: FormData
): Promise<State> {
  const validatedForm = CreateArticle.safeParse(
    Object.fromEntries(formData.entries())
  );
  if (!validatedForm.success)
    return {
      errors: validatedForm.error.flatten().fieldErrors,
      message: "필드 오류. 글 작성 실패.",
    };

  const code = generateHexCode16();
  const ipAddr = headers().get("x-forwarded-for");

  const { board, nickname, password, title, content } = validatedForm.data;

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
    return { message: "글 작성 실패" };
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
