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
let snake = [{
    x : 1, y : 3,
}, {
  x : 1, y : 4,  
}];

let direction = "down";

let intervalId = null;
let TimeIntervalId = null;

let  food = { x:Math.floor(Math.random()*rows) , y:Math.floor(Math.random()*cols)};


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

    if(head.x == food.x && head.y == food.y){
        blocks[`${food.x}-${food.y}`].classList.remove("food");
        food = { x:Math.floor(Math.random()*rows) , y:Math.floor(Math.random()*cols)};
        blocks[`${food.x}-${food.y}`].classList.add("food");

        snake.push(head);

        Score += 10;
        ScoreElement.innerText = Score;

        if(Score>HighScore){
            HighScore = Score;
            localStorage.setItem("HighScore", HighScore.toString());
        }
        
    }

    if(head.x<0 || head.x>=rows || head.y<0 || head.y>=cols){
        Modal.style.display = "flex";
        StartGame.style.display = "none";
        GameOver.style.display = "flex";
    
        clearInterval(intervalId)
        return;
    }

    snake.unshift(head);
    snake.pop();

    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.add("fill")
    })
}

StartButton.addEventListener("click", () =>{
    Modal.style.display = "none";
    intervalId = setInterval(()=> {
    render();
    }, 301);
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
    blocks[`${food.x}-${food.y}`].classList.remove("food");
    snake.forEach(segment => {
        blocks[`${segment.x}-${segment.y}`].classList.remove("fill");
    });

    
    Score = 0;
    Time = "00:00";
    
    Modal.style.display = "none"; 
    direction = "right";
    
    snake = [{x : 1, y : 3,}, {x : 1, y : 4,}];
    food = { x:Math.floor(Math.random()*rows) , y:Math.floor(Math.random()*cols)};
    intervalId = setInterval(()=> {render()}, 301);
    
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