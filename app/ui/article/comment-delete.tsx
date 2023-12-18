"use client";

import { deleteComment } from "@/app/lib/article/action-comment";
import FormButton from "@/app/ui/form-button";
import Modal from "@/app/ui/modal";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CommentDelete({ id }: { id: number }) {
  const [delModOpen, setDelModOpen] = useState(false);
  const closeMod = () => setDelModOpen(false);

  const path = usePathname();
  const query = useSearchParams();
  const queryStr = new URLSearchParams(query).toString();
  const redirectURL = path + "?" + queryStr;

  return (
    <div>
      <button
        className="border-2 rounded-sm"
        onClick={() => setDelModOpen(true)}
      >
        🗑️
      </button>
      <Modal isOpen={delModOpen} close={closeMod}>
        <div className="p-5 bg-white rounded-md border-2 ">
          <form action={deleteComment}>
            <div className="flex flex-col items-center justify-center">
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="redirect" value={redirectURL} />
              <label htmlFor="password">비밀번호</label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="********"
                className="text-center border-2 m-2 rounded-md"
              />
              <FormButton className="border-2 rounded-sm bg-yellow-300">
                🗑️ 삭제
              </FormButton>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
