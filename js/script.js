const Player = (name, marker, isActive) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker, isActive };
};

const gameBoard = (() => {
  const board = ["", "", "", "", "", "", "", "", ""];
  const cell = document.querySelectorAll(".cell");
  const getBoard = () => {
    return board;
  };

  const boardRender = () => {
    cell.forEach(function (item, i) {
      item.textContent = `${board[i]}`;
    });
  };

  const showOnBoard = () => {
    for (let i = 0; i < cell.length; i++) {
      cell[i].addEventListener("click", function () {
        cell[i].textContent = updateBoard(i, displayController.switchTurn());
        boardRender();
        checkWinner();
      });
    }
    return boardRender();
  };

  const updateBoard = (i, value) => {
    if (board[i] !== "") {
      return false;
    } else {
      board[i] = value;
      return true;
    }
  };

  let winningCombinations = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
    [2, 5, 8],
    [1, 4, 7],
  ];

  const checkWinner = () => {
    for (let i = 0; i < winningCombinations.length; i++) {
      let winMarkerCombination = board[winningCombinations[i][0]] + board[winningCombinations[i][1]] + board[winningCombinations[i][2]];
      console.log("win marker combination");
      console.log(winMarkerCombination);
      if (winMarkerCombination === "XXX") {
        alert(`${playerOne.getName()} has won!`);
      } else if (winMarkerCombination === "OOO") {
        alert(`${playerTwo.getName()} has won!`);
      }
    }
  };

  return { getBoard, boardRender, updateBoard, showOnBoard, checkWinner };
})();

const displayController = (() => {
  let activeMarker = "";
  const switchTurn = () => {
    if (playerOne.isActive === true) {
      activeMarker = playerOne.getMarker();
      playerOne.isActive = false;
      playerTwo.isActive = true;
    } else {
      playerTwo.isActive = true;
      activeMarker = playerTwo.getMarker();
      playerTwo.isActive = false;
      playerOne.isActive = true;
    }
    return activeMarker;
  };
  return { switchTurn };
})();

const playerOne = Player("Player 1", "X", true);
const playerTwo = Player("Player 2", "O", false);

gameBoard.showOnBoard();
