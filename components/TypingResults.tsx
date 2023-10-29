type TypingResultsProps = {
  wpm: number;
};

export const TypingResults = ({ wpm }: TypingResultsProps) => {
  return (
    <div className="flex items-center flex-col">
      <h2 className="text-lg font-bold">Your results</h2>
      <div>{wpm} wpm</div>
    </div>
  );
};
