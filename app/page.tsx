import { TypingTest } from "@/components/TypingTest";
import supabase from "@/util/supabase";
import { notFound } from "next/navigation";

export default async function Home() {
  const supabaseClient = await supabase();
  const { data: quote, error } = await supabaseClient
    .from("random_quote")
    .select("*")
    .single();

  if (error) {
    // TODO: Do something useful
    return notFound();
  }

  return (
    <main className="flex items-center justify-center flex-col h-screen">
      <TypingTest quoteId={quote.id} quote={quote.text.split(" ")} />
    </main>
  );
}
