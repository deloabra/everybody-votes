DROP DATABASE IF EXISTS everybody_votes;
CREATE DATABASE everybody_votes;

USE everybody_votes;

CREATE TABLE question(
	id INT NOT NULL AUTO_INCREMENT,
    question VARCHAR(500),
    private BOOLEAN,
    creator varchar(20),
    CreatedAt DATETIME DEFAULT current_timestamp,
    ExpiresAt DATETIME DEFAULT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE vote(
	id INT NOT NULL AUTO_INCREMENT,
    ip varchar(20),
    questionid INT,
    CreatedAt DATETIME DEFAULT current_timestamp,
    PRIMARY KEY(id)
);