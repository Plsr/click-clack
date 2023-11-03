"use client";

import { calculateWpm } from "@/util/statistics";
import { TypingInput } from "./TypingInput";
import { TypingResults } from "./TypingResults";
import { TestResult } from "@/types/testResult";
import { useState } from "react";

type TypingTestProps = {
  quote: string[];
};

export const TypingTest = ({ quote }: TypingTestProps) => {
  const [displayState, setDisplayState] = useState<"test" | "result">("test");
  const [wpm, setWpm] = useState<number>(85);

  const handleTypingFinished = (result: TestResult) => {
    console.log("typing finished");
    console.log(result);
    setWpm(calculateWpm(result.startedAt, result.finishedAt, quote.length));
    setDisplayState("result");
  };

  const handleRestartButtonClick = () => {
    setDisplayState("test");
  };

  return (
    <>
      {displayState === "test" && (
        <TypingInput onFinish={handleTypingFinished} quote={quote} />
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
    </>
  );
};
