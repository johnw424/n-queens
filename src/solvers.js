/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(num) {
  var columnConflict = {};
  var board = new Board({n:num});
  var placeRook = function(num, row, columnConflict, board){
    for (var i = 0; i < num; i++){
      if(!columnConflict[i]) {
        board.togglePiece(row, i);
        if(row === num - 1) {
          return board.rows();
        }
        columnConflict[i] = true;
        return placeRook(num, row+1, columnConflict, board);
        // columnConflict[i] = false;
        // board.togglePiece(row, i);
      }
    }
  };
  return placeRook(num, 0, columnConflict, board);
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(num) {
  var solution = 0;
  var columnConflict = {};
  var placeRook = function(num, row, columnConflict){
    for (var i = 0; i < num; i++){
      if(!columnConflict[i]) {
        if(row === num - 1) {
          solution++;
        }
        columnConflict[i] = true;
        placeRook(num, row+1, columnConflict);
        columnConflict[i] = false;
      }
    }
  };
  placeRook(num, 0, columnConflict);
  return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(num) {

  var solution = [];

  //write the recursion function addQueen
  var addQueen = function(board, queenCount, queenPosition){
    //update board by placing queen at queenPosition
    var rowPosition = ((queenPosition - (queenPosition % num)) / num);
    var colPosition = (queenPosition % num);
    board.attributes[rowPosition][colPosition] = 1;
    //check if board is still valid
    if(!(board.hasAnyColConflicts() || board.hasAnyRowConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts())){
      //if check num and queenCount equal then push to the solution
      if(queenCount === num){
        solution.push(board.rows());
        board.attributes[rowPosition][colPosition] = 0;
      //else call for loop and continue recursion;
      }else{
        for (var j = (queenPosition + 1); j < (num*num); j++){
          addQueen(board, (queenCount + 1), j);
        }
      }
    }else{
      board.attributes[rowPosition][colPosition] = 0;
    }
  };

  //loop through first possible queen move
  for (var i = 0; i < num * num; i++){
    //start the recursion
    var newBoard = new Board({n:num});
    addQueen(newBoard, 1, i);
  }

  return solution[0];


//   var solutions = [];
//   var columnConflict = {};
//   var majorConflict = {};
//   var minorConflict = {};
//   var board = new Board({n:num});
//   var placeQueen = function(num, row, columnConflict, majorConflict, minorConflict, board){
//     for (var i = 0; i < num; i++){
//       if(!(columnConflict[i] || majorConflict[(i - row)] || minorConflict[(i + row)])) {
//         board.togglePiece(row, i);
//         if (row === num - 1) {
//           console.log(board);
//           solutions.push(board.rows());
//         }
//         columnConflict[i] = true;
//         majorConflict[(i - row)] = true;
//         minorConflict[(i + row)] = true;
//         placeQueen(num, row+1, columnConflict, majorConflict, minorConflict, board);
//         board.togglePiece(row, i);
//         columnConflict[i] = false;
//         majorConflict[(i - row)] = false;
//         minorConflict[(i + row)] = false;
//       }
//     }
//   };
//   placeQueen(num, 0, columnConflict, majorConflict, minorConflict, board);
//   console.log(solutions[0]);
//   return solutions[0];
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(num) {
  if(num === 0){
    return 1;
  }
  var solution = 0;
  var columnConflict = {};
  var majorConflict = {};
  var minorConflict = {};
  var placeQueen = function(num, row, columnConflict, majorConflict, minorConflict){
    for (var i = 0; i < num; i++){
      if(!(columnConflict[i] || majorConflict[(i - row)] || minorConflict[(i + row)])) {
        if (row === num - 1) {
          solution++;
        }
        columnConflict[i] = true;
        majorConflict[(i - row)] = true;
        minorConflict[(i + row)] = true;
        placeQueen(num, row+1, columnConflict, majorConflict, minorConflict);
        columnConflict[i] = false;
        majorConflict[(i - row)] = false;
        minorConflict[(i + row)] = false;
      }
    }
  };
  placeQueen(num, 0, columnConflict, majorConflict, minorConflict);
  return solution;
};
