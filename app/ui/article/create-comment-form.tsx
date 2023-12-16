"use client";

import { createComment } from "@/app/lib/article/action-comment";
import { useFormState } from "react-dom";

export default function Form({ code }: { code: string }) {
  const initialState = { errors: {}, message: null };
  const [state, dispatch] = useFormState(createComment, initialState);
  return (
    <div>
      <form action={dispatch}>
        <input type="hidden" name="code" value={code} />
        <div className="flex bg-gray-100 p-2 items-center">
          <label htmlFor="comment_nickname" className="font-semibold text-sm">
            닉네임
          </label>
          <input
            name="nickname"
            id="comment_nickname"
            type="text"
            className="w-[7rem] mx-1 rounded-sm border-gray-200 border-2 px-2 text-sm"
          />
          <label htmlFor="comment_password" className="font-semibold text-sm">
            비밀번호
          </label>
          <input
            name="password"
            id="comment_password"
            type="password"
            className="w-[7rem] mx-1 rounded-sm border-gray-200 border-2 px-2 text-sm"
            placeholder="********"
          />
          <div className="flex">
            {state.errors?.nickname &&
              state.errors.nickname.map((err) => {
                return (
                  <p key={err} className="text-red-500 text-sm">
                    {err}&nbsp;
                  </p>
                );
              })}
            {(!state.errors?.nickname || state.errors.nickname.length < 1) &&
              state.errors?.password &&
              state.errors.password.map((err) => {
                return (
                  <p key={err} className="text-red-500 text-sm">
                    {err}&nbsp;
                  </p>
                );
              })}
            {(!state.errors?.nickname || state.errors.nickname.length < 1) &&
              (!state.errors?.password || state.errors.password.length < 1) &&
              state.errors?.content &&
              state.errors.content.map((err) => {
                return (
                  <p key={err} className="text-red-500 text-sm">
                    {err}&nbsp;
                  </p>
                );
              })}
          </div>
          <button
            type="submit"
            className="ml-auto bg-yellow-300 p-1 rounded-md border-2 hover:bg-yellow-200"
          >
            ✎ 작성
          </button>
        </div>
        <div className="p-1 bg-gray-100">
          <textarea
            name="content"
            className="w-full border-2 border-gray-200 rounded-sm p-1 leading-4 text-sm"
            rows={3}
          />
        </div>
      </form>
    </div>
  );
}
