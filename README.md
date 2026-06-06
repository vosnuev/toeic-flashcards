# 📚 토익 플래시카드 (TOEIC Flashcards)

토익 영어 단어 암기용 웹앱입니다. 단어의 **뜻 · 발음 · 어원 · 유의어 · 토익 출제 포인트 · 예문(영/한)** 을 카드로 학습합니다.
iPhone과 iPad에 각각 최적화된 화면을 제공하며, 홈 화면에 추가하면 앱처럼 전체화면으로 사용할 수 있습니다(PWA).

## ✨ 주요 기능

- **📖 학습** — 카드로 단어를 외우고, 예문 속 표제어는 자동으로 굵게 표시
- **🎯 테스트** — 뜻을 떠올린 뒤 O/X로 자가 점검
- **📊 관리** — 단어 목록 확인, 외운 단어 표시, 추가 단어 수정·삭제
- **🎙️ 추가** — 음성 인식으로 단어를 받아쓰기 (뜻·예문은 이후 보강)
- **✓ 외운 단어** 표시 (기기에 저장)
- 한 단어에 **명사·동사·형용사·부사 등 여러 품사의 뜻**을 함께 제공

## 📱 기기별 화면

| 파일 | 대상 | 특징 |
|------|------|------|
| `index.html` | **iPhone** | 카드 뒤집기(앞=단어 / 뒤=뜻), 하단 탭 내비게이션 |
| `ipad.html` | **iPad** | 좌우 분할 대시보드 — 왼쪽 단어, 오른쪽 뜻을 **동시에** 표시 |
| `words.js` | 공통 | 두 화면이 공유하는 단어 데이터 |

## 🗂 데이터 구조 (`words.js`)

```js
const wordData = [
  {
    word: "accommodate",
    phonetic: "/əˈkɑːmədeɪt/",
    meanings: [
      {
        pos: "동사",                       // 품사 (한국어)
        definition: "수용하다, ~을 수용할 공간이 있다",
        toeic_note: "호텔·시설이 ~명을 수용하다. 철자 주의.",
        etymology: "Latin 'accommodare'(ad-~에 + commodus 알맞은) -> ~에 알맞게 맞춤.",
        synonyms: "house(수용하다), hold(수용하다)",
        examples: [
          { en: "The hall can accommodate up to 500 people.",
            ko: "그 회의장은 최대 500명을 수용할 수 있습니다." }
        ]
      }
    ]
  }
];
```

## 🚀 로컬 실행

```bash
node server.js
# http://localhost:4173 (iPhone 화면)
# http://localhost:4173/ipad.html (iPad 화면)
```

## ➕ 단어 추가 방법

`words.js`의 `wordData` 배열에 위 구조대로 항목을 추가하면 됩니다.
뜻은 품사별로 다양하게, 각 뜻마다 토익 출제 포인트·어원·유의어·예문(영/한)을 채우는 것을 권장합니다.

## 🛠 기술 스택

- 순수 **HTML / CSS / JavaScript** (프레임워크 없음)
- **PWA** (manifest.json + Apple 메타 태그)
- 단어 진행 상태는 브라우저 **localStorage** 에 저장
- 정적 호스팅 (Vercel 등)

## 📌 로드맵

- [ ] Vercel 호스팅으로 이전
- [ ] Supabase 연동 — 모든 단어를 클라우드 DB에 저장하여 기기 간 동기화
- [ ] 앱에서 추가한 단어의 뜻 자동 보강
