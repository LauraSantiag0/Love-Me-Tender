CREATE TABLE session (
    token VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    expiration_date TIMESTAMP NOT NULL,
    PRIMARY KEY (token)
);
