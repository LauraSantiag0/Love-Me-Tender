DROP TABLE IF EXISTS bid_attachment CASCADE;
DROP TABLE IF EXISTS bid CASCADE;
DROP TABLE IF EXISTS bidder_skill CASCADE;
DROP TABLE IF EXISTS tender_skill CASCADE;
DROP TABLE IF EXISTS tender CASCADE;
DROP TABLE IF EXISTS buyer CASCADE;
DROP TABLE IF EXISTS skill CASCADE;
DROP TABLE IF EXISTS bidder CASCADE;
DROP TABLE IF EXISTS admins CASCADE;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(60) NOT NULL,
    user_type VARCHAR(30) NOT NULL
);

CREATE TABLE admins (
    user_id INTEGER PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    cyf_role VARCHAR(100),
    last_update TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE bidder (
    user_id INTEGER PRIMARY KEY,
    user_name VARCHAR(100),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    last_update TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE skill (
    skill_id SERIAL PRIMARY KEY,
    skill_name VARCHAR(50)
);

CREATE TABLE buyer (
    user_id INTEGER PRIMARY KEY,
    company VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    last_update TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE tender (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100),
    creation_date DATE,
    announcement_date DATE,
    deadline DATE,
    description VARCHAR(2000),
    cost DECIMAL(15, 2) CHECK (cost >= 0),
    status VARCHAR(100),
    last_update TIMESTAMP,
    buyer_id INTEGER,
    no_of_bids_received INT,
    closing_date DATE,
    FOREIGN KEY (buyer_id) REFERENCES buyer(user_id) ON DELETE SET NULL
);

CREATE TABLE tender_skill (
    tender_id INTEGER,
    skill_id INTEGER,
    PRIMARY KEY (tender_id, skill_id),
    FOREIGN KEY (skill_id) REFERENCES skill(skill_id) ON DELETE CASCADE,
    FOREIGN KEY (tender_id) REFERENCES tender(id) ON DELETE CASCADE
);

CREATE TABLE bidder_skill (
    bidder_id INTEGER,
    skill_id INTEGER,
    PRIMARY KEY (bidder_id, skill_id),
    FOREIGN KEY (skill_id) REFERENCES skill(skill_id) ON DELETE CASCADE,
    FOREIGN KEY (bidder_id) REFERENCES bidder(user_id) ON DELETE CASCADE
);

CREATE TABLE bid (
    bid_id SERIAL PRIMARY KEY,
    tender_id INTEGER,
    bidder_id INTEGER,
    buyer_id INTEGER,
    bidding_date DATE,
    status VARCHAR(100),
    bidding_amount DECIMAL(15, 2) CHECK (bidding_amount >= 0),
    cover_letter VARCHAR(255),
    suggested_duration_days INTEGER,
    FOREIGN KEY (tender_id) REFERENCES tender(id) ON DELETE CASCADE,
    FOREIGN KEY (bidder_id) REFERENCES bidder(user_id) ON DELETE CASCADE,
    FOREIGN KEY (buyer_id) REFERENCES buyer(user_id) ON DELETE CASCADE
);

CREATE TABLE bid_attachment (
    attachment_id SERIAL PRIMARY KEY,
    bid_id INTEGER,
    attachment VARCHAR(200),
    FOREIGN KEY (bid_id) REFERENCES bid(bid_id) ON DELETE CASCADE
);
