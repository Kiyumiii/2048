class Game {
    #grid;
    #gameEvents = {
        "won": 1, //2048
        "lost": 2 //No more moves possible
    }

    constructor(size){
        this.#generateGrid(size)
    }

    #generateGrid(size) {
        this.#grid = Array(size).fill().map(() => Array(size).fill(0));
        this.#spawn(2)
    }

    #generateNumberCell() {
        let min = 1, max = 100;
        let random = Math.floor(Math.random() * (max - min + 1)) + min <= 90 ? 2 : 4;
        return random;
    }

    #spawn(amount){
        for(var a = 0; a < amount; a++) {
            let emptyCells = this.#getEmptyCells();
            let min = 0, max = emptyCells.length - 1;
            let randomIndex = Math.floor(Math.random() * (max - min + 1)) + min;

            //Extracting the coordonates from the empty cell
            let cell = emptyCells[randomIndex], rowIndex = cell[0], colIndex = cell[1];
            this.#grid[rowIndex][colIndex] = this.#generateNumberCell()
        }
    }

    #getEmptyCells(){
        let list = [], index = 0;
        for(let x = 0; x < this.#grid.length; x++){
            for(let y = 0; y < this.#grid[x].length; y++){
                if(this.#grid[x][y] === 0){
                    list[index] = [x, y]
                    index++
                }
            }
        }
        return list;
    }

    pushCellsDirection(direction) {
        switch (direction) {
            case "w":
                this.#moveUp()
                break;
            case "a":
                this.#moveLeft()
                break;
            case "s":
                this.#moveDown()
                break;
            case "d":
                this.#moveRight()
                break;
        }
    }

    #moveUp(){
        let hasMoved = false;
        for(let colIndex = 0; colIndex < this.#grid.length; colIndex++){
            let currentNumberInLine = 0;
            for(let rowIndex = 0; rowIndex < this.#grid.length; rowIndex++){
                if(this.#grid[rowIndex][colIndex] !== 0) {

                    if(currentNumberInLine !== rowIndex) {
                        const currentNumber = this.#grid[rowIndex][colIndex];
                        this.#grid[currentNumberInLine][colIndex] = currentNumber;
                        this.#grid[rowIndex][colIndex] = 0; 
                        hasMoved = true;
                    }

                    if(this.#grid?.[currentNumberInLine - 1]?.[colIndex] && this.#grid?.[currentNumberInLine - 1]?.[colIndex] === this.#grid?.[currentNumberInLine]?.[colIndex]){
                        this.#grid[currentNumberInLine - 1][colIndex] *= 2;
                        this.#grid[currentNumberInLine][colIndex] = 0;
                        hasMoved = true;
                        currentNumberInLine--;
                    }

                    currentNumberInLine++;
                }
            }
        }
        if(hasMoved) this.#spawn(1)
    }

    #moveLeft(){
        let hasMoved = false;
        for(let rowIndex = 0; rowIndex < this.#grid.length; rowIndex++){
            let currentNumberInLine = 0;
            for(let colIndex = 0; colIndex < this.#grid.length; colIndex++){
                if(this.#grid[rowIndex][colIndex] !== 0) {

                    if(currentNumberInLine !== colIndex) {
                        const currentNumber = this.#grid[rowIndex][colIndex];
                        this.#grid[rowIndex][currentNumberInLine] = currentNumber;
                        this.#grid[rowIndex][colIndex] = 0; 
                        hasMoved = true;
                    }

                    if(this.#grid[rowIndex][currentNumberInLine - 1] === this.#grid[rowIndex][currentNumberInLine]){
                        this.#grid[rowIndex][currentNumberInLine - 1] *= 2;
                        this.#grid[rowIndex][currentNumberInLine] = 0;
                        hasMoved = true;
                        currentNumberInLine--;
                    }

                    currentNumberInLine++;
                }
            }
        }
        if(hasMoved) this.#spawn(1)
    }

    #moveDown(){
        let hasMoved = false;
        for(let colIndex = 0; colIndex < this.#grid.length; colIndex++){
            let currentNumberInLine = this.#grid.length - 1;
            for(let rowIndex = this.#grid.length - 1; rowIndex >= 0; rowIndex--){
                if(this.#grid[rowIndex][colIndex] !== 0) {

                    if(currentNumberInLine !== rowIndex) {
                        const currentNumber = this.#grid[rowIndex][colIndex];
                        this.#grid[currentNumberInLine][colIndex] = currentNumber;
                        this.#grid[rowIndex][colIndex] = 0; 
                        hasMoved = true;
                    }

                    if(this.#grid?.[currentNumberInLine + 1]?.[colIndex] && this.#grid?.[currentNumberInLine + 1]?.[colIndex] === this.#grid?.[currentNumberInLine]?.[colIndex]){
                        this.#grid[currentNumberInLine + 1][colIndex] *= 2;
                        this.#grid[currentNumberInLine][colIndex] = 0;
                        hasMoved = true;
                        currentNumberInLine++;
                    }

                    currentNumberInLine--;
                }
            }
        }
        if(hasMoved) this.#spawn(1)
    }

    #moveRight(){
        let hasMoved = false;
        for(let rowIndex = 0; rowIndex < this.#grid.length; rowIndex++){
            let currentNumberInLine = this.#grid.length - 1;
            for(let colIndex = this.#grid.length - 1; colIndex >= 0; colIndex--){
                if(this.#grid[rowIndex][colIndex] !== 0) {
                    if(currentNumberInLine !== colIndex) {
                        const currentNumber = this.#grid[rowIndex][colIndex];
                        this.#grid[rowIndex][currentNumberInLine] = currentNumber;
                        this.#grid[rowIndex][colIndex] = 0; 
                        hasMoved = true;
                    }

                    if(this.#grid[rowIndex][currentNumberInLine + 1] === this.#grid[rowIndex][currentNumberInLine]){
                        this.#grid[rowIndex][currentNumberInLine + 1] *= 2;
                        this.#grid[rowIndex][currentNumberInLine] = 0;
                        hasMoved = true;
                        currentNumberInLine++;
                    }

                    currentNumberInLine--;
                }
            }
        }
        if(hasMoved) this.#spawn(1)
    }

    isGameEvents(){
        let grid = this.#grid;
        for(let rowIndex = 0; rowIndex < grid.length; rowIndex++){
            if(grid[rowIndex].includes(2048)) return 1;
        }

        //If there's still spots to play on
        for(let rowIndex = 0; rowIndex < grid.length; rowIndex++){
            if(grid[rowIndex].includes(0)) return;
        }

        //Check if a move is still possible
        for(let rowIndex = 0; rowIndex < grid.length; rowIndex++){
            for(let colIndex = 0; colIndex < grid.length; colIndex++){
                if(grid[rowIndex][colIndex] === grid[rowIndex][colIndex + 1]
                    || grid[rowIndex][colIndex] === grid[rowIndex + 1]?.[colIndex]
                ) return;
            }
        }

        return 2;
    }

    get getGameGrid(){
        return this.#grid;
    }

    get getAllGameEvents(){
        return this.#gameEvents;
    }
}

module.exports = Game