"use client";

import { useRef, useState } from "react";

type TypingResult = {
  value: string;
  correct: boolean;
};

type TypedText = Record<number, TypingResult[]>;

const quote =
  "My mama always said life was like a box of chocolates. You never know what you're gonna get.";

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
      inputCharacters.join(" ").trim().length > 1
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
        60;
      console.log(typingDuration);
      const typingSpeed = typingDuration / splitQuote.length;
      console.log("typingSpeed", typingSpeed);
      typingStartedAt.current = null;
      console.log("End of quote");
    }
  };

  return (
    <>
      <div>
        {Object.values(typedText).map((word, index) =>
          word.map((letter, index2) => (
            <span
              style={{ color: letter.correct ? "green" : "red" }}
              key={index + index2}
            >
              {letter.value}
            </span>
          ))
        )}
      </div>
      <div>{quote}</div>
      <textarea className="text-black" onChange={handleInputChange} />
      <div>User input</div>
    </>
  );
};
