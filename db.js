// ============================================================
// Supabase 연결 + 단어 데이터 액세스
// (anon public 키는 공개돼도 안전 — RLS로 보호됨)
// ============================================================
const SUPABASE_URL = "https://qwejbebfbwohjdhqivzm.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3ZWpiZWJmYndvaGpkaHFpdnptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA3MDE3NzQsImV4cCI6MjA5NjI3Nzc3NH0.s5czczZcdbatLW0ODh_66UKlQ9kJ2wIoy6wS1NW7teY";

const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 모든 단어 불러오기 (sort_order 순)
async function dbFetchWords() {
  const { data, error } = await sb
    .from("words")
    .select("id, word, phonetic, meanings, sort_order")
    .order("sort_order", { ascending: true });
  if (error) {
    console.error("[Supabase] 단어 로드 실패:", error.message);
    return [];
  }
  return data || [];
}

// 단어 추가 (뜻은 비워둠 → 이후 보강). 새 sort_order는 맨 뒤로.
async function dbAddWord(word) {
  const { data: maxRow } = await sb
    .from("words")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();
  const nextOrder = (maxRow?.sort_order || 0) + 1;
  const { data, error } = await sb
    .from("words")
    .insert({
      word: word,
      meanings: [{ pos: "추가됨", definition: "뜻 보강 대기 중" }],
      sort_order: nextOrder,
    })
    .select()
    .single();
  if (error) console.error("[Supabase] 추가 실패:", error.message);
  return { data, error };
}

// 단어 삭제 (id 기준)
async function dbDeleteWord(id) {
  const { error } = await sb.from("words").delete().eq("id", id);
  if (error) console.error("[Supabase] 삭제 실패:", error.message);
  return { error };
}

// 단어 이름 수정 (id 기준)
async function dbUpdateWord(id, fields) {
  const { error } = await sb.from("words").update(fields).eq("id", id);
  if (error) console.error("[Supabase] 수정 실패:", error.message);
  return { error };
}
