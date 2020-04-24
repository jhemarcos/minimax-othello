function IA() {
    this.color = color;
    this.maxDepth = 4;
  }
  
  IA.prototype.move = function(board) {
    this.visits = 0;
    var res = this.minimax(board, 0, this.color, this.maxDepth, -100000, 100000);
    console.log(this.visits)
    return res.pos;
  }

  IA.prototype.minimax = function(board, depth, color, maxDepth, alpha, beta) {
    // console.log(depth);
    this.visits++;
    var newBoard, score, move;
    var bestMove;
    var moves = board.getAllValidMoves({color: color});
    if(depth >= maxDepth || moves.length === 0){
      return this.mobility(board);
    }
    if(color === this.color){
      // Maximize
      for (var i = moves.length - 1; i >= 0; i--) {
        move = moves[i];
        newBoard = board.copy();
        this._applyMove(newBoard, move, color);
        score = this.minimax(newBoard, (depth + 1), (color ? 0 : 1), maxDepth, alpha, beta);
        move.score = score;
        if(score > alpha){
          alpha = score;
          bestMove = move;
        }
        if(beta <= alpha){
          break;
        }
      }
      if(depth === 0){
        return bestMove;
      } else {
        return alpha;
      }
    } else {
      // Minimize
      var min = 100000;
      for (var i = moves.length - 1; i >= 0; i--) {
        move = moves[i];
        newBoard = board.copy();
        this._applyMove(newBoard, move, color);
        score = this.minimax(newBoard, (depth + 1), (color ? 0 : 1), maxDepth, alpha, beta);
  
        if(score < beta){
          beta = score;
        }
        if(beta <= alpha){
          break;
        }
      }
      return beta;
    }
  }
  
  IA.prototype._applyMove = function(board, pos, color) {
    board.flip(x, y);
  }
  IA.prototype.mobility = function(board) {
    var aiMoves = board.getAllMoves(this.color).length;
    var oppMoves = board.getAllMoves(this.color ? 0 : 1).length;
    return Math.ceil((oppMoves + aiMoves) === 0 ? 0 : 100 * ((aiMoves - oppMoves)/(aiMoves + oppMoves)));
  }
  