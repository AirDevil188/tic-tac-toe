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
    cell.forEach(function (item, index) {
      item.addEventListener("click", function () {});
      item.textContent = `${board[index]}`;
    });
  };

  const showOnBoard = () => {
    for (let i = 0; i < cell.length; i++) {
      cell[i].addEventListener("click", function () {
        cell[i].textContent = updateBoard(i, displayController.switchTurn());
        gameBoard.boardRender();
      });
    }
    return boardRender();
  };

  const updateBoard = (i, value) => {
    if (board[i] !== "") {
      return false;
    } else {
      board[i] = value;
      console.log(board[i]);
      return true;
    }
  };

  const winningCombination = (playerMoves) => [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 4, 6],
    [2, 5, 8],
    [3, 4, 5],
    [6, 7, 8],
  ];

  return { updateBoard, winningCombination, getBoard, boardRender, showOnBoard, board };
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
