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
  if(num === 1) {
    return [[1]];
  }

  var solution = [];

  //write the recursion function addQueen
  var addQueen = function(board, queenCount, queenPosition){
    //update board by placing queen at queenPosition
    var rowPosition = ((queenPosition - (queenPosition % num)) / num);
    var colPosition = (queenPosition % num);
    board.attributes[rowPosition][colPosition] = 1;
    //check if board is still valid
    if(!(board.hasAnyColConflicts() || board.hasAnyRowConflicts())){
      //if check num and queenCount equal then push to the solution
      if(queenCount === num){
        // return board.attributes;
        solution.push(board.rows());
        // board.attributes[rowPosition][colPosition] = 0;
      //else call for loop and continue recursion;
      }else{
        for (var i = (queenPosition + 1); i < (num*num); i++){
          addQueen(board, (queenCount + 1), i);
        }
      }
    }else{
      board.attributes[rowPosition][colPosition] = 0;
    }
  };

  //loop through first possible queen move
  for (var i = 0; i < (num*num); i++){
    //start the recursion
    var newBoard = new Board({n:num});
    addQueen(newBoard, 1, i);
  }

  return solution[0];
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
