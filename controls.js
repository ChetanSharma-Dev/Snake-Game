import { direction } from "./game.js";

export function setupControls(setDirection) {
    addEventListener("keydown", (e) => {
        if (e.key === "ArrowUp") setDirection("up");
        else if (e.key === "ArrowDown") setDirection("down");
        else if (e.key === "ArrowLeft") setDirection("left");
        else if (e.key === "ArrowRight") setDirection("right");
    });
}