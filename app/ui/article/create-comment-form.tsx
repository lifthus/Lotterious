"use client";

import { createComment } from "@/app/lib/article/action-comment";
import FormButton from "@/app/ui/form-button";
import { useFormState } from "react-dom";

export default function Form({ code }: { code: string }) {
  const initialState = { errors: {}, message: null };
  const [state, dispatch] = useFormState(createComment, initialState);
  return (
    <div>
      <form action={dispatch}>
        <input type="hidden" name="code" value={code} />
        <div className="flex items-center p-2 bg-gray-100">
          <label
            htmlFor="comment_nickname"
            className="hidden text-sm font-semibold md:block"
          >
            닉네임
          </label>
          <input
            name="nickname"
            id="comment_nickname"
            type="text"
            className="w-[7rem] mx-1 rounded-sm border-gray-200 border-2 px-2 text-sm"
            placeholder="닉네임"
          />
          <label
            htmlFor="comment_password"
            className="hidden text-sm font-semibold md:block"
          >
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
                  <p key={err} className="text-sm text-red-500">
                    {err}&nbsp;
                  </p>
                );
              })}
            {(!state.errors?.nickname || state.errors.nickname.length < 1) &&
              state.errors?.password &&
              state.errors.password.map((err) => {
                return (
                  <p key={err} className="text-sm text-red-500">
                    {err}&nbsp;
                  </p>
                );
              })}
            {(!state.errors?.nickname || state.errors.nickname.length < 1) &&
              (!state.errors?.password || state.errors.password.length < 1) &&
              state.errors?.content &&
              state.errors.content.map((err) => {
                return (
                  <p key={err} className="text-sm text-red-500">
                    {err}&nbsp;
                  </p>
                );
              })}
          </div>
          <FormButton className="p-1 ml-auto bg-yellow-300 border-2 rounded-md hover:bg-yellow-200">
            ✎ 작성
          </FormButton>
        </div>
        <div className="p-1 bg-gray-100">
          <textarea
            name="content"
            className="w-full p-1 text-sm leading-4 border-2 border-gray-200 rounded-sm"
            rows={3}
          />
        </div>
      </form>
    </div>
  );
}
