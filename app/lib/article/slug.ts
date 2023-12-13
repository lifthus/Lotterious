export function getCodeFromSlug(slug: string) {
  const codeIdx = slug.lastIndexOf("code");
  if (codeIdx === -1) return "";
  const code = slug.slice(codeIdx + 4);
  return code;
}
