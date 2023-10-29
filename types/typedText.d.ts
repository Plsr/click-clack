export type TypedLetter = {
  value: string;
  correct: boolean;
};

export type TypedText = Record<number, TypedLetter[]>;
