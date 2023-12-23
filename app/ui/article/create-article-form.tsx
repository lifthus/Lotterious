"use client";

import { createArticle } from "@/app/lib/article/action-article";
import { VerifiedLotto645 } from "@/app/lotto645/article/create/verify/route";
import FormButton from "@/app/ui/form-button";
import { VerifiedLotto645Nums } from "@/app/ui/lotto645/verified-lotto";
import Modal from "@/app/ui/modal";
import { useState } from "react";
import { useFormState } from "react-dom";
import { useZxing } from "react-zxing";

export default function Form({ board }: { board: string }) {
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const closeVerifyModal = () => setVerifyModalOpen(false);
  const [QRURL, setQRURL] = useState<string>("");
  const [lotto645, setLotto645] = useState<VerifiedLotto645 | null>(null);

  const initialState = { errors: {}, message: null };
  const [state, dispatch] = useFormState(createArticle, initialState);
  return (
    <form action={dispatch}>
      {QRURL !== "" && <input type="hidden" name="qr_url" value={QRURL} />}
      <div className="rouned-md bg-gray-100 p-4">
        <div className="text-lg flex flex-col">
          <input type="hidden" name="board" value={board} />
          <div className="flex items-center">
            <label htmlFor="article-title" className="mr-2 font-semibold">
              제목
            </label>
            {state.errors?.title &&
              state.errors.title.map((err: string) => (
                <p key={err} className="text-red-500 text-sm">
                  {err}&nbsp;
                </p>
              ))}
          </div>
          <input
            name="title"
            id="article-title"
            type="text"
            className="md:w-[35rem] border-2"
          />
        </div>
        <div className="flex mt-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              setVerifyModalOpen(true);
              setQRURL("");
              setLotto645(null);
            }}
            className="bg-yellow-300 border-2 rounded-md px-1 hover:bg-yellow-200 text-gray-600"
          >
            인증하기
          </button>
          <Modal isOpen={verifyModalOpen} close={closeVerifyModal}>
            <VerifyLotto645
              setLotto645={setLotto645}
              setQRURL={setQRURL}
              close={closeVerifyModal}
            />
          </Modal>
          <div className="ml-auto flex items-center">
            {state.errors?.nickname &&
              state.errors.nickname.map((err: string) => (
                <p key={err} className="text-red-500 text-sm">
                  {err}&nbsp;
                </p>
              ))}
            {(!state.errors?.nickname || state.errors.nickname.length < 1) &&
              state.errors?.password &&
              state.errors.password.map((err: string) => (
                <p key={err} className="text-red-500 text-sm">
                  {err}&nbsp;
                </p>
              ))}
          </div>
          <label
            htmlFor="author-nickname"
            className="mr-1 font-semibold flex items-center"
          >
            닉네임
          </label>
          <input
            name="nickname"
            id="author-nickname"
            type="text"
            className="md:w-[5rem] border-2"
          />
          <label
            htmlFor="author-password"
            className="mr-1 font-semibold flex items-center ml-1"
          >
            비밀번호
          </label>
          <input
            name="password"
            id="author-password"
            type="password"
            className="md:w-[5rem] border-2"
          />
        </div>
        {!!lotto645 && (
          <div className="mt-5 flex items-center justify-center">
            <VerifiedLotto645Nums lotto645={lotto645} />
          </div>
        )}
        <div className="mt-5">
          <textarea
            name="content"
            id="article-content"
            className="w-full border-2"
            rows={20}
          />
        </div>
        <div className="flex justify-end items-center">
          {state.errors?.content &&
            state.errors.content.map((err: string) => (
              <p key={err} className="text-red-500 text-sm">
                {err}&nbsp;
              </p>
            ))}
          <FormButton className="bg-yellow-200 px-4 py-1 border-2">
            ✎ 작성
          </FormButton>
        </div>
      </div>
    </form>
  );
}

function VerifyLotto645({
  setLotto645,
  setQRURL,
  close,
}: {
  setLotto645: (lotto645: VerifiedLotto645) => void;
  setQRURL: (url: string) => void;
  close: () => void;
}) {
  const { ref } = useZxing({
    async onDecodeResult(result) {
      const res = await fetch("/lotto645/article/create/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qr_url: result.getText(),
        }),
      });
      if (res.status !== 200) return;

      setLotto645(await res.json());
      setQRURL(result.getText());
      close();
    },
  });

  return (
    <div className="flex flex-col justify-center items-center bg-white p-10 border-2">
      <p className="text-lg">로또 용지의 QR 코드를 보여주세요.</p>
      <video ref={ref} className="p-2 rounded-3xl" />
    </div>
  );
}
