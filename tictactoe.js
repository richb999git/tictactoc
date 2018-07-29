// tic tac toe

// Module
var tictactoe = (function () {
    var testDraw;
    var game, player, player1, player2;
    var gameOver = false;
    newGame();

    // new game button
    document.getElementById("newGame").addEventListener('click', newGame); 

    // game position listeners
    for (var i=0; i<9; i++) {
        var x = "p" + i;
        document.getElementById(x).addEventListener('click', function(e) {
        posPressed(e);  
        });
    }

    function newGame() {
        // 1 = x (player 1), -1 = O (player 2), 0 = blank
        game = [0,0,0,0,0,0,0,0,0];
        player = 1;
        player1 = "Player1";
        player2 = "Player2";
        gameOver = false;
        document.getElementById("winStatus").textContent = "";
        for (var i=0; i<9; i++) {
            document.getElementById("p" + i).textContent = "";
        }
    }


    function posPressed(e) {
        // check if game is over. If so then ignore click
        if (gameOver) {
            return;
        }
        // check if position is blank. If not ignore click
        if (game[e.target.id[1]] == 0) {
            //place x or o
            if (player == 1) {
                game[e.target.id[1]] = 1;
                e.target.textContent = "X";
            } else {
                game[e.target.id[1]] = -1;
                e.target.textContent = "O";
            }
        }

        // check if winner or draw here? or outside function?
        var detect = detectWinOrDraw();
        if (detect != 0) {
            gameOver = true;
        }

        // swap player
        if (player == 1) {
            player = 2;
        } else {
            player = 1;
        }
    }


    function detectWinOrDraw() {
        player1 = document.getElementById("p1Name").value    
        player2 = document.getElementById("p2Name").value
        if (player1 == "") {
            player1 = "Player1";
        }
        if (player2 == "") {
            player2 = "Player2";
        }    

        // detect pattern
        var win = [0,0,0,0,0,0,0,0];
        win[0] = game[0] + game[1] + game[2];
        win[1] = game[3] + game[4] + game[5];
        win[2] = game[6] + game[7] + game[8];
        win[3] = game[0] + game[3] + game[6];
        win[4] = game[1] + game[4] + game[7];
        win[5] = game[2] + game[5] + game[8];
        win[6] = game[0] + game[4] + game[8];
        win[7] = game[2] + game[4] + game[6];

        var winner;
        for (i=0; i<win.length; i++) {
            if (win[i] == 3) {
                winner = 1;
                break;
            } else if (win[i] == -3) {
                winner = 2;
                break;
            }
        }

        // if win declare winner
        if (winner == 1) {
            document.getElementById("winStatus").textContent = " " + player1 + " is the winner!";
            return 1;
        } else if(winner == 2) {
            document.getElementById("winStatus").textContent = " " + player2 + " is the winner!";
            return 2;
        }

        // check if a draw by checking if all of the square are not 0
        var draw = game.filter(function(item) {
           return (item == 0); 
        });

        if (draw.length == 0) {
            document.getElementById("winStatus").textContent = "It's a snore draw!";
            return 3; // draw
        }

        return 0; // still playing
    }

    });

tictactoe();