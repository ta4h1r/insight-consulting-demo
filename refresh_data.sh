#!/bin/bash

# Input JSON file
json_file="quiz-data.json"
# Output SQL file
sql_file="quiz-data.sql"

# Create the SQL file with table creation statements
echo "-- CREATE DATABASE quiz_app;" > "$sql_file"
echo "USE quiz_app;" >> "$sql_file"
echo "" >> "$sql_file"
echo "CREATE TABLE IF NOT EXISTS quizzes (" >> "$sql_file"
echo "    id INT AUTO_INCREMENT PRIMARY KEY," >> "$sql_file"
echo "    name VARCHAR(255) NOT NULL" >> "$sql_file"
echo ");" >> "$sql_file"
echo "" >> "$sql_file"

echo "CREATE TABLE IF NOT EXISTS questions (" >> "$sql_file"
echo "    id INT AUTO_INCREMENT PRIMARY KEY," >> "$sql_file"
echo "    quiz_id INT NOT NULL," >> "$sql_file"
echo "    question TEXT NOT NULL," >> "$sql_file"
echo "    FOREIGN KEY (quiz_id) REFERENCES quizzes(id)" >> "$sql_file"
echo ");" >> "$sql_file"
echo "" >> "$sql_file"

echo "CREATE TABLE IF NOT EXISTS answers (" >> "$sql_file"
echo "    id INT AUTO_INCREMENT PRIMARY KEY," >> "$sql_file"
echo "    question_id INT NOT NULL," >> "$sql_file"
echo "    answer TEXT NOT NULL," >> "$sql_file"
echo "    is_correct BOOLEAN," >> "$sql_file"
echo "    FOREIGN KEY (question_id) REFERENCES questions(id)" >> "$sql_file"
echo ");" >> "$sql_file"
echo "" >> "$sql_file"

# Disable foreign key checks and truncate the tables
echo "SET foreign_key_checks = 0;" >> "$sql_file"
echo "TRUNCATE TABLE answers;" >> "$sql_file"
echo "TRUNCATE TABLE questions;" >> "$sql_file"
echo "TRUNCATE TABLE quizzes;" >> "$sql_file"
echo "SET foreign_key_checks = 1;" >> "$sql_file"
echo "" >> "$sql_file"


# Extract quiz name from JSON and insert into the tables
quiz_names=()
while IFS= read -r quiz_name; do
  quiz_names+=("$quiz_name")
done < <(jq -r '.movieQuiz[].name' "$json_file")

for quiz_name in "${quiz_names[@]}"; do
    # Insert quiz names into the quizzes table
    echo "INSERT INTO quizzes (name) VALUES (\"$quiz_name\");" >> "$sql_file"
done
echo "" >> "$sql_file"

# Extract quiz ids 
quiz_ids=()
while IFS= read -r quiz_id; do
  quiz_ids+=("$quiz_id")
done < <(jq -r '.movieQuiz | to_entries | .[] | .key + 1' "$json_file")

# Insert questions and answers
for quiz_id in "${quiz_ids[@]}"; do
    question_texts=()
    while IFS= read -r question_text; do
      question_texts+=("$question_text")
    done < <(jq -r ".movieQuiz[$((quiz_id-1))].questions[].question" "$json_file")
    for question_text in "${question_texts[@]}"; do
        # Insert questions
        echo "INSERT INTO questions (quiz_id, question) VALUES ($quiz_id, \"$question_text\");" >> "$sql_file"
    done
    echo "" >> "$sql_file"
done

# Insert answers
count=0
for quiz_id in "${quiz_ids[@]}"; do
    question_ids=()
    while IFS= read -r question_id; do
      question_ids+=("$question_id")
    done < <(jq -r ".movieQuiz[$((quiz_id-1))].questions | to_entries | .[] | .key + 1" "$json_file")
    for question_id in "${question_ids[@]}"; do 
        count=$((count + 1))
        answer_ids=()
        while IFS= read -r answer_id; do
          answer_ids+=("$answer_id")
        done < <(jq -r ".movieQuiz[$((quiz_id-1))].questions[$((question_id-1))].answers | to_entries | .[] | .key + 1" "$json_file")
        for answer_id in "${answer_ids[@]}"; do 
            # echo $quiz_id $question_id $answer_id
            answer=$(jq -r ".movieQuiz[$((quiz_id-1))].questions[$((question_id-1))].answers[$((answer_id-1))].answer" "$json_file")
            is_correct=$(jq -r ".movieQuiz[$((quiz_id-1))].questions[$((question_id-1))].answers[$((answer_id-1))].isCorrect" "$json_file")
            echo "INSERT INTO answers (question_id, answer, is_correct) VALUES ($count, '$answer', $is_correct);" >> "$sql_file"
        done
    done 
    echo "" >> "$sql_file"
done

echo "SQL script has been generated and saved to $sql_file"

docker exec -i quiz_db mysql -uusername -ppass quiz_app < quiz.sql
