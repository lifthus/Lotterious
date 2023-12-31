"use client";

import { editArticle } from "@/app/lib/article/action-article";
import { Article } from "@/app/lib/article/fetch-article";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function Form({ article }: { article: Article }) {
  const [pw, setPw] = useState("");
  const { pending } = useFormStatus();

  const editArticleWithCode = editArticle.bind(null, pw);
  const initialState = { errors: {}, message: null };
  const [state, dispatch] = useFormState(editArticleWithCode, initialState);

  if (pw === "")
    return (
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const pw = (document.getElementById("password") as HTMLInputElement)
            .value;
          const res = await fetch(
            `/${article.board}/article/${article.title}code${article.code}/password`,
            {
              method: "POST",
              body: JSON.stringify({ code: article.code, password: pw }),
            }
          );
          if (res.status === 200) setPw(pw);
          else if (res.status === 403) alert("비밀번호가 틀렸습니다.");
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            name="password"
            className="m-2 border-2 rounded-md"
            aria-disabled={pending}
          />
          <button
            type="submit"
            className="px-2 bg-yellow-300 rounded-md hover:bg-yellow-200"
          >
            ✎ 수정
          </button>
        </div>
      </form>
    );

  return (
    <form action={dispatch}>
      <div className="p-4 bg-gray-100 rouned-md w-[95vw] md:w-auto">
        <div className="flex flex-col text-lg">
          <p className="mb-2 text-2xl font-semibold">글 수정</p>
          <input type="hidden" name="code" value={article.code} />
          <div className="flex items-center">
            <label htmlFor="article-title" className="mr-2 font-semibold">
              제목
            </label>
            {state.errors?.title &&
              state.errors.title.map((err: string) => (
                <p key={err} className="text-sm text-red-500">
                  {err}&nbsp;
                </p>
              ))}
          </div>
          <input
            name="title"
            id="article-title"
            type="text"
            className="md:w-[35rem] border-2"
            defaultValue={article.title}
            placeholder={article.title}
          />
        </div>
        <div className="mt-2 md:flex">
          <div className="flex items-center ml-auto">
            {state.errors?.nickname &&
              state.errors.nickname.map((err: string) => (
                <p key={err} className="text-sm text-red-500">
                  {err}&nbsp;
                </p>
              ))}
            {(!state.errors?.nickname || state.errors.nickname.length < 1) &&
              state.errors?.password &&
              state.errors.password.map((err: string) => (
                <p key={err} className="text-sm text-red-500">
                  {err}&nbsp;
                </p>
              ))}
          </div>
          <div className="flex">
            <div className="md:flex">
              <label
                htmlFor="author-nickname"
                className="flex items-center mr-1 font-semibold"
              >
                닉네임
              </label>
              <input
                name="nickname"
                id="author-nickname"
                type="text"
                className="w-[10rem] md:w-[5rem] border-2"
                defaultValue={article.author_nickname}
                placeholder={article.author_nickname}
              />
            </div>
            <div className="md:flex">
              <label
                htmlFor="author-password"
                className="flex items-center ml-1 mr-1 font-semibold"
              >
                비밀번호
              </label>
              <input
                name="password"
                id="author-password"
                type="password"
                className="w-[10rem] md:w-[5rem] border-2"
                defaultValue={pw}
              />
            </div>
          </div>
        </div>
        <div className="mt-5">
          <textarea
            name="content"
            id="article-content"
            className="w-full border-2"
            rows={20}
            defaultValue={article.content}
            placeholder={article.content}
          />
        </div>
        <div className="flex items-center justify-end">
          {state.errors?.content &&
            state.errors.content.map((err: string) => (
              <p key={err} className="text-sm text-red-500">
                {err}&nbsp;
              </p>
            ))}
          <button className="px-4 py-1 bg-yellow-200 border-2">✎ 수정</button>
        </div>
      </div>
    </form>
  );
}
