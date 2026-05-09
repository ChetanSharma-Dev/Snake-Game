window.onload = () => {

const board = document.querySelector(".board"); 
let StartButton = document.querySelector(".btn-start");
let Modal = document.querySelector(".modal");
let StartGame = document.querySelector(".start-game");
let GameOver = document.querySelector(".game-over");
let RestartGameButton = document.querySelector(".btn-restart");

let HighScoreElement = document.querySelector("#high-score");
let ScoreElement = document.querySelector("#score");
let TimeElement = document.querySelector("#time");


const blockHeight = 50;
const blockWidth = 50;

let HighScore = localStorage.getItem("HighScore") || 0;
let Score = 0;
let Time = "00:00";

HighScoreElement.innerText = HighScore;


const cols = Math.floor(board.clientWidth / blockWidth);
const rows = Math.floor(board.clientHeight / blockHeight);

let blocks = [];
let snake = [{x : 1, y : 5}, {x : 1, y : 4}, {x : 1, y : 3}];

let direction = "right";

let intervalId = null;
let TimeIntervalId = null;

function generateFood(){

    let newFood;

    do{

        newFood = {
            x: Math.floor(Math.random() * rows),
            y: Math.floor(Math.random() * cols)
        };

    }
    while(
        snake.some(segment => 
            segment.x === newFood.x &&
            segment.y === newFood.y
        )
    );

    return newFood;
}

food = generateFood();


for (let row = 0; row< rows; row++){
    for (let col = 0; col< cols; col++){
        let block = document.createElement("div");
        block.classList.add("block");
        board.appendChild(block);
        // block.innerText = `${row}-${col}`;
        blocks[`${row}-${col}`] = block;
    }
}


function render(){
    let head = null;

    blocks[`${food.x}-${food.y}`].classList.add("food");

    if(direction === "left"){
        head = {x:snake[0].x, y:snake[0].y-1}
    } 
    else if(direction === "right") {
        head = {x:snake[0].x, y:snake[0].y+1}
    }
    else if(direction === "up") {
        head = {x:snake[0].x-1, y:snake[0].y}
    }
    else if(direction === "down") {
        head = {x:snake[0].x+1, y:snake[0].y}
    }
   
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });

    if(snake.slice(0, -1).some(segment => segment.x === head.x && segment.y === head.y)) {
    Modal.style.display = "flex";
    StartGame.style.display = "none";
    GameOver.style.display = "flex";

    clearInterval(intervalId);
    clearInterval(TimeIntervalId);

    return;
    }

    if(head.x<0 || head.x>=rows || head.y<0 || head.y>=cols){
        Modal.style.display = "flex";
        StartGame.style.display = "none";
        GameOver.style.display = "flex";

        clearInterval(intervalId);
        clearInterval(TimeIntervalId);
        
        return;
    }

    if(head.x == food.x && head.y == food.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        food = generateFood();

        Score += 10;
        ScoreElement.innerText = Score;

        if(Score>HighScore){
            HighScore = Score;
            localStorage.setItem("HighScore", HighScore.toString());
        }
        
        snake.unshift(head);
    }

    else{
        snake.unshift(head);
        snake.pop();
    }


    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill")
    })
}

StartButton.addEventListener("click", () =>{
    Modal.style.display = "none";
    render();
    intervalId = setInterval(()=> {
    render();
    }, 300);
    TimeIntervalId = setInterval(() => {
        let [min, sec] = Time.split(":").map(Number);
        if(sec == 59){
            min +=1;
            sec = 0;
        }
        else{
            sec +=1;
        }

        Time = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;


        TimeElement.innerText = Time;
    }, 1000);
})

RestartGameButton.addEventListener("click", RestartGame);

function RestartGame(){

    clearInterval(intervalId);       // stop game loop
    clearInterval(TimeIntervalId);   // ✅ stop time loop

    blocks[`${food.x}-${food.y}`].classList.remove("food");

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });

    
    Score = 0;
    Time = "00:00";

    TimeElement.innerText = Time;

    
    Modal.style.display = "none"; 
    StartGame.style.display = "flex";  // ✅ reset start screen
    GameOver.style.display = "none";   // ✅ hide game over
    direction = "right";
    
    snake = [{x : 1, y : 5}, {x : 1, y : 4}, {x : 1, y : 3}];
    food = generateFood();
    
    render();

    intervalId = setInterval(()=> {render()}, 300);

    TimeIntervalId = setInterval(() => {
        let [min, sec] = Time.split(":").map(Number);

        if(sec == 59){
            min +=1;
            sec = 0;
        } else {
            sec +=1;
        }

        Time = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
        TimeElement.innerText = Time;

    }, 1000);
    
    ScoreElement.innerText = Score;
    HighScoreElement.innerText = HighScore;
    
}

addEventListener("keydown", (event) => {
    if(event.key == "ArrowUp"){
        direction = "up";
    }
    else if(event.key == "ArrowDown"){
        direction = "down";
    }
    else if(event.key == "ArrowLeft"){
        direction = "left";
    }
    else if(event.key == "ArrowRight"){
        direction = "right";
    }
})

let resizeTimer;

window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);

    resizeTimer = setTimeout(() => {
        location.reload();
    }, 300);
});

}