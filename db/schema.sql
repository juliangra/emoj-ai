CREATE TABLE emoji_requests (
    id SERIAL PRIMARY KEY,  -- Unique identifier for each request
    search_string VARCHAR(255) NOT NULL UNIQUE,  -- The input string, must be unique
    emoji_results JSON NOT NULL,  -- The result, which will be stored in JSON format
    first_queried TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- When the search string was first queried
    last_queried TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- When the search string was last queried
    total_queries INT DEFAULT 1  -- Number of times the search string has been queried
);

-- Upsert function to insert or update the emoji request
CREATE OR REPLACE FUNCTION upsert_emoji_request(p_search_string VARCHAR, p_emoji_results JSON)
RETURNS VOID AS $$
BEGIN
    INSERT INTO emoji_requests (search_string, emoji_results)
    VALUES (p_search_string, p_emoji_results)
    ON CONFLICT (search_string)
    DO UPDATE
    SET last_queried = CURRENT_TIMESTAMP,
        total_queries = emoji_requests.total_queries + 1,
        emoji_results = EXCLUDED.emoji_results;
END;
$$ LANGUAGE plpgsql;
