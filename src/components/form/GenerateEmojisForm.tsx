import { useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

export default function GenerateEmojisForm() {
  const { pending } = useFormStatus();

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === "k") {
        event.preventDefault();
        ref.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="flex space-x-2 sm:space-x-4">
      <label className="input input-bordered flex items-center sm:gap-2">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          name="query"
          required
          ref={ref}
        />
        <kbd className="kbd kbd-sm hidden sm:block">⌘</kbd>
        <kbd className="kbd kbd-sm hidden sm:block">K</kbd>
      </label>
      <button className="btn btn-secondary" disabled={pending}>
        {pending ? (
          <>
            Loading
            <span className="loading loading-spinner loading-md"></span>
          </>
        ) : (
          "Search 🔍"
        )}{" "}
      </button>
    </div>
  );
}
