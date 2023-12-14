import { fetchArticleByCode } from "@/app/lib/article/fetch";
import { getCodeFromSlug } from "@/app/lib/article/slug";
import NotFound from "@/app/not-found";
import { FullClientTime } from "@/app/ui/article/clientTime";
import CommentArea from "@/app/ui/article/comment-area";
import Link from "next/link";

export default async function Article({ slug }: { slug: string }) {
  const { code, title } = getCodeFromSlug(slug);
  const artc = await fetchArticleByCode(code);
  if (artc.title !== title) {
    return (
      <>
        <NotFound />
        <br />
      </>
    );
  }
  return (
    <div className="w-[70vw]">
      <h1 className="text-3xl font-semibold w-full text-left p-2 rounded-t-lg border-2">
        {artc.title}
      </h1>
      <div className="flex w-full items-center bg-gray-100 px-3">
        by&nbsp;<p className="font-semibold">{artc.author_nickname}</p>
        <p className="text-xs text-gray-500">({artc.author_ip_addr})</p>{" "}
        <FullClientTime className="text-sm ml-auto" date={artc.created_at} />
      </div>
      <div className="w-full p-2 border-x-2 border-dashed">
        {artc.content}
        <div className="grid grid-cols-3 justify-center items-center">
          <div className="col-start-3 col-end-4 justify-self-end">
            <Link href={`/lotto645/article/${slug}/edit`}>
              <button className="border-2 mx-1 rounded-md hover:bg-yellow-200">
                ✎ 수정
              </button>
            </Link>
            <Link href={`/lotto645/article/${slug}/delete`}>
              <button className="border-2 mx-1 rounded-md hover:bg-red-400">
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
