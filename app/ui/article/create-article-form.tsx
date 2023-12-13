"use client";

import { createArticle } from "@/app/lib/article/action-article";

export default function Form({ board }: { board: string }) {
  return (
    <form action={createArticle}>
      <div className="rouned-md bg-gray-100 p-4">
        <div className="text-lg flex flex-col">
          <input type="hidden" name="board" value={board} />
          <label htmlFor="article-title" className="mr-2 font-semibold">
            제목
          </label>
          <input
            name="title"
            id="article-title"
            type="text"
            className="md:w-[35rem] border-2"
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
          />
        </div>
        <div className="mt-5">
          <textarea
            name="content"
            id="article-content"
            className="w-full border-2"
            rows={20}
          />
        </div>
        <div className="text-right">
          <button className="bg-yellow-200 px-4 py-1 border-2">✎ 작성</button>
        </div>
      </div>
    </form>
  );
}
