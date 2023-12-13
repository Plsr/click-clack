"use client";

import { calculateWpm } from "@/util/statistics";
import { TypingInput } from "./TypingInput";
import { TestResult } from "@/types/testResult";
import { useRouter } from "next/navigation";
import { createResults } from "@/app/actions";

type TypingTestProps = {
  quote: string[];
  quoteId: number;
};

// TODO: Display loading state upon typing finished
export const TypingTest = ({ quote, quoteId }: TypingTestProps) => {
  const router = useRouter();

  const handleTypingFinished = async (result: TestResult) => {
    const wpm = calculateWpm(result.startedAt, result.finishedAt, quote.length);
    const resultId = await createResults({ wpm, quoteId });
    router.push(`/results/${resultId}`);
  };

  return <TypingInput onFinish={handleTypingFinished} quote={quote} />;
};
