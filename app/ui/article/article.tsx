import { likeArticle } from "@/app/lib/article/action-article";
import { fetchArticleByCode } from "@/app/lib/article/fetch-article";
import { getCodeFromSlug } from "@/app/lib/article/slug";
import { FullClientTime } from "@/app/ui/article/clientTime";
import CommentArea from "@/app/ui/article/comment-area";
import FormButton from "@/app/ui/form-button";
import { VerifiedLotto645Nums } from "@/app/ui/lotto645/verified-lotto";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Article({ slug }: { slug: string }) {
  const { code, title } = getCodeFromSlug(slug);
  const artc = await fetchArticleByCode(code);
  if (!artc || artc.title !== title) {
    return notFound();
  }
  return (
    <div className="w-[95vw] md:w-[70vw]">
      <h1 className="w-full p-2 text-xl font-semibold text-left border-2 rounded-t-lg md:text-3xl">
        {artc.title}
      </h1>
      <div className="flex flex-col items-center justify-center pb-3 bg-gray-100">
        <div className="flex items-center w-full px-3">
          by&nbsp;<p className="font-semibold">{artc.author_nickname}</p>
          <p className="text-xs text-gray-500">({artc.author_ip_addr})</p>{" "}
          <FullClientTime className="ml-auto text-sm" date={artc.created_at} />
        </div>
        <div>
          {!!artc.verifiedLotto645 && (
            <VerifiedLotto645Nums lotto645={artc.verifiedLotto645} />
          )}
        </div>
      </div>
      <div className="w-full p-2 border-dashed border-x-2">
        {artc.content}
        <div className="grid items-center justify-center grid-cols-3 mt-4">
          <div className="col-start-2 col-end-3 justify-self-center">
            <form action={likeArticle}>
              <input type="hidden" name="articleCode" value={artc.code} />
              <FormButton className="p-2 bg-gray-100 border-2 rounded-lg hover:bg-gray-200">
                <p className="text-yellow-700">👍 {artc.like_count}</p>
              </FormButton>
            </form>
          </div>
          <div className="col-start-3 col-end-4 justify-self-end">
            <Link href={`/lotto645/article/${encodeURIComponent(slug)}/edit`}>
              <button className="mr-1 border-2 rounded-md md:mx-1 hover:bg-yellow-200">
                ✎ 수정
              </button>
            </Link>
            <Link href={`/lotto645/article/${encodeURIComponent(slug)}/delete`}>
              <button className="border-2 rounded-md md:mx-1 hover:bg-red-400">
                🗑 삭제
              </button>
            </Link>
          </div>
        </div>
      </div>
      <CommentArea code={code} />
    </div>
  );
}
