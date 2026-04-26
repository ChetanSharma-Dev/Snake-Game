export function updateScore(scoreElement, score) {
    scoreElement.innerText = score;
}

export function updateTime(timeElement, time) {
    timeElement.innerText = time;
}

export function drawSnake(blocks, snake) {
    snake.forEach(seg => {
        blocks[`${seg.x}-${seg.y}`].classList.add("fill");
    });
}

export function clearSnake(blocks, snake) {
    snake.forEach(seg => {
        blocks[`${seg.x}-${seg.y}`].classList.remove("fill");
    });
}

export function drawFood(blocks, food) {
    blocks[`${food.x}-${food.y}`].classList.add("food");
}

export function clearFood(blocks, food) {
    blocks[`${food.x}-${food.y}`].classList.remove("food");
}