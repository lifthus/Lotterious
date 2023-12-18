import { deleteComment } from "@/app/lib/article/action-comment";
import { fetchComments } from "@/app/lib/article/fetch-comment";
import { FullClientTime } from "@/app/ui/article/clientTime";
import CommentDelete from "@/app/ui/article/comment-delete";
import Form from "@/app/ui/article/create-comment-form";
import FormButton from "@/app/ui/form-button";

export default async function CommentArea({ code }: { code: string }) {
  const comments = await fetchComments(code);
  return (
    <div>
      <div className="bg-gray-100 flex p-2 pb-0">
        <p className="font-semibold">댓글</p>
        <p className="text-sm text-gray-500">{comments.length}</p>
      </div>
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
                  className="text-sm ml-auto mr-2"
                  date={cmnt.created_at}
                />
                <CommentDelete id={cmnt.id} />
              </div>
              <p className="text-sm px-2">{cmnt.content}</p>
            </div>
          );
        })}
        <Form code={code} />
      </div>
    </div>
  );
}
