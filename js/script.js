const Player = (name, marker, isActive) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker, isActive };
};

const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const cell = document.querySelectorAll(".cell");
  const getBoard = () => board;

  const boardRender = () => {
    cell.forEach(function (item, i) {
      item.textContent = `${board[i]}`;
      displayController.displayTextTurn();
    });
  };

  const showOnBoard = () => {
    for (let i = 0; i < cell.length; i++) {
      cell[i].addEventListener("click", function () {
        cell[i].textContent = updateBoard(i, gameController.switchTurn());
        cell[i].classList.add("disabled");
        boardRender();
        gameController.checkGameStatus();
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

  return { showOnBoard, getBoard };
})();

const displayController = () => {
  const gameStatusText = document.querySelector(".game-status-text");
  const boardContainer = document.querySelector(".board-container");

  const updateScreen = () => {
    if (playerOne.isActive === true && playerTwo.isActive === false) {
      gameStatusText.textContent = `${playerTwo.getName()} has won!`;
      boardContainer.classList.add("disabled");
    } else {
      gameStatusText.textContent = `${playerOne.getName()} has won!`;
      boardContainer.classList.add("disabled");
    }
  };

  const updateTieGame = () => {
    return (gameStatusText.textContent = "It's a Tie Game");
  };

  const displayTextTurn = () => {
    if (playerOne.isActive === true) {
      gameStatusText.textContent = `It's ${playerOne.getName()} turn.`;
    } else {
      gameStatusText.textContent = `It's ${playerTwo.getName()} turn.`;
    }
  };
  return { updateScreen, displayTextTurn, updateTieGame };
};

const gameController = (() => {
  let activeMarker = "";
  let moves = 0;
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

  const checkGameStatus = () => {
    moves++;
    for (let i = 0; i < winningCombinations.length; i++) {
      let winMarkerCombination = gameBoard.getBoard()[winningCombinations[i][0]] + gameBoard.getBoard()[winningCombinations[i][1]] + gameBoard.getBoard()[winningCombinations[i][2]];
      if (winMarkerCombination !== "XXX" && winMarkerCombination !== "OOO" && moves === 9) {
        displayController.updateTieGame();
      } else if (winMarkerCombination === "XXX") {
        displayController.updateScreen();
        break;
      } else if (winMarkerCombination === "OOO") {
        displayController.updateScreen();
        break;
      }
    }
  };

  return { switchTurn, checkGameStatus };
})();

const playerOne = Player("Jack", "X", true);
const playerTwo = Player("Mark", "O", false);

gameBoard.showOnBoard();
