import { fetchArticle } from "@/app/lib/article/fetch";
import { getCodeFromSlug } from "@/app/lib/article/slug";
import { FullClientTime } from "@/app/ui/article/clientTime";
import CommentArea from "@/app/ui/article/comment-area";

export default async function Article({ slug }: { slug: string }) {
  const code = getCodeFromSlug(slug);
  const artc = await fetchArticle(code);
  return (
    <div className="w-[70vw]">
      <h1 className="text-3xl font-semibold w-full text-left p-2 rounded-t-lg border-2">
        {artc.title}
      </h1>
      <div className="flex w-full items-center bg-gray-100 px-3">
        <p>by {artc.author_nickname}</p>
        <p className="text-xs text-gray-500">({artc.author_ip_addr})</p>{" "}
        <FullClientTime className="text-sm ml-auto" date={artc.created_at} />
      </div>
      <div className="flex w-full p-2 border-x-2 border-dashed pb-10">
        {artc.content}
      </div>
      <CommentArea slug={slug} />
    </div>
  );
}
