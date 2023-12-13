"use client";

import { createComment } from "@/app/lib/article/action-comment";

export default function Form({ slug }: { slug: string }) {
  return (
    <div>
      <form action={createComment}>
        <input type="hidden" name="slug" value={slug} />
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
