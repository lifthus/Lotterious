export default async function Page() {
  return (
    <main className="flex flex-col min-h-screen items-center">
      <div>
        <div>
          <div className="flex">
            <input type="checkbox" /> 역대 당첨 번호 제외
          </div>
          <div className="flex">
            <input type="checkbox" />{" "}
            <input
              type="number"
              className="border w-10 text-center"
              min="2"
              max="6"
            />
            개 이상 연속하는 수 제외
          </div>
          <div className="flex">
            <input type="checkbox" />{" "}
            <input
              type="number"
              className="border w-10 text-center"
              min="2"
              max="6"
            />
            개 이상 연속하는 배수 제외
          </div>
          <div className="flex">
            <input type="checkbox" /> 범위&nbsp;
            <input type="number" className="border w-10 text-center" />
            &nbsp;내에&nbsp;
            <input type="number" className="border w-10 text-center" />개 이상
            몰린 수 제외
          </div>
        </div>
      </div>
    </main>
  );
}
