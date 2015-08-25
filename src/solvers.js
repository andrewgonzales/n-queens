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

window.findNRooksSolution = function(n) {
  var solution = []; //array of arrays
  var board = new Board({n: n});
  var rows = board.rows();
  //optionsAvailable (!hasconflicts)  array of positions(row, col)
  var optionsMatrix = [];
  for(var row = 0; row < rows.length; row++){//array of position arrays
    for(var col = 0; col<rows.length; col++){
      var position =[row, col];
      optionsMatrix.push(position);
      // debugger;
    }
  }
  var magicFunction = function(array){
    if (array.length === 0) {
      return;
    }
    // var row = array[1][0];
    // var col = array[1][1];
    var randIndex = Math.floor(Math.random()*array.length);
    var row = array[randIndex][0];
    var col = array[randIndex][1];
    if (board.hasRowConflictAt(row) || board.hasColConflictAt(col)) {
        array.splice(0, 1);
        var newArray = array.slice();
        magicFunction(newArray);
    }else {
      board.togglePiece(row, col);
      var toBeSpliced = [];
      for (var n = 0, len = array.length; n < len; n++) {
        if (array[n][0] === row || array[n][1] === col) {
          toBeSpliced.push(n);
        }
      }
      var newArray = [];
      for(var i = 0; i<array.length; i++){
        if(!_.contains(toBeSpliced, i)){
          newArray.push(array[i]);
        }
      }
      magicFunction(newArray);
    }
  };
  magicFunction(optionsMatrix);
  
  solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  // var solution = undefined; //fixme
  if (n === 1) {
    return 1;
  } 
  else {
    return n * this.countNRooksSolutions(n-1);
  }


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  do {
    var solution = []; //array of arrays
    var board = new Board({n: n});
    var rows = board.rows();
    if (n === 2 || n === 3) {
      return rows;
    }
    else {
      var goalNumPieces = n;
    }  
      
    //optionsAvailable (!hasconflicts)  array of positions(row, col)
    var optionsMatrix = [];
    for(var row = 0; row < rows.length; row++){//array of position arrays
      for(var col = 0; col<rows.length; col++){
        var position =[row, col];
        optionsMatrix.push(position);
      }
    }

    var pieces = 0;
    var magicFunction = function(array){
      if (array.length === 0) {
        return;
      } 
      var randIndex = Math.floor(Math.random()*array.length);
      var row = array[randIndex][0];
      var col = array[randIndex][1];
      board.togglePiece(row, col);
      // debugger;
      if (board.hasAnyQueenConflictsOn(row,col)) {
          board.togglePiece(row, col);
          array.splice(randIndex, 1);
          var newArray = array.slice();
          magicFunction(newArray);
      }else {
        pieces++;
        var toBeSpliced = [];
        for (var n = 0, len = array.length; n < len; n++) {
          if (array[n][0] === row || array[n][1] === col) {
            toBeSpliced.push(n);
          }
        }
        var newArray = [];
        for(var i = 0; i<array.length; i++){
          if(!_.contains(toBeSpliced, i)){
            newArray.push(array[i]);
          }
        }
        magicFunction(newArray);
      }
    };
    magicFunction(optionsMatrix);

    var solutionFound = (pieces === n);

  } while (!solutionFound);
  solution = board.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
