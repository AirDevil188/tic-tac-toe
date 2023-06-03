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
      displayController.displayTextTurn();
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
      if (winMarkerCombination === "XXX") {
        alert(`${playerOne.getName()} has won!`);
      } else if (winMarkerCombination === "OOO") {
        alert(`${playerTwo.getName()} has won!`);
      }
    }
  };

  return { getBoard, boardRender, updateBoard, showOnBoard };
})();

const displayController = (() => {
  let activeMarker = "";
  const switchTurn = () => {
    switch (activeMarker) {
      case "":
        activeMarker = "X";
        toggleActivePlayers();
        break;
      case "X":
        activeMarker = "O";
        toggleActivePlayers();
        break;
      case "O":
        activeMarker = "X";
        toggleActivePlayers();
        break;
    }
    return activeMarker;
  };

  const toggleActivePlayers = () => {
    playerOne.isActive = !playerOne.isActive;
    playerTwo.isActive = !playerTwo.isActive;
  };

  const createPlayer = () => {};

  const displayTextTurn = () => {
    const playerTurnPara = document.querySelector(".para-text-turn");
    if (playerOne.isActive === true) {
      playerTurnPara.textContent = `It's ${playerOne.getName()} turn.`;
    } else {
      playerTurnPara.textContent = `It's ${playerTwo.getName()} turn.`;
    }
  };
  return { switchTurn, displayTextTurn };
})();

const playerOne = Player("Jack", "X", true);
const playerTwo = Player("Mark", "O", false);

gameBoard.showOnBoard();
