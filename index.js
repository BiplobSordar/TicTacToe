

const cells = document.querySelectorAll('.cell')
let currentPlayer = 'X'
const moveX = document.getElementById('moves-x').querySelector('ul')
const moveO = document.getElementById('moves-o').querySelector('ul')
const winnerDisplay = document.getElementById('winner')
const button=document.getElementById('restart')
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]


const checkWinner = () => {
    function checkSome(arr) {

        for (let i = 0; i < arr.length; i++) {
            if (checkEvery(arr[i])) {

                return true
            }

        }
        return false

    }
    function checkEvery(arr) {
        let count = 0
        for (let i = 0; i < arr.length; i++) {
            if (cells[arr[i]].textContent === currentPlayer) {
                count++
            }
        }
        return count == 3 ? true : false
    }

    return checkSome(winningCombinations)



}


const handelClick = (e) => {
    let cell = e.target
    console.log(cell.textContent, 'this is the tergeted cell')
    if (cell.textContent !== '') return
    cell.textContent = currentPlayer
    const move = document.createElement('li')
    move.textContent = `Move to ${cell.dataset.index}`
    if (currentPlayer === 'X') {
        moveX.appendChild(move)
    } else {
        moveO.appendChild(move)
    }

    let result = checkWinner()
    if (result) {
        cells.forEach((cell)=>{
            cell.removeEventListener('click',handelClick)
        })
        winnerDisplay.textContent=` Player ${currentPlayer} is the Winner`
        button.classList.remove('hidden')
        button.addEventListener('click',resetBoard)
        

        return

    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
}
const resetBoard = () => {
    cells.forEach((cell) => {
        cell.textContent = ''
    })
    moveX.innerHTML = ''
    moveO.innerHTML = ''
    winnerDisplay.textContent = ''
    button.classList.add('hidden')


}


cells.forEach((cell) => {
    cell.addEventListener('click', handelClick)
})

