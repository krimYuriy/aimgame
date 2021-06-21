const startBtn = document.getElementById('start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('.time-list')
const timerEl = document.getElementById('time')
const board = document.getElementById('board')

const colors = ['rgb(74, 36, 145)', 'rgb(80, 117, 185)', 'rgb(80, 185, 141)', 'rgb(80, 185, 94)', 'rgb(162, 211, 26)', 'rgb(26, 158, 211)']

startBtn.addEventListener('click', (event) => {
   event.preventDefault()
   screens[0].classList.add('up')
})

let time = 0
let score = 0

timeList.addEventListener('click', (e) => {
   if (e.target.classList.contains('time-btn')) {
      screens[1].classList.add('up')
      time = +e.target.getAttribute('data-time')

      startGame()
   }
})

board.addEventListener('click', (event) => {
   if (event.target.classList.contains('circle')) {
      score++
      event.target.remove()
      createRandomCircle()
   }
})

function startGame() {
   setInterval(decreaseTimer, 1000)
   setTime(time)
   createRandomCircle()
}

function decreaseTimer() {
   if (time === 0) {
      finishGame()
   } else {
      let current = --time
      if (current < 10) {
         current = `0${time}`
      }
      setTime(current)
   }
}

function finishGame() {
   timerEl.parentNode.remove()
   board.innerHTML = `<h1>Счёт: <span class="primary">${score}</span></h1>`
}

function setTime(value) {
   timerEl.innerHTML = `00:${value}`
}

function createRandomCircle() {
   const circle = document.createElement('div')
   circle.classList.add('circle')
   const size = getRandomNumber(10, 60)
   const { width, height } = board.getBoundingClientRect()

   circle.style.width = `${size}px`
   circle.style.height = `${size}px`

   circle.style.top = `${getRandomNumber(0, height - size)}px`
   circle.style.left = `${getRandomNumber(0, width - size)}px`

   const color = getRandomColor()

   circle.style.backgroundColor = `${color}`

   circle.style.boxShadow = `0 0 2px ${color}, 0 0 5px ${color}`

   board.append(circle)
}

function getRandomNumber(min, max) {
   return Math.trunc(Math.random() * (max - min) + min)
}

function getRandomColor() {
   const index = Math.floor(Math.random() * colors.length)
   return colors[index]
}