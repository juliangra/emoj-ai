export default function Hero() {
  return (
    <div className="text-center">
      <h1 className="text-5xl xs:text-7xl mb-0 space-x-2">
        <span className="logo-emojis">🥰</span>
        <span>EmojAI</span>
        <span className="logo-emojis">🤖</span>
      </h1>
      <p className="max-w-80 sm:max-w-full">
        Utilise the power of{" "}
        <span className="tracking-wider font-bold badge badge-neutral">
          ✨AI ✨
        </span>{" "}
        to recommend emojis for your text!
      </p>
    </div>
  );
}
