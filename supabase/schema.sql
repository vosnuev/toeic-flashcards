-- SQL to create the table
CREATE TABLE toeic_words (
    id SERIAL PRIMARY KEY,
    word TEXT NOT NULL,
    phonetic TEXT,
    meanings JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Example insert
INSERT INTO toeic_words (word, phonetic, meanings)
VALUES (
    'benefit',
    '/ˈbenɪfɪt/',
    '[{"pos": "명사", "definition": "혜택, 이득", "examples": [{"en": "Quality service.", "ko": "품질 좋은 서비스."}]}]'
);
