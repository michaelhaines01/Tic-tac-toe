const Game = (function() {
    //Array of the game board
    let gamearray = Array(9).fill("")
    let game_stop = true;
    const board = (() => {
        //Renders the Game Board
        const render = () =>{
            gamearray.forEach((element, index) => {
            document.getElementById(index).innerHTML = element
            })  
        }
        const reset = () => {
            gamearray = Array(9).fill("")
            game_stop = false
            document.querySelector('#winner').innerHTML = "";
            render()
        }
        const render_winner = (x) =>{
           document.querySelector('#winner').innerHTML = x;
        }
        return {render, reset, render_winner}
    })();
    board.render();
   //Player factory function
    const Player = (name, symbol) => {
        const getsymbol = () => symbol;
        const getname = () => name;
        return {getname, getsymbol}
        }
    const displaycontroller = (() => {   
        //Assigns the player also gives you access too getsymbol() and get name() for the player of your choice
        let player1 = Player('You', 'X');
        let player2 = Player('AI', 'O')
        let turn = true;    
        const changeturn = () =>{
           turn = !turn;
        }
        const whosturn = () =>{
            if(turn === true){
                return player1
            }
           else{
                return player2
            }
        }
        const eventclick = () => {
            //Bind
            const reset_btn = document.querySelector('#btnreset')
            const cells = document.querySelectorAll('.marker')
            reset_btn.addEventListener("click", board.reset);
            cells.forEach((cell) => {
                cell.addEventListener("click", handler);
            });
        };
        const handler = (event) => {
            if(game_stop == true){
                board.reset()
            }
            //Stops you overriding a move already made
            if (gamearray[event.target.id] != ""){
                return
            }
            else{
                gamearray[event.target.id] = whosturn().getsymbol();
                board.render()
                checkwinner()
                changeturn()
                ai()
            }
        }
        const checkwinner = () => {
            //makes an array of all the positions the current player has
            const winningcombos =  [
                [0, 1, 2],
                [0, 3, 6],
                [0, 4, 8],
                [1, 4, 7],
                [2, 5, 8],
                [3, 4, 5],
                [6, 7, 8],
                [6, 4, 2],
            ]
            let playerpos = [], i;
            for(i = 0; i < gamearray.length; i++){
                //looks through the array for any symbol of current players symbol then pushes the index to new array
                if (gamearray[i] === whosturn().getsymbol()){
                    playerpos.push(i);
                } 
            } 
            for (let i = 0; i < winningcombos.length; i++){   
                //compares player positons to all the winning combos
                const winner = winningcombos[i].every(i => playerpos.includes(i))
                //if it finds a winning combo alerts whos the winner if no winner sends tie
                if(winner == true){
                    declaration = ` ${whosturn().getname()} won.`
                    board.render_winner(declaration)
                    playerpos = [];
                    game_stop = true;
                }
                if(winner != true && playerpos.length === 5){
                    declaration = 'Tie';
                    board.render_winner(declaration)
                    playerpos = [];
                    game_stop = true;
                }
            }
        }
        //Needs to be improved currently chooses random number
        const ai = () =>{
            playerpos = []
            //Finds all blanks positions
            for(let i = 0; i < gamearray.length; i++){
                if (gamearray[i] === ""){
                        playerpos.push(i);
                } 
            } 
            // Selects random number in range of playerpos availible
            random =  Math.floor(Math.random() * playerpos.length);
            gamearray[playerpos[random]] = whosturn().getsymbol();      
            board.render()
            checkwinner()
            changeturn()    
        }
        return {eventclick}    
    })();
    displaycontroller.eventclick();
})();


