DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS Spots;

CREATE TABLE Users (
    id INTEGER PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    secret TEXT NOT NULL,  -- SQLite string type is called TEXT
    name TEXT
);

CREATE TABLE Spots (
    id INTEGER PRIMARY KEY,
    requester_email TEXT NOT NULL,
    worker_email TEXT,
    location TEXT NOT NULL,
    date TEXT NOT NULL,
    reward TEXT,
    is_completed INTEGER -- SQLite doesn't have Boolean type, use 0 and 1 instead.
);

-- BONUS !

DROP INDEX IF EXISTS user_email_idx;
DROP INDEX IF EXISTS requester_email_spot_idx;
DROP INDEX IF EXISTS worker_email_spot_idx;

CREATE UNIQUE INDEX user_email_idx ON Users(email);
CREATE INDEX requester_email_spot_idx ON Spots(requester_email);
CREATE INDEX worker_email_spot_idx ON Spots(worker_email);
