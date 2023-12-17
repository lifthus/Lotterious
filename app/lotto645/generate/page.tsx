import Lotto645Generator from "@/app/ui/lotto645/generator";
import { Metadata } from "next";

export default async function Page() {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <div>
        <Lotto645Generator />
      </div>
    </main>
  );
}

export const metadata: Metadata = {
  title: "로또 번호 생성",
};
