import { EmojiRecommendationResults } from "@/types";
import IconCard from "./IconCard";
import React from "react";

interface GeneratedEmojisResultsProps {
  results?: EmojiRecommendationResults;
}

export default function GeneratedEmojisResults({
  results,
}: GeneratedEmojisResultsProps) {
  if (!results) return <></>;

  return (
    <div className="block lg:flex">
      {Object.values(results).map((result, i) => {
        const isLastResult = i === Object.values(results).length - 1;

        return (
          <React.Fragment key={result.icon_name}>
            <IconCard result={result} />
            {!isLastResult && (
              <div className="divider lg:divider-horizontal">OR</div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
