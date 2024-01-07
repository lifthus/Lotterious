import LottoDisplay, {
  LottoDisplaySkeleton,
} from "@/app/ui/lotto645/lotto-display";
import Image from "next/image";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center md:p-24">
      <p className="text-xl font-bold">동행복권 Lotto 6/45</p>
      <Suspense fallback={<LottoDisplaySkeleton />}>
        <LottoDisplay />
      </Suspense>
      <p className="m-6 text-xl">Welcome to Lotterious!</p>
    </main>
  );
}
