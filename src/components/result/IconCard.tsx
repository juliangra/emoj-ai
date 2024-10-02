import { IconResult } from "@/types";
import IconCardCopyOverlay from "./IconCardCopyOverlay";

interface IconCardProps {
  result: IconResult;
}

export default function IconCard({ result }: IconCardProps) {
  const {
    icon_name: name,
    icon_description: description,
    icon_emoji: emoji,
  } = result;

  return (
    <div className="group card w-64 bg-base-300 p-4 rounded-box grid min-h-20 flex-grow place-items-center text-center relative">
      <IconCardCopyOverlay emoji={emoji} />
      <span className="text-3xl">{emoji}</span>
      <span className="text-xs uppercase font-semibold">{name}</span>
      <div className="divider w-5/6 m-0"></div>
      <span className="text-xs">{description}</span>
    </div>
  );
}
