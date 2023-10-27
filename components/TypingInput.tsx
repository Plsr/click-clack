"use client";

import { useRef, useState } from "react";

type TypingResult = {
  value: string;
  correct: boolean;
};

type TypedText = Record<number, TypingResult[]>;

const quote =
  "My a mama always said life was like a box of chocolates. You never know what you're gonna get.";

export const TypingInput = () => {
  const splitQuote = quote.split(" ");

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

    //if (inputCharacters.length < 1) {
    //  return;
    //}

    if (
      inputCharacters[inputCharacters.length - 1] === " " &&
      inputCharacters.join("").trim().length > 0
    ) {
      console.log("eow");
      event.target.value = "";
      setCurrentWordIndex(currentWordIndex + 1);
    }

    let results: TypingResult[] = [];
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
      const typingDuration =
        (new Date(typingEndedAt).getTime() -
          new Date(typingStartedAt.current).getTime()) /
        60_000;
      const typingSpeed = splitQuote.length / typingDuration;
      typingStartedAt.current = null;
      console.log("End of quote");
      console.log("typingSpeed", typingSpeed);
      event.target.value = "";
    }
  };

  return (
    <>
      <div>
        {splitQuote.map((word, index) => (
          <>
            {word.split("").map((letter, index2) => {
              const letterTyped = typedText[index]?.[index2];

              let color = "grey";

              if (letterTyped) {
                color = letterTyped.correct ? "green" : "red";
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
                  className="inline-flex flex-row  h-[24px]"
                  key={`${index}${index2}`}
                >
                  {isCurrentLetter && (
                    <div className="w-[2px] h-[18px] bg-slate-400" />
                  )}
                  <span
                    style={{
                      color,
                      // backgroundColor: isCurrentLetter
                      //   ? "lightgrey"
                      //   : "transparent",
                      // textDecoration: isTrailingSpace ? "underline" : "none",
                    }}
                  >
                    {letter}
                  </span>
                  {isTrailingSpace && (
                    <div className="w-[2px] h-[18px] bg-slate-400" />
                  )}
                </div>
              );
            })}{" "}
            <span> </span>
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
      <div>User input</div>
    </>
  );
};
