import Article from "@/app/ui/article/article";
import ArticleBoard from "@/app/ui/article/article-board";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Article slug={slug} />
      <ArticleBoard board={"lotto645"} />
    </main>
  );
}
