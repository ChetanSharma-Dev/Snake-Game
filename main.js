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

let intervalId = setInterval(gameLoop, 300); // store interval

function gameLoop() {
    let head = moveSnake();  // ✅ move first

    // 🔴 FIRST check collision
    if (checkCollision(head, rows, cols)) {
        clearInterval(intervalId);   // ✅ stop loop
        alert("Game Over");
        return;
    }

    // ✅ NOW safe to touch UI
    clearSnake(blocks, snake);

    if (head.x === food.x && head.y === food.y) {
        clearFood(blocks, food);
        growSnake(head);
        createFood(rows, cols);

        score += 10;
        updateScore(scoreElement, score);
    }

    drawFood(blocks, food);
    drawSnake(blocks, snake);
}

setupControls((dir) => {
    direction = dir;
});

import { setDirection } from "./game.js";
setupControls(setDirection);