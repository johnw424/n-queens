// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // get row of interest
      var row = this.get(rowIndex);
      // sum through each row since queens = 1
      var result = _.reduce(row, function(item, accumulator) {
        return  item + accumulator;
      });
      if(result > 1) {
        return true;
      }
      // if more than 1 queen, result should be greater than 1
      return false;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // get number of rows
      var numRows = this.rows().length;
      // loop through each row to see if conflict exists
      for (var i = 0; i < numRows; i++){
        if(this.hasRowConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // get number of rows
      var numRows = this.rows().length;
      // store results
      var result = 0;
      // loop through each row at colIndex
      for(var i = 0; i < numRows; i ++){
        // sum up each cell
        result += this.get(i)[colIndex];
        if(result > 1) {
          return true;
        }

      }
      // if more than 1 queen, result should be greater than 1
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var numCols = this.rows().length;
      for(var i = 0; i < numCols; i++){
        if(this.hasColConflictAt(i)){
          return true;
        }
      }
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(rowOrCol, index) {
      var dimension = this.rows().length;
      var result = 0;

      if(rowOrCol === 'row') {
        var rowCounter = 0;
        // ignore corners
        for(var i = index; i < (dimension - 1); i++) {
          if(this.rows()[rowCounter][i]) {
            result++;
          }
          if(result > 1) {
            return true;
          }
          rowCounter++;
        }
      }

      if(rowOrCol === 'col'){
        var colCounter = 0;
        for(var i = index; i < (dimension - 1); i++){
          if(this.rows()[i][colCounter]) {
            result++;
          }
          if(result > 1){
            return true;
          }
          colCounter++;
        }

      }

      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // run hasMajorDiagonalConflictAt for all cells at first row
      // excluding the last cell then all cells in first column
      // excluding the ones in the first and last rows

      //generate the cells we need to call on
      var dimension = this.rows().length;
      //check first row
      for(var i = 0; i < (dimension - 1); i++){
        if(this.hasMajorDiagonalConflictAt('row', i)){
          return true;
        }
      }
      //check first col
      for(var j = 1; j < (dimension - 1); j++){
        if(this.hasMajorDiagonalConflictAt('col', j)){
          return true;
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(rowOrCol, index) {
      var dimension = this.rows().length;
      var result = 0;
      if(rowOrCol === 'row') {
        var rowCounter = dimension - 1;
        // ignore corners
        for(var i = index; i < (dimension - 1); i++) {
          if(this.rows()[rowCounter][i]) {
            result++;
          }
          if(result > 1) {
            return true;
          }
          rowCounter--;
        }
      }

      if(rowOrCol === 'col'){
        var colCounter = 0;
        for(var i = index; i > -1; i--){
          if(this.rows()[i][colCounter]) {
            result++;
          }
          if(result > 1){
            return true;
          }
          colCounter++;
        }

      }

      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var dimension = this.rows().length;
      //check last row
      for(var i = 0; i < (dimension - 1); i++){
        if(this.hasMinorDiagonalConflictAt('row', i)){
          return true;
        }
      }
      //check first col
      for(var j = 1; j < (dimension - 1); j++){
        if(this.hasMinorDiagonalConflictAt('col', j)){
          return true;
        }
      }
      return false;
    },


    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
