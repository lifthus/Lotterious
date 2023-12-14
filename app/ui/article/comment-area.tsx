import { fetchComments } from "@/app/lib/article/fetch";
import { getCodeFromSlug } from "@/app/lib/article/slug";
import { FullClientTime } from "@/app/ui/article/clientTime";
import Form from "@/app/ui/article/create-comment-form";

export default async function CommentArea({ code }: { code: string }) {
  const comments = await fetchComments(code);
  return (
    <div>
      <div className="bg-gray-100 flex p-2 pb-0">
        <p className="font-semibold">댓글</p>
        <p className="text-sm text-gray-500">{comments.length}</p>
      </div>
      <Form code={code} />
      <div>
        {comments.map((cmnt) => {
          return (
            <div className="border-x-2 border-b-2" key={cmnt.id}>
              <div className="flex items-center border-b-2 border-dotted px-2">
                <div className="flex items-center mx-1">
                  by&nbsp;
                  <p className="text-sm font-semibold">
                    {cmnt.author_nickname}
                  </p>
                  <p className="text-xs text-gray-400">
                    ({cmnt.author_ip_addr})
                  </p>
                </div>
                <FullClientTime
                  className="text-sm ml-auto"
                  date={cmnt.created_at}
                />
              </div>
              <p className="text-sm px-2">{cmnt.content}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
