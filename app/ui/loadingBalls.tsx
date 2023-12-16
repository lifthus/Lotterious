export default function LoadingBalls() {
  return (
    <div className={`flex`}>
      <div
        className={`bg-gray-400 w-10 h-10 rounded-full animate-[bounce_1s_infinite_0ms]`}
      ></div>
      <div
        className={`bg-gray-500 w-10 h-10 rounded-full mx-2 animate-[bounce_1s_infinite_100ms]`}
      ></div>
      <div
        className={`bg-gray-600 w-10 h-10 rounded-full animate-[bounce_1s_infinite_200ms]`}
      ></div>
    </div>
  );
}
