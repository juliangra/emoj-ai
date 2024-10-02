"use client";

import { generateEmojiRecommendations } from "@/actions/recommend/action";
import { useFormState } from "react-dom";
import GenerateEmojisForm from "./form/GenerateEmojisForm";
import GeneratedEmojisResults from "./result/GeneratedEmojisResults";
import { useEffect } from "react";
import { toast } from "sonner";

const initialState = {
  query: "",
};

export default function GenerateEmojis() {
  const [state, handleSubmit] = useFormState(
    // @ts-expect-error No proper docs could tell me how to do this correctly
    generateEmojiRecommendations,
    initialState,
  );

  useEffect(() => {
    if (!state.error) return;

    toast.error("An error occurred", {
      important: true,
      description: state.error,
      duration: 5000,
    });
  }, [state]);

  return (
    <>
      <div className="flex space-x-4 justify-center !mt-0">
        <form action={handleSubmit}>
          <GenerateEmojisForm />
        </form>
      </div>

      <GeneratedEmojisResults results={state.result} />
    </>
  );
}
