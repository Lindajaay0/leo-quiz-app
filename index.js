const STORE = [
  {
    question: 'When was Leonardo DiCaprio born?',
    answers: [
      'November 11, 1974',
      'June 7, 1975',
      'August 12, 1973',
      'February 3, 1974'
    ],
    correctAnswer:
      'November 11, 1974'
  },
  {
    question: 'In 1994, Leonardo DiCaprio was nominated for the Oscar for Best Actor in a Supporting Role for what movie?',
    answers: [
      'Romeo + Juliet',
      'What’s Eating Gilbert Grape?',
      'In the Line of Fire',
      'Titanic'
    ],
    correctAnswer:
      'What’s Eating Gilbert Grape?'
  },
  {
    question: 'In 1997, Leonardo DiCaprio starred in the blockbuster movie "Titanic" with Kate Winslet. What other movie did they star in together?',
    answers: [
      'Revolutionary Road',
      'Inception',
      'Gangs of New York',
      'The Aviator'
    ],
    correctAnswer:
      'Revolutionary Road'
  },
  {
    question: 'How many films have Leonardo DiCaprio and director Martin Scorsese collaborated on?',
    answers: [
      '3',
      '4',
      '1',
      '5'
    ],
    correctAnswer:
      '5'
  },
  {
    question: 'What is the name of Leonardo DiCaprios production company?',
    answers: [
      'Appian Way',
      'EcoProd Studios',
      'Caprio Productions',
      'Leo Productions'
    ],
    correctAnswer:
      'Appian Way'
  },
  {
    question: 'Who said it? \"The year I turned 26, I made $49 million, which really pissed me off because it was three shy of a million a week.\"',
    answers: [
      'Calvin Candie, Django Unchained',
      'Jay Gatsby, The Great Gatsby',
      'Howard Hughes, The Aviator',
      'Jordan Belfort, The Wolf of Wall Street'
    ],
    correctAnswer:
      'Jordan Belfort, The Wolf of Wall Street'
  },
  {
    question: 'Leonardo DiCaprios latest movie, \"The Revenant\" was nominated for how many Academy Awards?',
    answers: [
      '12',
      '9',
      '15',
      '25'
    ],
    correctAnswer:
      '12'
  },
  {
    question: 'What horror movie did Leonardo DiCaprio help produce?',
    answers: [
      'The Wax Museum',
      'The Orphan',
      'The Haunting in Connecticut',
      'Scream'
    ],
    correctAnswer:
      'The Orphan'
  },
  {
    question: '\"Django Unchained\" was Leonardo DiCaprios first film working with what acclaimed writer and director?',
    answers: [
      'Ridley Scott',
      'Quentin Tarantino',
      'Martin Scorsese',
      'Chris Brigham'
    ],
    correctAnswer:
      'Quentin Tarantino'
  },
  {
    question: 'Which Leonardo DiCaprio movie is it? A U.S Marshal investigates the disappearance of a murderess who escaped from a hospital for the criminally insane.',
    answers: [
      'Inception',
      'Shutter Island',
      'Body of Lies',
      'Catch Me If You Can'
    ],
    correctAnswer:
      'Shutter Island'
  }
];

//variables to store quiz score and question number
let score = 0;
let questionNumber = 0;

//function that generates each question
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return createThing(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(10);
  }
}

//increments the value of the "score" by one
//and updates the "score" number in the quiz view
function updateScore() {
  score++;
  $('.score').text(score);
}

//increments the value of the "question number" by one
//and updates the "question number" in the quiz view
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//resets the value of the "question number" and "score" variables
//and updates their repective text in the quiz view
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

//starts the quiz
function startQuiz() {
  $('.altBox').hide();
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
}

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer() {
  $('.leoBox').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//creates html for question form
function createThing(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class='questionText'>${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="sizeMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}"
        name="answer" required>
        <span>${answerValue}</br></span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return formMaker;
}

//feedback if a selected answer is correct
//increments user score by one
function correctAnswer() {
  $('.response').html(
    `<h3>That is correct!</h3>
    <img src="images/happyLeo.png" alt="Leo celebrating" class="images" width="1000px" height="105px">
      <p class="sizeMe">Leo would be proud!</p> <button type="button" class="nextButton button">Next</button>`
  );
  updateScore();
}

//feedback if a selected answer is incorrect
function wrongAnswer() {
  $('.response').html(
    `<h3>Oh no, wrong answer!</h3>
    <img src="images/sadLeo.png" alt="Leo crying on the floor" class="images" width="200px" height="350px">
    <p class="sizeMe">The correct answer is:</p>
    <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

//generates the next question
function nextQuestion() {
  $('.leoBox').on('click', '.nextButton', function(event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion());
  });
}

//determines the final score and gives feedback at the end of the quiz
function finalScore() {
  $('.final').show();

  const great = [
    'Great job! You are a true fan!',
    'images/congratsLeo.png'
  ];

  const good = [
    'You did okay. You are a moderate fan.',
    'images/clappingLeo.png',
  ];

  const bad = [
    'That was brutal. Do you even know who Leonardo Dicaprio is?',
    'images/angryLeo.png'
  ];

  if (score >= 8) {
    array = great;
  } else if (score < 8 && score >=5) {
    array = good;
  } else {
    array = bad;
  }
  return $('.final').html(
    `<h3>${array[0]}</h3>
      <img src="${array[1]}" alt="${array[2]}" class="images">
        <h3>Your final score is ${score} / 10</h3>
        <button type="submit" class="restartButton button">Restart</button>`
  );
}

//takes user back to the starting view to restart the quiz
function restartQuiz() {
  $('.leoBox').on('click', '.restartButton', 
  function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();
  });
}

//runs the functions
function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);
