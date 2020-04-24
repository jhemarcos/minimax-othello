(function () {
    "use strict"

    var players = [
        new Player("Humano", 0, false),
        new Player("IA", 1, true)
    ];
    var board = new Board(players);
    var boardContainer = $(".boardContainer");

    startGame();

    function startGame() {
        renderBoard(board.board);
        console.log(board.getAllValidMoves(players[0]));
    }

    function renderBoard(board) {
        boardContainer.empty();

        var table = "<table class='board'>";
        for (var x = 0; x < board.length; ++x) {
            table += '<tr>';
            for (var y = 0; y < board.length; ++y) {
                var piece = board[x][y] ? board[x][y] : "";

                table += '<td class="square '+piece+'" id=' + y + x + '><div></div></td>';
            }
        }
        table += " </table>";
        boardContainer.append(table);
        listenClicks();
    }

    function listenClicks() {
        $('.board .square').click(function () {
            var $this = $(this);
            var x = $this.attr('id').charAt(0)
            var y = $this.attr('id').charAt(1)

            console.log("X: " + x + " Y: " + y);

            console.log(board.getOpponentPieces(x, y, players[0]));
    
            //Verificar se o movimento é valido
            //Virar as peças do adversário
        });
    }
    
    $("#restartButton").click(function () {
        startGame();
    });
})();


