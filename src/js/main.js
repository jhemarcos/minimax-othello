(function () {
    "use strict"

    var players = [
        new Player("Humano", 0, false),
        new Player("IA", 1, true)
    ];
    var board = new Board(players);
    var boardContainer = $(".boardContainer");
    var currentPlayer = 0;

    startGame();

    function startGame() {
        board = new Board(players);
        players = [
            new Player("Humano", 0, false),
            new Player("IA", 1, true)
        ];
        renderBoard(board.board);
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

        $("#score1").text(players[0].qtdPieces);
        $("#score2").text(players[1].qtdPieces);
    }

    function listenClicks() {
        $('.board .square').click(function () {
            var $this = $(this);
            var y = parseInt($this.attr('id').charAt(0));
            var x = parseInt($this.attr('id').charAt(1));

            proccessMove(x, y);
        });
    }

    function proccessMove(x, y) {
        var valid = board.validMove(x, y, players[currentPlayer])

        if(valid) {
            var otherPlayer = currentPlayer === 0 ? 1 : 0;
            board.flip(x, y, players[currentPlayer], players[otherPlayer]);
            renderBoard(board.board);
            currentPlayer = otherPlayer;

            if(players[currentPlayer].isIa) {
                var move = players[currentPlayer].getMove();
                proccessMove(x, y);
            }
        }
    }
    
    $("#restartButton").click(function () {
        startGame();
    });
})();


