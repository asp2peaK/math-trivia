let score = 0;
let difficulty = 1;
let combo = 0;

function generateQuestion() {
  const num1 = Math.floor(Math.random() * 10 * difficulty);
  const num2 = Math.floor(Math.random() * 10 * difficulty);
  const num3 = Math.floor(Math.random() * 10 * difficulty);
  const num4 = Math.floor(Math.random() * 10 * difficulty);

  const operationTypes = ['+', '-', '*', '^2', '^3', '√', '3num', 'brackets', '4num'];
  const operation = operationTypes[Math.floor(Math.random() * operationTypes.length)];

  let question;
  if (operation === '^2') {
    question = `${num1}^2`;
  } else if (operation === '^3') {
    question = `${num1}^3`;
  } else if (operation === '√') {
    const perfectSquare = Math.pow(Math.floor(Math.random() * 10) + 1, 2);
    question = `√${perfectSquare}`;
  } else if (operation === '3num') {
    const operator1 = ['+', '-', '*'][Math.floor(Math.random() * 3)];
    const operator2 = ['+', '-', '*'][Math.floor(Math.random() * 3)];
    question = `${num1} ${operator1} ${num2} ${operator2} ${num3}`;
  } else if (operation === 'brackets') {
    const operator1 = ['+', '-', '*'][Math.floor(Math.random() * 3)];
    const operator2 = ['+', '-', '*'][Math.floor(Math.random() * 3)];
    const bracketProb = Math.random();
    if (bracketProb < 0.5) {
      question = `(${num1} ${operator1} ${num2}) ${operator2} ${num3}`;
    } else {
      question = `${num1} ${operator1} (${num2} ${operator2} ${num3})`;
    }
  } else if (operation === '4num') {
    const operator1 = ['+', '-', '*'][Math.floor(Math.random() * 3)];
    const operator2 = ['+', '-', '*'][Math.floor(Math.random() * 3)];
    const operator3 = ['+', '-', '*'][Math.floor(Math.random() * 3)];
    question = `${num1} ${operator1} ${num2} ${operator2} ${num3} ${operator3} ${num4}`;
  } else {
    question = `${num1} ${operation} ${num2}`;
  }

  document.getElementById('question').textContent = question;
}

function checkAnswer() {
  const userAnswer = document.getElementById('answer').value;
  let correctAnswer;

  const questionText = document.getElementById('question').textContent;
  if (questionText.includes('^')) {
    const base = questionText.split('^')[0];
    const exponent = questionText.split('^')[1];
    correctAnswer = Math.pow(base, exponent);
  } else if (questionText.startsWith('√')) {
    const number = questionText.substring(1);
    correctAnswer = Math.sqrt(number);
  } else {
    correctAnswer = eval(questionText);
  }

  
  let pointsAwarded = 0;
  if (questionText.includes('^')) {
    pointsAwarded = 3; 
  } else if (questionText.startsWith('√')) {
    pointsAwarded = 3;
  } else if (questionText.includes('(')) {
    pointsAwarded = 1.5;
  } else {
    const operandsCount = questionText.split(/[\+\-\*\/]/).length;
    if (operandsCount === 2) {
      pointsAwarded = 1;
    } else if (operandsCount === 3) {
      pointsAwarded = 2;
    } else if (operandsCount === 4) {
      pointsAwarded = 2.5;
    }
  }

  if (userAnswer == correctAnswer) {
    score += pointsAwarded;
    difficulty += 0.2;
    document.getElementById('result').textContent = `Correct! +${pointsAwarded} points`; 
  } else {
    score--;
    document.getElementById('result').textContent = "Incorret. Try again.";
  }


  if (userAnswer == correctAnswer) {
    combo++; 
    if (combo % 3 === 0) {
      score++;
      document.getElementById('result').textContent += " (combo!)";
    }
  } else {
    combo = 0; 
  }

  updateScoreAndLeague();

  document.getElementById('answer').value = '';
  generateQuestion(); 
}

function updateScoreAndLeague() {
  document.getElementById('score').textContent = "Score: " + score;
  let league;
  if (score >= 500) {
    league = "Master";
  } else if (score >= 200) {
    league = "Diamond";
  } else if (score >= 100) {
    league = "Gold";
  } else if (score >= 50) {
    league = "Silver";
  } else {
    league = "Bronze";
  }
  document.getElementById('league').textContent = "League: " + league; 
}


generateQuestion();