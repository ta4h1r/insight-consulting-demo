-- CREATE DATABASE quiz_app;
USE quiz_app;

CREATE TABLE IF NOT EXISTS quizzes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    quiz_id INT NOT NULL,
    question TEXT NOT NULL,
    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)
);

CREATE TABLE IF NOT EXISTS answers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    question_id INT NOT NULL,
    answer TEXT NOT NULL,
    is_correct BOOLEAN,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

SET foreign_key_checks = 0;
TRUNCATE TABLE answers;
TRUNCATE TABLE questions;
TRUNCATE TABLE quizzes;
SET foreign_key_checks = 1;

INSERT INTO quizzes (name) VALUES ("Game of Thrones");
INSERT INTO quizzes (name) VALUES ("Breaking Bad");

INSERT INTO questions (quiz_id, question) VALUES (1, "What is the surname given to bastards born in Dorne?");
INSERT INTO questions (quiz_id, question) VALUES (1, "'The Mountain' is the nickname for which character?");
INSERT INTO questions (quiz_id, question) VALUES (1, "Who is Lord Commander of the Kingsguard at the beginning of Game of Thrones?");
INSERT INTO questions (quiz_id, question) VALUES (1, "Who was Margaery Tyrell's first husband?");
INSERT INTO questions (quiz_id, question) VALUES (1, "Who is known as 'The-King-Beyond-the-Wall'?");

INSERT INTO questions (quiz_id, question) VALUES (2, "What is Walt’s middle name?");
INSERT INTO questions (quiz_id, question) VALUES (2, "What is the plant Walt used to poison Brock?");
INSERT INTO questions (quiz_id, question) VALUES (2, "What is the name of the boy Todd shot in the desert?");
INSERT INTO questions (quiz_id, question) VALUES (2, "What is the model of Walt’s original car?");
INSERT INTO questions (quiz_id, question) VALUES (2, "Before becoming Walt’s partner, Jesse cooked his meth with what special ingredient?");

INSERT INTO answers (question_id, answer, is_correct) VALUES (1, 'Rivers', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (1, 'Waters', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (1, 'Stone', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (1, 'Sand', true);
INSERT INTO answers (question_id, answer, is_correct) VALUES (2, 'Gerold Clegane', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (2, 'Gregor Clegane', true);
INSERT INTO answers (question_id, answer, is_correct) VALUES (2, 'Oberyn Martell', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (2, 'Sandor Clegane', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (3, 'Ser Barristan Selmy', true);
INSERT INTO answers (question_id, answer, is_correct) VALUES (3, 'Ser Loras Tyrell', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (3, 'Ser Jaime Lannister', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (3, 'Ser Jeor Mormont', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (4, 'Renly Baratheon', true);
INSERT INTO answers (question_id, answer, is_correct) VALUES (4, 'Joffrey Baratheon', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (4, 'Tommen Baratheon', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (4, 'Stannis Baratheon', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (5, 'Mance Rayder', true);
INSERT INTO answers (question_id, answer, is_correct) VALUES (5, 'Tormund Giantsbane', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (5, 'Stannis Baratheon', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (5, 'The Night King', false);

INSERT INTO answers (question_id, answer, is_correct) VALUES (6, 'Archibald', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (6, 'Matthew', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (6, 'Hartwell', true);
INSERT INTO answers (question_id, answer, is_correct) VALUES (7, 'Narcissus', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (7, 'Lily-of-the-valley', true);
INSERT INTO answers (question_id, answer, is_correct) VALUES (7, 'Black Nightshade', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (8, 'Drew Sharp', true);
INSERT INTO answers (question_id, answer, is_correct) VALUES (8, 'David Stewart', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (8, 'Donnie Solis', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (9, '1987 Toyota Tercel', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (9, '2004 Pontiac Aztek', true);
INSERT INTO answers (question_id, answer, is_correct) VALUES (9, '2006 PT Cruiser', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (10, 'Chili powder', true);
INSERT INTO answers (question_id, answer, is_correct) VALUES (10, 'A1 Steal Sauce', false);
INSERT INTO answers (question_id, answer, is_correct) VALUES (10, 'Oregano', false);

