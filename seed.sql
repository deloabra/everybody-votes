DROP DATABASE IF EXISTS everybody_votes;
CREATE DATABASE everybody_votes;

USE everybody_votes;

CREATE TABLE question(
	id INT NOT NULL AUTO_INCREMENT,
    url VARCHAR(100),
    question VARCHAR(500),
    private BOOLEAN,
    creator varchar(20),
    CreatedAt DATETIME DEFAULT current_timestamp,
    ExpiresAt DATETIME DEFAULT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE answerchoice(
    id INT NOT NULL AUTO_INCREMENT,
    questionId INT NOT NULL,
    choice varchar(200),
    primary key(id)
);

CREATE TABLE vote(
	id INT NOT NULL AUTO_INCREMENT,
    ip varchar(20),
    questionId INT NOT NULL,
    choice INT NOT NULL,
    CreatedAt DATETIME DEFAULT current_timestamp,
    PRIMARY KEY(id)
);