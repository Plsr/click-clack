import { TypingInput } from "@/components/TypingInput";
import { TypingResults } from "@/components/TypingResults";
import { TypingTest } from "@/components/TypingTest";
import { TestResult } from "@/types/testResult";
import { calculateWpm } from "@/util/statistics";
import supabase from "@/util/supabase";
import { useState } from "react";

const quote =
  "My a mama always said life was like a box of chocolates. You never know what you're gonna get.";

export default async function Home() {
  const { data: quote, error } = await supabase
    .from("random_quote")
    .select("*")
    .single();

  if (error) {
    // TODO: Do something useful
  }

  return (
    <main className="flex items-center justify-center flex-col h-screen">
      <TypingTest quote={quote.text.split(" ")} />
    </main>
  );
}
