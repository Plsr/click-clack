export const calculateWpm = (
  startTime: string,
  endTime: string,
  wordsCount: number
) => {
  const typingTimeMs =
    new Date(endTime).getTime() - new Date(startTime).getTime();
  const typingTimeMin = typingTimeMs / 60_000;

  // In the case Math.round() would return 0, we at least want 1wpm to display
  return Math.max(Math.round(wordsCount / typingTimeMin), 1);
};
