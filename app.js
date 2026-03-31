const $circle = document.querySelector('#circle')
const $score = document.querySelector('#score')
const btnRestart = document.querySelector('#btn-restart')

function start() {
  setScore(getScore())
  setImage()
}

btnRestart.addEventListener('click', restartGame)

function restartGame() {
  setScore(0)
  setImage()
}

function setScore(score) {
  localStorage.setItem('score', score)
  $score.textContent = score
}

function setImage() {
  const score = getScore()

  if (score >= 100) {
    $circle.setAttribute('src', './assets/3pic.webp')
  } else if (score >= 80) {
    $circle.setAttribute('src', './assets/4pic.webp')
  } else if (score >= 60) {
    $circle.setAttribute('src', './assets/2pic.webp')
  } else if (score >= 40) {
    $circle.setAttribute('src', './assets/5pic.jpg')
  } else if (score >= 20) {
    $circle.setAttribute('src', './assets/6pic.jpg')
  } else {
    $circle.setAttribute('src', './assets/1pic.webp')
  }
}

function getScore() {
  const score = Number(localStorage.getItem('score'))
  return isNaN(score) ? 0 : score
}

function addOne() {
  setScore(getScore() + 1)
  setImage()
}

$circle.addEventListener('click', (event) => {
  const rect = $circle.getBoundingClientRect()

  const offfsetX = event.clientX - rect.left - rect.width / 2
  const offfsetY = event.clientY - rect.top - rect.height / 2

  const DEG = 70

  const tiltX = (offfsetY / rect.height) * DEG
  const tiltY = (offfsetX / rect.width) * -DEG

  $circle.style.setProperty('--tiltX', `${tiltX}deg`)
  $circle.style.setProperty('--tiltY', `${tiltY}deg`)

  setTimeout(() => {
    $circle.style.setProperty('--tiltX', `0deg`)
    $circle.style.setProperty('--tiltY', `0deg`)
  }, 300)

  const plusOne = document.createElement('div')
  plusOne.classList.add('plus-one')
  plusOne.textContent = '+1'
  plusOne.style.left = `${event.clientX - rect.left}px`
  plusOne.style.top = `${event.clientY - rect.top}px`

  $circle.parentElement.appendChild(plusOne)

  addOne()

  setTimeout(() => {
    plusOne.remove()
  }, 2000)
})

start()
