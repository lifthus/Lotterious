import Article from "@/app/ui/article/article";
import ArticleBoard from "@/app/ui/article/article-board";

export default async function Page({
  params: { slug },
  searchParams,
}: {
  params: { slug: string };
  searchParams: { query: string; page: string };
}) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page) || 1;
  slug = decodeURIComponent(slug);
  return (
    <main className="flex min-h-screen flex-col items-center space-y-8">
      <Article slug={slug} />
      <ArticleBoard board={"lotto645"} query={query} currentPage={page} />
    </main>
  );
}
