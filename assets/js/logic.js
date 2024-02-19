// import { questions } from './questions'
// list of all questions, choices, and answers
const questions = [
  {
    title: 'Commonly used data types DO NOT include:',
    choices: ['strings', 'booleans', 'alerts', 'numbers'],
    answer: 'alerts',
  },
  {
    title: 'The condition in an if / else statement is enclosed within ____.',
    choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
    answer: 'parentheses',
  },
  {
    title: 'Arrays in JavaScript can be used to store ____.',
    choices: [
      'numbers and strings',
      'other arrays',
      'booleans',
      'all of the above',
    ],
    answer: 'all of the above',
  },
  {
    title:
      'String values must be enclosed within ____ when being assigned to variables.',
    choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
    answer: 'quotes',
  },
  {
    title:
      'A very useful tool used during development and debugging for printing content to the debugger is:',
    choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
    answer: 'console.log',
  },
  {
    title:
      'Which of the following methods is used to access HTML elements using Javascript?',
    choices: [
      'getElementbyId()',
      'getElementByClassName()',
      'Both A and B',
      'None of the above',
    ],
    answer: 'Both A and B',
  },
  {
    title:
      'Which of the following methods can be used to display data in some form using Javascript?',
    choices: [
      'document.write()',
      'console.log()',
      'window.alert()',
      'All of the above',
    ],
    answer: 'All of the above',
  },
  {
    title: 'How can a datatype be declared to be a constant type?',
    choices: ['const', 'var', 'let', 'constant'],
    answer: 'const',
  },
  {
    title: 'What is the use of the noscript tag in Javascript?',
    choices: [
      'The contents are displayed by non-JS based browsers',
      'clear all cookies and cache',
      'Both A and B',
      'None of the above',
    ],
    answer: 'The contents are displayed by non-JS based browsers',
  },
  {
    title:
      'When an operator’s value is NULL, the typeof returned by the unary operator is:',
    choices: ['Boolean', 'undefined', 'object', 'integer'],
    answer: 'object',
  },
]

// add variables that keep track of the quiz "state"
let currentQuestionIndex = 0
let time = questions.length * 15
let timerId
let finalScore = 0

// add variables to reference DOM elements
let questionsEl = document.getElementById('questions')

// reference the sound effects
let sfxRight = new Audio('assets/sfx/correct.wav')
let sfxWrong = new Audio('assets/sfx/incorrect.wav')

function startQuiz() {
  // console.log('Start quiz button clicked')
  // hide start screen
  document.getElementById('start-screen').classList.add('hide')

  // un-hide questions section
  document.getElementById('questions').classList.remove('hide')

  // un-hide timer
  document.getElementById('timer').classList.remove('hide')
  // start timer
  clockTick()

  // show starting time
  updateTimerDisplay()

  // call a function to show the next question
  getQuestion()
}

//Function to shuffle an array of question ising Fisher_Yates algorithm
function shuffleQuestion(questions) {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[questions[i], questions[j]] = [questions[j], questions[i]]
  }
}

shuffleQuestion(questions)

function getQuestion() {
  // get current question object from array
  let currentQuestion = questions[currentQuestionIndex]
  // update title with current question
  document.getElementById('question-title').innerHTML = currentQuestion.title
  // clear out any old question choices
  let choicesContainer = document.getElementById('choices')
  choicesContainer.innerHTML = ''
  // loop over the choices for each question
  currentQuestion.choices.forEach((choice, index) => {
    let choiceButton = document.createElement('button')
    choiceButton.textContent = choice
    choiceButton.classList.add('choice')
    choiceButton.dataset.index = index
    choicesContainer.appendChild(choiceButton)
  })
  //Show the questions section
  document.getElementById('questions').classList.remove('hide')
}

function questionClick(event) {
  // identify the targeted button that was clicked on
  let clickedButton = event.target
  // if the clicked element is not a choice button, do nothing.
  if (clickedButton.classList.contains('choice')) {
    //Get the index of the selected choice
    let choiceIndex = parseInt(clickedButton.dataset.index)
    //Get the current question object
    let currentQuestion = questions[currentQuestionIndex]
    //Check user answer
    if (currentQuestion.choices[choiceIndex] == currentQuestion.answer) {
      //Play the right sound
      sfxRight.play()
      finalScore += 2
      document.getElementById('feedback').classList.remove('hide')
      document.getElementById('feedback').textContent =
        'Your answer is Correct!'
    } else {
      sfxWrong.play()
      // Penalize time by subtracting 15 seconds from the timer
      time -= 15

      // If time runs out, set time to zero
      if (time < 0) {
        time = 0
      }
      // Display new time on page
      updateTimerDisplay()

      document.getElementById('feedback').classList.remove('hide')
      document.getElementById('feedback').textContent = 'Your answer is Wrong!'
    }

    currentQuestionIndex++
    // Check if we've run out of questions
    if (currentQuestionIndex >= questions.length || time <= 0) {
      // Call a function that ends the quiz
      quizEnd()
    } else {
      // Display the next question
      getQuestion()
    }
  } else {
    return
  }
}

// define the steps of the QuizEnd function...when the quiz ends...
function quizEnd() {
  // stop the timer
  clearInterval(timerId)
  // show end screen
  document.getElementById('end-screen').classList.remove('hide')
  //Hide the question, feedback and timer
  document.getElementById('questions').classList.add('hide')
  document.getElementById('timer').classList.add('hide')
  document.getElementById('feedback').classList.add('hide')
  // show final score
  document.getElementById('final-score').innerHTML = finalScore
}

// add the code in this function to update the time, it should be called every second
//Create a separate function for the timer
function clockTick() {
  timerId = setInterval(() => {
    time--
    updateTimerDisplay()
    if (time <= 0) {
      clearInterval(timerId)
      quizEnd()
    }
  }, 1000)
}

function updateTimerDisplay() {
  document.getElementById('time').textContent = time
}

//steps to save the high score

function saveHighScore() {
  // get the value of the initials input box
  let initials = document.getElementById('initials').value
  let score = document.getElementById('final-score').textContent
  // make sure the value of the initials input box wasn't empty
  if (initials == '') {
    alert('Please enter your initials')
    return false
  }
  //Retrieve existing scores from local storage
  let highScores = JSON.parse(localStorage.getItem('highScores')) || []
  //Add the new score to the array
  highScores.push({ initials: initials, score: score })
  //Convert highscores into text format
  localStorage.setItem('highScores', JSON.stringify(highScores))
  //redirect user to high scores page
  window.location.href = 'highscores.html'
}

// use this function when the user presses the "enter" key when submitting high score initials
function checkForEnter(event) {
  // if the user presses the enter key, then call the saveHighscore function
  if (event.keyCode === 13) {
    saveHighScore()
  }
}

// user clicks button to submit initials
let submitBtn = document.getElementById('submit')
submitBtn.onclick = saveHighScore

//Get reference to the start quiz button
let startBtn = document.getElementById('start')
// user clicks button to start quiz
startBtn.onclick = startQuiz

//Get reference to the choice button
let choicesEl = document.getElementById('choices')

// user clicks on an element containing choices
choicesEl.onclick = questionClick

// initialsEl.onkeyup = checkForEnter
