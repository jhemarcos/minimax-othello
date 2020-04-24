(function () {
    "use strict"

    var players, currentPlayer, board;
    var boardContainer = $(".boardContainer");

    startGame();

    function startGame() {
        players = [
            new Player("Humano", 0, false),
            new Player("IA", 1, true)
        ];
        currentPlayer = 0;
        board = new Board(players);
        renderBoard(board.board);
    }

    function renderBoard(board) {
        boardContainer.empty();

        var table = "<table class='board'>";
        for (var y = 0; y < board.length; ++y) {
            table += '<tr>';
            for (var x = 0; x < board.length; ++x) {
                var piece = board[x][y] ? board[x][y] : "";

                table += '<td class="square '+piece+'" id=' + x + y + '><div></div></td>';
            }
        }
        table += " </table>";
        boardContainer.append(table);
        listenClicks();

        $("#score1").text(players[0].qtdPieces);
        $("#score2").text(players[1].qtdPieces);
    }

    function listenClicks() {
        $('.board .square').click(function () {
            var $this = $(this);
            var x = parseInt($this.attr('id').charAt(0));
            var y = parseInt($this.attr('id').charAt(1));

            proccessMove(x, y);
        });
    }

    function proccessMove(x, y) {
        console.log("X: " + x + "Y: " + y);
        var valid = board.validMove(x, y, currentPlayer)

        if(valid) {
            var otherPlayer = currentPlayer === 0 ? 1 : 0;
            board.flip(x, y, currentPlayer);
            renderBoard(board.board);
            currentPlayer = otherPlayer;

            if(players[currentPlayer].isIa) {
                console.log(board.getAllValidMoves(currentPlayer));

                setTimeout(function(){
                    var move = players[currentPlayer].getMove(board);
                    console.log("IA move", move);
                    proccessMove(move.x, move.y);
                }, 5000);
            }
        }
    }
    
    $("#restartButton").click(function () {
        startGame();
    });
})();


