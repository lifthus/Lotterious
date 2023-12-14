import { pg } from "@/db/pool";

export async function POST(request: Request) {
  const { code, password } = await request.json();

  const artcData = await pg.query(
    `SELECT author_password FROM articles WHERE code=$1`,
    [code]
  );
  const artc = artcData.rows[0];

  if (artc.author_password !== password) {
    return new Response(
      JSON.stringify({ message: "비밀번호가 일치하지 않습니다." }),
      { status: 403 }
    );
  }
  return new Response();
}
