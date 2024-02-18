// import { questions } from './questions'
//questions.js
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
]

// add variables that keep track of the quiz "state"
let currentQuestionIndex = 0
let time = questions.length * 15
let timerId
let finalScore = 0

// add variables to reference DOM elements
// example is below
let questionsEl = document.getElementById('questions')

// reference the sound effects
let sfxRight = new Audio('assets/sfx/correct.wav')
let sfxWrong = new Audio('assets/sfx/incorrect.wav')

//Create a separate function for the timer
function startTimer() {
  timerId = setInterval(() => {
    time--
    updateTimerDisplay()
    if (time <= 0) {
      clearInterval(timerId)
    }
  }, 1000)
}

function updateTimerDisplay() {
  document.getElementById('time').textContent = time
}
function startQuiz() {
  console.log('Start quiz button clicked')
  // hide start screen
  document.getElementById('start-screen').classList.add('hide')

  // un-hide questions section
  document.getElementById('questions').classList.remove('hide')

  // un-hide timer
  document.getElementById('timer').classList.remove('hide')
  // start timer
  startTimer()

  // show starting time
  updateTimerDisplay()

  // call a function to show the next question
  getQuestion()
}

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

// // add the code in this function to update the time, it should be called every second
// function clockTick() {
//   // right here - update time

//   // update the element to display the new time value

//   // check if user ran out of time; if so, call the quizEnd() function

// }

// // complete the steps to save the high score
// function saveHighScore() {

//   // get the value of the initials input box

//   // make sure the value of the initials input box wasn't empty

//   // if it is not, check and see if there is a value of high scores in local storage

//   // if there isn't any, then create a new array to store the high score

//   // add the new initials and high score to the array

//   // convert the array to a piece of text

//   // store the high score in local storage

//   // otherwise, if there are high scores stored in local storage,
//   // retrieve the local storage value that has the high scores,
//   // convert it back to an array,
//   // add the new initials and high score to the array,
//   // then convert the array back to a piece of text,
//   // then store the new array (converted to text) back in local storage

//   // finally, redirect the user to the high scores page.

// }

// // use this function when the user presses the "enter" key when submitting high score initials
// function checkForEnter(event) {
//   // if the user presses the enter key, then call the saveHighscore function
// }

// user clicks button to submit initials
// submitBtn.onclick = saveHighScore

//Get reference to the start quiz button
let startBtn = document.getElementById('start')
// user clicks button to start quiz
startBtn.onclick = startQuiz

//Get reference to the choice button
let choicesEl = document.getElementById('choices')

// user clicks on an element containing choices
choicesEl.onclick = questionClick

// initialsEl.onkeyup = checkForEnter
