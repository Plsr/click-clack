"use server";

import supabase from "@/util/supabase";

type CreateResultsPayload = {
  quoteId: number;
  wpm: number;
  errorRate?: number;
};

export const createResults = async (results: CreateResultsPayload) => {
  const supabaseClient = await supabase();
  const { data: result, error } = await supabaseClient
    .from("results")
    .insert({
      wpm: results.wpm,
      errorRate: results.errorRate,
      quote_id: results.quoteId,
    })
    .select()
    .single();

  if (error) {
    // TODO: Do something useful
    console.log("error", error);
    throw new Error("Error creating results");
  }

  return result.id;
};
