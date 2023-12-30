import LottoDisplay from "@/app/ui/lotto645/lotto-display";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center md:p-24">
      <p className="text-xl font-bold">동행복권 Lotto 6/45</p>
      <LottoDisplay />
      <p className="m-6 text-xl">Welcome to Lotterious!</p>
    </main>
  );
}
