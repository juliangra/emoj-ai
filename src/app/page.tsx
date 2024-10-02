import GenerateEmojis from "@/components/GenerateEmojis";
import Hero from "@/components/layout/Hero";

export default async function Home() {
  return (
    <div className="min-h-screen lg:h-[70vh] w-screen flex items-center justify-center flex-col space-y-9 my-12 xs:my-0">
      <Hero />
      <GenerateEmojis />
    </div>
  );
}
