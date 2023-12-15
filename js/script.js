const canvas = document.querySelector('canvas')
const ctx = canvas.getContext("2d")
const score = document.querySelector('.score')

const size = 30

const snake = [
    { x: 30, y: 60 }
    
]

let direction, loopId 
let contsPoints = 0

const randomNumber = (min, max) => {
    const radomNumber = Math.round(Math.random() * (max - min) + min)
    
    return radomNumber
}
const randomPosition = () => {

    const number = randomNumber(0, canvas.width - size)
    
    const teste = Math.round(number / 30) * 30

    return teste
}
const radomColor = () => {
    const red = randomNumber(0, 255)
    const green = randomNumber(0, 255)
    const blue = randomNumber(0, 255)
    return `rgb(${red},${green},${blue})`
}

const food = {

    x: randomPosition(),
    y: randomPosition(),
    color: radomColor()
}

const drawFood = () => {

    const { x, y, color } = food

    ctx.shadowColor = color
    ctx.shadowBlur = 50
    ctx.fillStyle = color
    ctx.fillRect(x, y, size, size)
    ctx.shadowBlur = 0

}
const drawSnake = () => {

    ctx.fillStyle = "#ddd"

    snake.forEach((position, index) => {
        if (index === snake.length - 1) {
            ctx.fillStyle = "white"
        }
        ctx.fillRect(position.x, position.y, size, size)
    })
}

const moveSnake = () => {
    if (!direction) return

    const head = snake[snake.length - 1]


    if (direction == "right") {
        snake.push({ x: head.x + size, y: head.y })

    }
    if (direction == "left") {
        snake.push({ x: head.x - size, y: head.y })

    }
    if (direction == "down") {
        snake.push({ x: head.x, y: head.y + size })

    }
    if (direction == "up") {
        snake.push({ x: head.x, y: head.y - size })

    }

    snake.shift()
}
const drawGrid = () => {

    ctx.lineWidth = 1
    ctx.strokeStyle = "#191919"

    for (let index = 30; index < canvas.width; index += 30) {

        ctx.beginPath()
        ctx.lineTo(index, 0)
        ctx.lineTo(index, 600)
        ctx.stroke()

        ctx.beginPath()
        ctx.lineTo(0, index)
        ctx.lineTo(600, index)
        ctx.stroke()
    }

}
const checkEat = () => {
    const head = snake[snake.length - 1]
    if (head.x == food.x && head.y == food.y) {
         
        console.log(contsPoints)     
        snake.push(head)
        
        food.x= randomPosition(),
        food.y= randomPosition(),
        food.color= radomColor()
        return true
    }
}
const checkCollision = () => {
    const head = snake[snake.length - 1]

    for (let i = 0; i < snake.length - 2; i++) { // exclui a última posição
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true
        }
    }
}
const checkCollisionBorder = () => {
    const head = snake[snake.length - 1]

    if (head.x > canvas.width - size || head.x < 0 || head.y > canvas.height - size || head.y < 0) {
        return true
    }

}
const gameLoop = () => {

    clearInterval(loopId)

    ctx.clearRect(0, 0, 600, 600)
    
    drawGrid()
    drawFood()
    drawSnake()
    moveSnake()

    if(checkEat()){
        contsPoints++ 
        console.log(contsPoints)
        score.innerHTML = contsPoints
    }
    if (checkCollision()) {

        alert('Você perdeu!')
        snake.length = 0; 
        snake[0] = { x: 0, y: 30 }; 
    }
    if(checkCollisionBorder()){
        alert('Você perdeu!')
        snake.length = 0; 
        snake[0] = { x: 0, y: 30 }; 
    }
    


    loopId = setTimeout(() => {
        gameLoop()
    }, 300)
}


document.addEventListener("keydown", ({ key }) => {

    if (key == "ArrowRight" && direction != "left") {
        direction = "right"

    } else if (key == "ArrowUp" && direction != "down") {
        direction = "up"

    } else if (key == "ArrowDown" && direction != "up") {
        direction = "down"

    } else if (key == "ArrowLeft" && direction != "right") {
        direction = "left"

    }
    console.log(key)
})

gameLoop()