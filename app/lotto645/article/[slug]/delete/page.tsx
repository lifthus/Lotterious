export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div>Delete form</div>
    </main>
  );
}
