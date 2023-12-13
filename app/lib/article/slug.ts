export function getCodeFromSlug(slug: string) {
  const codeIdx = slug.lastIndexOf("code");
  if (codeIdx === -1) return { code: "", title: "" };
  const code = slug.slice(codeIdx + 4);
  const title = slug.slice(0, codeIdx);
  return { code, title };
}
