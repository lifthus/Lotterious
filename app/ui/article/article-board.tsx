import { fetchArticlesOutline } from "@/app/lib/article/fetch";
import { ClientTime } from "@/app/ui/article/clientTime";
import Link from "next/link";

export default async function ArticleBoard({ board }: { board: string }) {
  const artcsOutline = await fetchArticlesOutline(board);
  const today = new Date();
  return (
    <div className="flex flex-col">
      <table className="border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 rounded-tl-2xl whitespace-nowrap">제목</th>
            <th className="p-2 whitespace-nowrap">닉네임</th>
            <th className="p-2 rounded-tr-2xl whitespace-nowrap">작성일</th>
          </tr>
        </thead>
        <tbody>
          {artcsOutline.map((ol) => {
            return (
              <tr className="border-t-2">
                <td className="w-[30rem] pl-4">
                  <Link
                    key={ol.code}
                    href={`/${board}/article/${ol.title + "code" + ol.code}`}
                    className="hover:cursor-pointer w-full"
                  >
                    <p className="w-full">{ol.title}</p>
                  </Link>
                </td>
                <td className="flex items-center justify-center px-1 whitespace-nowrap">
                  <p className="text-sm">{ol.author_nickname}</p>
                  <p className="text-xs text-gray-500">({ol.author_ip_addr})</p>
                </td>
                <td>
                  <ClientTime
                    className="flex text-xs whitespace-nowrap justify-center"
                    today={today}
                    date={ol.created_at}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100">
            <td className="p-2 rounded-b-2xl text-center" colSpan={3}>
              pagination
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
