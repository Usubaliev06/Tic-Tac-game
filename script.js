const buttons = document.querySelectorAll('.block')
const resetBtn = document.querySelector('.reset')
const resultBlock = document.querySelector('.result')
const whoisnow = document.querySelector('.whoisnow')

let gamer = 'x'

const checkWin = () => {
  const winCombinations = [
    [0,3,6], [1,4,7], [2,5,8], // вертикаль
    [0,1,2], [3,4,5], [6,7,8], // горизонталь
    [0,4,8], [2,4,6] // диагональ
  ]
  const btn = (i, j) => buttons[winCombinations[i][j]].textContent
  
  let isWin = false

  for (let i=0; i<winCombinations.length; i++) {
    isWin = btn(i, 0)
      && btn(i, 0) === btn(i, 1)
      && btn(i, 0) === btn(i, 2)
    if (isWin) break
  }

  const deadHeat = Array.from(buttons).every((b) => b.textContent)
  const winText = isWin ? `Победили ${gamer === 'x' ? 'нолики' : 'крестики'}` : ''

  return deadHeat ? 'Ничья' : winText
}



const setWhoisnowText = (g) => {
  const gameText = `Сейчас ход ${g === 'x' ? 'крестиков' : 'ноликов'}`
  whoisnow.textContent = checkWin() ? 'Конец игры' : gameText
}
setWhoisnowText(gamer)

for (let i=0; i<9; i++) {
  buttons[i].addEventListener('click', (e) => {
    if (e.target.textContent === '' && !checkWin())  {
      e.target.textContent = gamer
      gamer = gamer === 'x' ? 'o' : 'x'
      setWhoisnowText(gamer)
    }

    resultBlock.textContent = checkWin()
  })
}

resetBtn.addEventListener('click', () => {
  resultBlock.textContent = ''
  for (let i=0; i<9; i++) {
    buttons[i].textContent = ''
    gamer = 'x'
  }
})



resultBlock.textContent = checkWin()