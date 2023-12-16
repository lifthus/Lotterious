import { fetchArticleByCode } from "@/app/lib/article/fetch";
import { getCodeFromSlug } from "@/app/lib/article/slug";
import Form from "@/app/ui/article/edit-article-form";
import { notFound } from "next/navigation";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  slug = decodeURIComponent(slug);
  const { code, title } = getCodeFromSlug(slug);
  const artc = await fetchArticleByCode(code);
  if (!artc) return notFound();
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Form article={artc} />
    </main>
  );
}
