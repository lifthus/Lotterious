import { usePathname } from "next/navigation";

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const codeIdx = slug.lastIndexOf("code");
  const code = slug.slice(codeIdx + 4);
  return <div>{code}</div>;
}
