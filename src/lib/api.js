import { supabase } from "./supabase";

/**
 * Fetch courier entries for Reports / Records
 */
export async function getCourierEntries() {
  const { data, error } = await supabase
    .from("courier_entries") // ✅ CORRECT TABLE
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching courier_entries:", error);
    return [];
  }

  console.log("Fetched courier_entries:", data); // debug
  return data || [];
}
