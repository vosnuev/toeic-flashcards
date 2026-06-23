# TOEIC Flashcard App (토익 단어 암기 플래시카드)

> A Progressive Web App for memorizing TOEIC vocabulary, optimized for iPhone and iPad. (토익 영어 단어를 플래시카드 방식으로 암기하는 PWA 앱)

## 🛠️ Tech Stack (기술 스택)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=flat&logo=netlify&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=pwa&logoColor=white)

| Layer | Technology |
|---|---|
| Frontend | Vanilla HTML/CSS/JavaScript (no framework) |
| Database | Supabase (PostgreSQL, JSONB for meanings) |
| API | Vercel Serverless Functions (Node.js) |
| Hosting | Netlify (static) + Vercel (API) |
| PWA | Web App Manifest (`manifest.json`) |
| Dev Server | Node.js built-in HTTP (`server.js`) |

## ✨ Features (주요 기능)

- **Flashcard study mode** — flip cards to reveal definitions, phonetics, part-of-speech badges, TOEIC notes, etymology, example sentences (EN/KO), and synonyms. (카드 뒤집기로 뜻·발음·예문·동의어 확인)
- **Test mode** — show a word, self-grade with ○/✕ buttons. (단어 제시 후 O/X 자가 채점)
- **Mastered tracking** — mark words as mastered; count is persisted in `localStorage`. (암기 완료 표시 및 localStorage 저장)
- **Voice input** — add new words by speaking via Web Speech API (`webkitSpeechRecognition`). (음성 입력으로 단어 일괄 추가)
- **Word management** — edit and delete words from a management list view. (단어 목록에서 수정·삭제)
- **Dark mode** — respects `prefers-color-scheme: dark`. (시스템 다크 모드 자동 적용)
- **iPhone layout** (`index.html`) — safe-area insets, fixed bottom nav, tap zones for prev/next. (아이폰 안전 영역·하단 탭바 최적화)
- **iPad layout** (`ipad.html`) — wider card area adjusted for iPad screen proportions. (아이패드 화면 비율 조정)
- **Dynamic font sizing** — word font scales down automatically for long words. (긴 단어 자동 폰트 축소)

## 📁 Project Structure (프로젝트 구조)

```
toeic-flashcards/
├── index.html          # iPhone-optimized flashcard UI (아이폰 최적화 메인 화면)
├── ipad.html           # iPad-adjusted variant of index.html (아이패드 레이아웃 변형)
├── db.js               # Browser-side API client — fetch/add/update/delete words (브라우저용 API 클라이언트)
├── supabaseClient.js   # Initializes Supabase JS SDK in the browser (브라우저용 Supabase 클라이언트 초기화)
├── manifest.json       # PWA manifest — standalone display, theme color (PWA 매니페스트)
├── netlify.toml        # Netlify deploy config — headers, publish dir (넷리파이 배포 설정)
├── server.js           # Minimal Node.js static server for local preview (로컬 개발용 정적 서버)
├── supabase-schema.sql # Supabase table DDL + RLS policies (DB 스키마 및 행 수준 보안 정책)
├── supabase/           # Supabase CLI project directory (Supabase CLI 디렉터리)
└── api/
    └── words.js        # Vercel serverless function — REST CRUD for /api/words (단어 CRUD API 엔드포인트)
```

## 🔄 Usage Flow (사용 흐름)

1. Open the app in Safari on iPhone or iPad and add to Home Screen. (사파리에서 열고 홈 화면에 추가)
2. **Add** — tap the mic tab, speak English words, then tap "일괄 추가" to save. (마이크 탭에서 음성으로 단어 추가)
3. **Study** — swipe or tap arrow buttons to navigate cards; tap the card face to flip. (카드 탭으로 뒤집어 뜻 확인)
4. **Mark mastered** — tap ✓ to toggle mastered status on the current card. (✓ 버튼으로 암기 완료 표시)
5. **Test** — switch to the test tab; press "뜻 확인" then ○/✕ to grade yourself. (테스트 탭에서 자가 채점)
6. **Manage** — review all words, edit or delete entries in the manage tab. (관리 탭에서 수정·삭제)

## 🏗️ Architecture (아키텍처)

```
Browser (iPhone/iPad)
    │
    ├── index.html / ipad.html   ← UI + inline JS
    ├── db.js                    ← fetch() calls to /api/words
    └── supabaseClient.js        ← direct Supabase reads (anon key)

Vercel Edge (api/words.js — serverless)
    │  GET  → Supabase REST (anon key, public read)
    │  POST / PUT / DELETE → Supabase REST (service role key, write)
    └──► Supabase PostgreSQL
             └── public.words (id, word, phonetic, meanings JSONB, created_at)
```

- The frontend calls `/api/words` for all mutations; only reads bypass the serverless layer via the Supabase anon key. (읽기는 anon key로 직접 Supabase에 요청하고, 쓰기는 서버리스 함수를 경유)
- `meanings` is stored as JSONB, allowing each word to have multiple parts of speech, definitions, examples, and synonyms without a normalized schema. (단어 뜻·예문·동의어는 JSONB로 유연하게 저장)
- Mastered state is stored in `localStorage` only (not synced to DB). (암기 완료 상태는 로컬 스토리지에만 저장)

## ⚙️ Environment Setup (환경 설정)

**Supabase**

Run `supabase-schema.sql` in the Supabase SQL editor to create the `words` table and RLS policies. (Supabase SQL 에디터에서 스키마 파일 실행)

**Vercel environment variables** (Vercel 환경 변수 설정)

| Variable | Description |
|---|---|
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Service role key for write operations |

## 🚀 How to Run (실행 방법)

**Local preview (로컬 미리보기)**

```bash
node server.js
# Open http://localhost:4173
```

**Deploy (배포)**

- Push to `main` → Netlify auto-deploys the static frontend. (main 브랜치 푸시 시 Netlify 자동 배포)
- Vercel handles `api/words.js` as a serverless function. (Vercel이 API 엔드포인트 자동 처리)

## 📄 License & References (라이선스 & 참고 문서)

- License: MIT
- [Supabase Docs](https://supabase.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Web App Manifest (MDN)](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Web Speech API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
