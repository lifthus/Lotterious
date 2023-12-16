"use client";

import { createArticle } from "@/app/lib/article/action-article";
import { useFormState } from "react-dom";

export default function Form({ board }: { board: string }) {
  const initialState = { errors: {}, message: null };
  const [state, dispatch] = useFormState(createArticle, initialState);
  return (
    <form action={dispatch}>
      <div className="rouned-md bg-gray-100 p-4">
        <div className="text-lg flex flex-col">
          <input type="hidden" name="board" value={board} />
          <div className="flex items-center">
            <label htmlFor="article-title" className="mr-2 font-semibold">
              제목
            </label>
            {state.errors?.title &&
              state.errors.title.map((err: string) => (
                <p className="text-red-500 text-sm">{err}&nbsp;</p>
              ))}
          </div>
          <input
            name="title"
            id="article-title"
            type="text"
            className="md:w-[35rem] border-2"
          />
        </div>
        <div className="flex mt-2">
          <div className="ml-auto flex items-center">
            {state.errors?.nickname &&
              state.errors.nickname.map((err: string) => (
                <p className="text-red-500 text-sm">{err}&nbsp;</p>
              ))}
            {(!state.errors?.nickname || state.errors.nickname.length < 1) &&
              state.errors?.password &&
              state.errors.password.map((err: string) => (
                <p className="text-red-500 text-sm">{err}&nbsp;</p>
              ))}
          </div>
          <label
            htmlFor="author-nickname"
            className="mr-1 font-semibold flex items-center"
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
        <div className="flex justify-end items-center">
          {state.errors?.content &&
            state.errors.content.map((err: string) => (
              <p className="text-red-500 text-sm">{err}&nbsp;</p>
            ))}
          <button className="bg-yellow-200 px-4 py-1 border-2">✎ 작성</button>
        </div>
      </div>
    </form>
  );
}
