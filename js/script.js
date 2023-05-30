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

  return { getBoard, boardRender, updateBoard, showOnBoard };
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
