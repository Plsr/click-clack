"use client";

import { TestResult } from "@/types/testResult";
import { TypedLetter, TypedText } from "@/types/typedText";
import { useRef, useState } from "react";

type TypingInputProps = {
  onFinish: (result: TestResult) => void;
  quote: string[];
};

export const TypingInput = ({ onFinish, quote }: TypingInputProps) => {
  const splitQuote = quote;

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [typedText, setTypedText] = useState<TypedText>({});
  const typingStartedAt = useRef<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputValue = event.target.value;
    const inputCharacters = inputValue.split("");
    const targetCharacters = splitQuote[currentWordIndex];

    if (!typingStartedAt.current) {
      typingStartedAt.current = new Date().toISOString();
    }

    if (
      inputCharacters[inputCharacters.length - 1] === " " &&
      inputCharacters.join("").trim().length > 0
    ) {
      console.log("eow");
      event.target.value = "";
      setCurrentWordIndex(currentWordIndex + 1);
    }

    let results: TypedLetter[] = [];
    for (let i = 0; i < inputCharacters.length; i++) {
      // User typed more characters than the word is long
      if (i > targetCharacters.length) {
        results.push({
          value: inputCharacters[i],
          correct: inputCharacters[i] === targetCharacters[i],
        });
        return;
      }

      results.push({
        value: inputCharacters[i],
        correct: inputCharacters[i] === targetCharacters[i],
      });
    }

    setTypedText({ ...typedText, [currentWordIndex]: results });

    // End of quote
    if (
      currentWordIndex === splitQuote.length - 1 &&
      results.length === splitQuote[currentWordIndex].length
    ) {
      const typingEndedAt = new Date().toISOString();
      onFinish({
        userInput: typedText,
        startedAt: typingStartedAt.current,
        finishedAt: typingEndedAt,
      });
    }
  };

  return (
    <>
      <div className="font-mono flex">
        {splitQuote.map((word, index) => (
          <>
            {word.split("").map((letter, index2) => {
              const letterTyped = typedText[index]?.[index2];

              let color = "grey";

              if (letterTyped) {
                color = letterTyped.correct ? "white" : "red";
              }

              let isCurrentLetter = false;
              let isTrailingSpace = false;
              const isCurrentWord = currentWordIndex === index;
              if (isCurrentWord) {
                isCurrentLetter =
                  typedText[index]?.length === index2 ||
                  (!typedText[index] && index2 === 0);

                isTrailingSpace =
                  typedText[index]?.length > index2 &&
                  index2 === splitQuote[index].length - 1;
              }

              return (
                <div
                  className="inline-flex flex-row items-center h-[24px]"
                  key={`${index}${index2}`}
                >
                  {isCurrentLetter && (
                    <div className="w-[2px] h-[18px] bg-slate-400 animate-pulse" />
                  )}
                  <span style={{ color }}>{letter}</span>
                  {isTrailingSpace && (
                    <div className="w-[2px] h-[18px] bg-slate-400 animate-pulse" />
                  )}
                </div>
              );
            })}{" "}
            <div className="inline-block w-[8px] shrink-0" />
          </>
        ))}
      </div>
      <textarea
        style={{
          position: "absolute",
          zIndex: "-1",
          width: "1px",
          height: "1px",
        }}
        autoFocus
        onChange={handleInputChange}
      />
    </>
  );
};
