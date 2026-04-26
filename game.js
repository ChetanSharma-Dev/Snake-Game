export let snake = [
    { x: 1, y: 3 },
    { x: 1, y: 4 }
];

export let direction = "down";

export let food = null;

export function createFood(rows, cols) {
    food = {
        x: Math.floor(Math.random() * rows),
        y: Math.floor(Math.random() * cols)
    };
}

export function moveSnake() {
    let head = { ...snake[0] };

    if (direction === "left") head.y--;
    else if (direction === "right") head.y++;
    else if (direction === "up") head.x--;
    else if (direction === "down") head.x++;

    snake.unshift(head);
    snake.pop();

    return head;
}

export function growSnake(head) {
    snake.push(head);
}

export function checkCollision(head, rows, cols) {
    return (
        head.x < 0 ||
        head.x >= rows ||
        head.y < 0 ||
        head.y >= cols
    );
}