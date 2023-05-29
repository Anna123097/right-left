const langSelect = document.getElementById('lang')
const [nextMoveHeader] = document.getElementsByTagName('h1')
const [countHeader] = document.getElementsByTagName('h2')
const leftBtn = document.getElementById('left')
const rightBtn = document.getElementById('right')
const restartBtn = document.getElementById('restart')

const text = {
  en: {
    press: "Press",
    left: "left",
    right: "right",
    correct: "Correct!",
    wrong: "Wrong!",
    restart: "Restart",
  },
  ru: {
    press: "Жми",
    left: "влево",
    right: "вправо",
    correct: "Правильно!",
    wrong: "Неправильно!",
    restart: "Начать сначала",
  },
  ua: {
    press: "Тисни",
    left: "влiво",
    right: "вправо",
    correct: "Вiрно!",
    wrong: "Hi!",
    restart: "Заново",
  },
}

let lang = 'en'
let expectedMove = "right"
let moveCount = 0
let rightCount = 0

langSelect.addEventListener('change', () => {
  lang = langSelect.value
  nextMoveHeader.innerText = `${text[lang].press} ${text[lang][expectedMove]}`
  restartBtn.innerText = text[lang].restart
})

leftBtn.addEventListener('click', () => {
  if (expectedMove === "left") {
    takeRightAnswer()
  } else {
    takeWrongAnswer()
  }
  awaitNextMove()
})

rightBtn.addEventListener('click', () => {
  if (expectedMove === "right") {
    takeRightAnswer()
  } else {
    takeWrongAnswer()
  }
  awaitNextMove()
})

restartBtn.addEventListener('click', () => {
  expectedMove = "right"
  moveCount = 0
  rightCount = 0
  nextMoveHeader.innerText = `${text[lang].press} ${text[lang].right}`
  countHeader.innerText = `/`
})

function takeRightAnswer() {
  moveCount++
  rightCount++
  nextMoveHeader.innerText = text[lang].correct
  countHeader.innerText = `${rightCount} / ${moveCount}`
  leftBtn.disabled = true
  rightBtn.disabled = true
}

function takeWrongAnswer() {
  moveCount++
  nextMoveHeader.innerText = text[lang].wrong
  countHeader.innerText = `${rightCount} / ${moveCount}`
  leftBtn.disabled = true
  rightBtn.disabled = true
}

function awaitNextMove() {
  setTimeout(() => {
    expectedMove = Math.random() < 0.5 ? "left" : "right"
    nextMoveHeader.innerText = `${text[lang].press} ${text[lang][expectedMove]}`
    leftBtn.disabled = false
    rightBtn.disabled = false
  }, 2000)
}