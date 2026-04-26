import {
    snake,
    direction,
    food,
    createFood,
    moveSnake,
    growSnake,
    checkCollision
} from "./game.js";

import {
    updateScore,
    drawSnake,
    clearSnake,
    drawFood,
    clearFood
} from "./ui.js";

import { setupControls } from "./controls.js";

const board = document.querySelector(".board");
const scoreElement = document.querySelector("#score");

const blockSize = 50;
const cols = Math.floor(board.clientWidth / blockSize);
const rows = Math.floor(board.clientHeight / blockSize);

let blocks = [];
let score = 0;

for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
        let div = document.createElement("div");
        div.classList.add("block");
        board.appendChild(div);
        blocks[`${r}-${c}`] = div;
    }
}

createFood(rows, cols);

function gameLoop() {
    clearSnake(blocks, snake);

    let head = moveSnake();

    if (head.x === food.x && head.y === food.y) {
        clearFood(blocks, food);
        growSnake(head);
        createFood(rows, cols);

        score += 10;
        updateScore(scoreElement, score);
    }

    if (checkCollision(head, rows, cols)) {
        alert("Game Over");
        return;
    }

    drawFood(blocks, food);
    drawSnake(blocks, snake);
}

setInterval(gameLoop, 300);

setupControls((dir) => {
    direction = dir;
});