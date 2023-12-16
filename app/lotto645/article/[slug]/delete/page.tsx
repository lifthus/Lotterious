"use client";

import { deleteArticle } from "@/app/lib/article/action-article";
import { getCodeFromSlug } from "@/app/lib/article/slug";
import { useFormStatus } from "react-dom";

export default function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { pending } = useFormStatus();
  const { code } = getCodeFromSlug(slug);
  return (
    <main className="flex min-h-screen flex-col items-center">
      <form action={deleteArticle}>
        <div className="flex flex-col justify-center items-center">
          <input type="hidden" name="code" value={code} />
          <label htmlFor="password">비밀번호</label>
          <input
            id="password"
            type="password"
            name="password"
            className="border-2 rounded-md m-2"
            aria-disabled={pending}
          />
          <button
            type="submit"
            className="bg-yellow-300 rounded-md px-2 hover:bg-yellow-200"
          >
            X 삭제
          </button>
        </div>
      </form>
    </main>
  );
}
