import Lotto645Generator from "@/app/ui/lotto645/generator";

export default async function Page() {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <div>
        <Lotto645Generator />
      </div>
    </main>
  );
}
