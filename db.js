const API_BASE = 'https://work-vosnuevo.vercel.app';

window.dbFetchWords = async function dbFetchWords() {
    const response = await fetch(`${API_BASE}/api/words`, { method: 'GET' });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        console.error('Error fetching:', data.error || response.statusText);
        return [];
    }

    return data.data ?? [];
};

async function callWordsApi(method, payload = null) {
    const options = { method, headers: {} };
    if (payload !== null) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(payload);
    }

    const apiBase = window.location.protocol === 'file:'
        ? 'https://toeic-flashcards-2vaajtal5-vosnuevo.vercel.app'
        : window.location.origin;

    const response = await fetch(`${apiBase}/api/words`, options);
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.error || `API request failed (${response.status})`);
    }
    return data;
}

window.dbAddWord = async function dbAddWord(word) {
    return callWordsApi('POST', {
        word,
        meanings: [{ pos: "AI 분석 대기", definition: "제미니에게 뜻 생성을 요청하세요!", examples: [] }]
    });
};

window.dbDeleteWord = async function dbDeleteWord(id) {
    return callWordsApi('DELETE', { id });
};

window.dbUpdateWord = async function dbUpdateWord(id, updates) {
    return callWordsApi('PUT', { id, updates });
};
