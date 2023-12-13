import { TypingResults } from "@/components/TypingResults";
import supabase from "@/util/supabase";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const getResult = async (resultId: string) => {
  const supabaseClient = await supabase();
  const { data: result, error } = await supabaseClient
    .from("results")
    .select("*")
    .eq("id", resultId)
    .single();

  if (error) {
    return null;
  }

  return result;
};

export const ResultIdPage = async ({ params }: Props) => {
  const result = await getResult(params.id);

  if (!result) {
    return notFound();
  }

  return (
    <>
      <TypingResults wpm={result.wpm} />
      <Link href="/">New test</Link>
    </>
  );
};

export default ResultIdPage;
