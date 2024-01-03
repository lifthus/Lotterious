import ArticleBoard from "@/app/ui/article/article-board";
import LottoDisplay, {
  LottoDisplaySkeleton,
} from "@/app/ui/lotto645/lotto-display";
import Link from "next/link";
import { Suspense } from "react";

export default function Page({
  searchParams,
}: {
  searchParams: { query: string; page: string };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <main className="flex flex-col items-center min-h-screen">
      <Suspense fallback={<LottoDisplaySkeleton />}>
        <LottoDisplay />
      </Suspense>
      <div>
        <div className="flex w-full mt-4 mb-1">
          <Link href="/lotto645/article/create" className="ml-auto">
            <button className="px-2 text-lg bg-yellow-300 border-2 border-dashed rounded-md hover:bg-yellow-200">
              📝글쓰기
            </button>
          </Link>
        </div>
        <ArticleBoard
          board={"lotto645"}
          query={query}
          currentPage={currentPage}
        />
      </div>
    </main>
  );
}
