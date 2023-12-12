import LottoDisplay, {
  LottoDisplaySkeleton,
} from "@/app/ui/lotto645/lotto-display";
import { Suspense } from "react";

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Suspense fallback={<LottoDisplaySkeleton />}>
        <LottoDisplay />
      </Suspense>
    </main>
  );
}
