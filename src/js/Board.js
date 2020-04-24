function Board(players) {
    this.size = 8;
    this.players = players;
  
    this.generateBoard();
    this.startBoard();
}

Board.prototype.generateBoard = function() {
    var board = [];
    for (var x = 0; x < this.size; x++) {
        board[x] = [];
        for (var y = 0; y < this.size; y++) {
            board[x][y] = null;
        }
    }
    this.board = board;
}

Board.prototype.startBoard = function() {
    this.board[3][3] = this.players[0].color;
    this.board[4][4] = this.players[0].color;
    this.board[4][3] = this.players[1].color;
    this.board[3][4] = this.players[1].color;
}

Board.prototype.searchUp = function(x, y, player) {
    var pieces = [];

    y--;
    while(y >= 0){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        y--;
    }

    return pieces;
}

Board.prototype.searchDown = function(x, y, player) {
    var pieces = [];

    y++;
    while(y < this.size){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        y++;
    }

    return pieces;
}

Board.prototype.searchLeft = function(x, y, player) {
    var pieces = [];

    x--;
    while(x >= 0){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x--;
    }

    return pieces;
}

Board.prototype.searchRight = function(x, y, player) {
    var pieces = [];

    x++;
    while(x < this.size){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x++;
    }

    return pieces;
}

Board.prototype.searchUpLeft = function(x, y, player) {
    var pieces = [];

    x--;
    y--;
    while(x >= 0 && y >= 0){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x--;
        y--;
    }

    return pieces;
}

Board.prototype.searchUpRight = function(x, y, player) {
    var pieces = [];

    x++;
    y--;
    while(x < this.size && y >= 0){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x++;
        y--;
    }

    return pieces;
}

Board.prototype.searchDownLeft = function(x, y, player) {
    var pieces = [];

    x--;
    y++;
    while(x >= 0 && y < this.size){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x--;
        y++;
    }

    return pieces;
}

Board.prototype.searchDownRight = function(x, y, player) {
    var pieces = [];

    x++;
    y++;
    while(x < this.size && y < this.size){
        if(!this.board[x][y]){
            return false;
        }
        if(this.board[x][y] === player.color){
            if(pieces.length === 0){
                return false;
            } else {
                return pieces;
            }
        }
        pieces.push({x: x, y: y});
        x++;
        y++;
    }

    return pieces;
}

Board.prototype.getOpponentPieces = function(x, y, player) {
    var pieces = [];

    var up = this.searchUp(x, y, player);
    pieces = pieces.concat(up ? up : []);
    var down = this.searchDown(x, y, player);
    pieces = pieces.concat(down ? down : []);
    var left = this.searchLeft(x, y, player);
    pieces = pieces.concat(left ? left : []);
    var right = this.searchRight(x, y, player);
    pieces = pieces.concat(right ? right : []);
    var upLeft = this.searchUpLeft(x, y, player);
    pieces = pieces.concat(upLeft ? upLeft : []);
    var downLeft = this.searchDownLeft(x, y, player);
    pieces = pieces.concat(downLeft ? downLeft : []);
    var upRight = this.searchUpRight(x, y, player);
    pieces = pieces.concat(upRight ? upRight : []);
    var downRight = this.searchDownRight(x, y, player);
    pieces = pieces.concat(downRight ? downRight : []);
    
    return pieces;
}

Board.prototype.validMove = function(x, y, player) {
    return this.getOpponentPieces(x, y, player).length !== 0;
}

Board.prototype.getAllValidMoves = function(player) {
    var validMoves = [];

    for (var x = 0; x < this.size; x++) {
        for (var y = 0; y < this.size; y++) {
            if(this.validMove(x, y, player)) {
                validMoves.push({x: x, y: y});
            }
        }
    }

    return validMoves;
}