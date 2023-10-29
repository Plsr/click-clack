"use client";

import { TypingInput } from "@/components/TypingInput";
import { TypingResults } from "@/components/TypingResults";
import { TestResult } from "@/types/testResult";
import { calculateWpm } from "@/util/statistics";
import { useState } from "react";

const quote =
  "My a mama always said life was like a box of chocolates. You never know what you're gonna get.";

export default function Home() {
  const [displayState, setDisplayState] = useState<"test" | "result">("test");
  const [wpm, setWpm] = useState<number>(85);

  const splitQuote = quote.split(" ");

  const handleTypingFinished = (result: TestResult) => {
    console.log("typing finished");
    console.log(result);
    setWpm(
      calculateWpm(result.startedAt, result.finishedAt, splitQuote.length)
    );
    setDisplayState("result");
  };

  const handleRestartButtonClick = () => {
    setDisplayState("test");
  };

  return (
    <main className="flex items-center justify-center flex-col h-screen">
      {displayState === "test" && (
        <TypingInput onFinish={handleTypingFinished} quote={splitQuote} />
      )}
      {displayState === "result" && (
        <>
          <TypingResults wpm={wpm} />
          <button
            onClick={handleRestartButtonClick}
            className="mt-4 font-sm rounded bg-stone-600 px-2 py-1"
          >
            Restart test
          </button>
        </>
      )}
    </main>
  );
}
