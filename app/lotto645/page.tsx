import ArticleBoard from "@/app/ui/article/article-board";
import LottoDisplay, {
  LottoDisplaySkeleton,
} from "@/app/ui/lotto645/lotto-display";
import Link from "next/link";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Suspense fallback={<LottoDisplaySkeleton />}>
        <LottoDisplay />
      </Suspense>
      <div className="flex mb-1 mt-4 w-full">
        <Link href="/lotto645/article/create" className="ml-auto">
          <button className="bg-yellow-300 rounded-md px-2 text-lg border-dashed border-2 hover:bg-yellow-200">
            📝글쓰기
          </button>
        </Link>
      </div>
      <ArticleBoard board={"lotto645"} />
    </main>
  );
}
