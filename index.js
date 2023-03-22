const prompt = require("prompt-sync")();
const Game = require("./game");

while(true){
    let size;
    do {
        size = prompt("Enter a size for the grid between 4 and 16 (default is 4): ");
        if(!size) size = 4;
    } while(isNaN(size) || size < 4 || size > 16)

    let game = new Game(size);
    const allGameEvents = game.getAllGameEvents;
    console.clear();

    while(true){
        console.table(game.getGameGrid)
        let isGameEvents = game.isGameEvents();
        switch (isGameEvents) {
            case allGameEvents.won:
                console.log("You got a 2048! Congrats!")
                break;
            case allGameEvents.lost:
                console.log("You Lost!")
                break;
        }
        if(isGameEvents) break;
        let direction;
        do {
            direction = prompt("Please enter a direction (WASD): ");
        } while(!(["w", "a", "s", "d"].includes(`${direction.toLowerCase()}`)))
        game.pushCellsDirection(direction);
        console.clear();
    }

    let retry;
    do {
        retry = prompt("Do you want to play again? (Y/N) ");
    } while(!["y", "n"].includes(`${retry.toLowerCase()}`))

    if(retry === "n") break;
    console.clear()
}