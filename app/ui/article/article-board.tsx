import {
  fetchArticlesPages,
  fetchFilteredArticlesOutline,
} from "@/app/lib/article/fetch-article";
import { ClientTime } from "@/app/ui/article/clientTime";
import Pagination from "@/app/ui/article/pagination";
import Link from "next/link";

export default async function ArticleBoard({
  board,
  query,
  currentPage,
}: {
  board: string;
  query: string;
  currentPage: number;
}) {
  const totalPages = await fetchArticlesPages(board, query);
  const artcsOutline = await fetchFilteredArticlesOutline(
    board,
    query,
    currentPage
  );
  const today = new Date();

  const searchParams = new URLSearchParams();
  searchParams.set("query", query);
  searchParams.set("page", currentPage.toString());
  const queryString = searchParams.toString();

  return (
    <div className="flex flex-col">
      <table className="border-collapse w-[70vw] hidden md:block">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-2 whitespace-nowrap">제목</th>
            <th className="px-2 whitespace-nowrap">닉네임</th>
            <th className="px-2 whitespace-nowrap">작성일</th>
            <th className="px-2 whitespace-nowrap">추천</th>
          </tr>
        </thead>
        <tbody>
          {artcsOutline.map((ol) => {
            return (
              <tr className="border-t-2" key={ol.code}>
                <td className="pl-4 w-[70%]">
                  <Link
                    href={`/${board}/article/${
                      encodeURIComponent(ol.title) + "code" + ol.code
                    }?${queryString}`}
                    className="flex hover:cursor-pointer w-full items-center"
                  >
                    {ol.verified && (
                      <p className="text-xs text-gray-400">[인증]</p>
                    )}
                    <p>{ol.title}</p>
                    {ol.comment_count != 0 && (
                      <p className="text-xs text-gray-500">
                        [{ol.comment_count}]
                      </p>
                    )}
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
                <td className="flex items-center justify-center">
                  <p className="text-sm text-gray-500">{ol.like_count}</p>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr className="bg-gray-100">
            <td className="p-2 text-center" colSpan={4}>
              <Pagination totalPages={totalPages} />
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="border-t-2 md:hidden">
        {artcsOutline.map((ol) => {
          return (
            <Link
              href={`/${board}/article/${
                encodeURIComponent(ol.title) + "code" + ol.code
              }?${queryString}`}
              className="flex hover:cursor-pointer items-center"
            >
              <div className="border-b-2 w-[95vw]">
                <div className="flex items-center pb-1">
                  {ol.verified && (
                    <p className="text-xs text-gray-400">[인증]</p>
                  )}
                  {ol.title}
                  {ol.comment_count != 0 && (
                    <p className="text-xs text-gray-500">
                      [{ol.comment_count}]
                    </p>
                  )}
                </div>
                <div className="flex items-center">
                  <p className="text-xs">{ol.author_nickname}</p>
                  <p className="text-xs text-gray-400">({ol.author_ip_addr})</p>
                  <p className="ml-auto text-xs">👍{ol.like_count}</p>
                  <ClientTime
                    className="flex text-xs whitespace-nowrap justify-center ml-2"
                    today={today}
                    date={ol.created_at}
                  />
                </div>
              </div>
            </Link>
          );
        })}
        <div className="flex w-full justify-center my-1">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
