"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">무... 무언가 잘못된...</h2>
      <>{error}</>
      <div>{error.message}</div>
      <button
        className="mt-4 rounded-md bg-yellow-400 px-4 py-2 text-sm text-white transition-colors hover:bg-yellow-300"
        onClick={
          // attempt to recover by trying to re-render the route
          () => reset()
        }
      >
        재시도
      </button>
    </main>
  );
}
