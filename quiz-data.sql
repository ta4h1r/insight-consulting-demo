-- CREATE DATABASE quiz_app;
USE quiz_app;

CREATE TABLE quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    question TEXT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

CREATE TABLE answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    answer TEXT NOT NULL,
    is_correct BOOLEAN,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

INSERT INTO quizzes (name) VALUES 
    ('Game of Thrones'),
    ('Breaking Bad');

INSERT INTO questions (quiz_id, question) VALUES 
    (1, 'What is the surname given to bastards born in Dorne?'),
    (1, "'The Mountain' is the nickname for which character?"),
    (2, 'What is Walt’s middle name?'),
    (2, 'What is the plant Walt used to poison Brock?');

INSERT INTO answers (question_id, answer, is_correct) VALUES 
    (1, 'Rivers', FALSE),
    (1, 'Sand', TRUE),
    (2, 'Gerold Clegane', FALSE),
    (2, 'Gregor Clegane', TRUE),
    (3, 'Archibald', FALSE),
    (3, 'Hartwell', TRUE),
    (4, 'Narcissus', FALSE),
    (4, 'Lily-of-the-valley', TRUE);

