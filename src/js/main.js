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
    }

    function listenClicks() {
        $('.board .square').click(function () {
            var $this = $(this);
            var y = parseInt($this.attr('id').charAt(0));
            var x = parseInt($this.attr('id').charAt(1));

            var valid = board.validMove(x, y, players[currentPlayer])

            if(valid) {
                board.flip(x, y, players[currentPlayer]);
                renderBoard(board.board);
                currentPlayer = currentPlayer === 0 ? 1 : 0;
            }
        });
    }
    
    $("#restartButton").click(function () {
        startGame();
    });
})();


