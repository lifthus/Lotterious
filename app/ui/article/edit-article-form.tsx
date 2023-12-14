"use client";

import { editArticle } from "@/app/lib/article/action-article";
import { Article } from "@/app/lib/article/fetch";
import { useState } from "react";

export default function Form({ article }: { article: Article }) {
  const [pw, setPw] = useState("");
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
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            name="password"
            className="border-2 rounded-md m-2"
          />
          <button
            type="submit"
            className="bg-yellow-300 rounded-md px-2 hover:bg-yellow-200"
          >
            ✎ 수정
          </button>
        </div>
      </form>
    );

  const editArticleWithCode = editArticle.bind(null, pw);
  return (
    <form action={editArticleWithCode}>
      <div className="rouned-md bg-gray-100 p-4">
        <div className="text-lg flex flex-col">
          <p className="text-2xl font-semibold mb-2">글 수정</p>
          <input type="hidden" name="code" value={article.code} />
          <label htmlFor="article-title" className="mr-2 font-semibold">
            제목
          </label>
          <input
            name="title"
            id="article-title"
            type="text"
            className="md:w-[35rem] border-2"
            defaultValue={article.title}
            placeholder={article.title}
          />
        </div>
        <div className="flex mt-2">
          <label
            htmlFor="author-nickname"
            className="mr-1 font-semibold flex items-center ml-auto"
          >
            닉네임
          </label>
          <input
            name="nickname"
            id="author-nickname"
            type="text"
            className="md:w-[5rem] border-2"
            defaultValue={article.author_nickname}
          />
          <label
            htmlFor="author-password"
            className="mr-1 font-semibold flex items-center ml-1"
          >
            비밀번호
          </label>
          <input
            name="password"
            id="author-password"
            type="password"
            className="md:w-[5rem] border-2"
            defaultValue={pw}
          />
        </div>
        <div className="mt-5">
          <textarea
            name="content"
            id="article-content"
            className="w-full border-2"
            rows={20}
            defaultValue={article.content}
          />
        </div>
        <div className="text-right">
          <button className="bg-yellow-200 px-4 py-1 border-2">✎ 수정</button>
        </div>
      </div>
    </form>
  );
}
