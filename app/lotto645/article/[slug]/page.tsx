import Article from "@/app/ui/article/article";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const codeIdx = slug.lastIndexOf("code");
  const code = slug.slice(codeIdx + 4);

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Article code={code} />
    </main>
  );
}
