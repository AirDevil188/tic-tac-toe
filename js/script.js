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
    boardRender();
  };

  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    for (let i = 0; i < cell.length; i++) {
      cell[i].classList.remove("disabled");
      boardRender();
    }
  };

  const updateBoard = (i, value) => {
    if (board[i] !== "") {
      return false;
    } else {
      board[i] = value;
      return true;
    }
  };

  return { showOnBoard, getBoard, resetBoard };
})();

const displayController = (() => {
  const gameStatusText = document.querySelector(".game-status-text");
  const boardContainer = document.querySelector(".board-container");
  const newPlayerInputsContainer = document.querySelector(".player-container");
  const inputPlayerOneName = document.querySelector("#first-player-name");
  const inputPlayerTwoName = document.querySelector("#second-player-name");
  const submitPlayerButton = document.querySelector(".submit");
  const newRoundButton = document.querySelector(".new-round-button");
  const playAgainButton = document.querySelector(".play-again-button");

  const createPlayer = () => {
    playerOne = Player(`${inputPlayerOneName.value}`, "X", true);
    playerTwo = Player(`${inputPlayerTwoName.value}`, "O", false);

    return playerOne, playerTwo;
  };

  const updateScreen = () => {
    if (playerOne.isActive === true && playerTwo.isActive === false) {
      gameStatusText.textContent = `${playerTwo.getName()} has won the round!`;
      showNewRoundButton();
      boardContainer.classList.add("disabled");
    } else {
      gameStatusText.textContent = `${playerOne.getName()} has won the round!`;
      showNewRoundButton();
      boardContainer.classList.add("disabled");
    }
  };

  const displayTextTurn = () => {
    if (playerOne.isActive === true) {
      gameStatusText.textContent = `It's ${playerOne.getName()} turn.`;
    } else {
      gameStatusText.textContent = `It's ${playerTwo.getName()} turn.`;
    }
  };

  const updateTieGame = () => {
    showNewRoundButton();
    return (gameStatusText.textContent = "It's a Tie Game");
  };

  const showNewRoundButton = () => {
    newRoundButton.style.display = "block";
  };

  const hideNewRoundButton = () => {
    newRoundButton.style.display = "none";
  };

  const showPlayAgainButton = () => {
    displayController.playAgainButton.style.display = "block";
  };

  const toggleGameBoard = () => {
    boardContainer.style.display = "grid";
    newPlayerInputsContainer.style.display = "none";
  };

  submitPlayerButton.addEventListener("click", () => {
    toggleGameBoard();
    createPlayer();
    gameController.updatePlayerScores();
    gameBoard.showOnBoard();
  });

  newRoundButton.addEventListener("click", () => {
    boardContainer.classList.remove("disabled");
    gameController.resetGame();
    hideNewRoundButton();
  });

  playAgainButton.addEventListener("click", () => {
    location.reload();
  });

  return { updateScreen, displayTextTurn, updateTieGame, hideNewRoundButton, showPlayAgainButton, playAgainButton };
})();

const gameController = (() => {
  let playerOneWinScore = 0;
  let playerTwoWinScore = 0;
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

  const resetGame = () => {
    playerOne.isActive = true;
    playerTwo.isActive = false;
    activeMarker = "";
    gameBoard.resetBoard();
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
        moves = 0;
      } else if (winMarkerCombination === "XXX") {
        displayController.updateScreen();
        playerOneWinScore++;
        updatePlayerScores();
        gameOver();
        moves = 0;
        break;
      } else if (winMarkerCombination === "OOO") {
        displayController.updateScreen();
        playerTwoWinScore++;
        updatePlayerScores();
        gameOver();
        moves = 0;
        break;
      }
    }
  };

  const updatePlayerScores = () => {
    const playerOneScore = document.querySelector(".player-one-score");
    const playerTwoScore = document.querySelector(".player-two-score");

    playerOneScore.textContent = `${playerOne.getName()}: ${playerOneWinScore}`;
    playerTwoScore.textContent = `${playerTwo.getName()}: ${playerTwoWinScore}`;
  };

  const gameOver = () => {
    const gameStatusText = document.querySelector(".game-status-text");
    if (playerOneWinScore === 3) {
      gameStatusText.textContent = `${playerOne.getName()} has won the game!`;
      displayController.hideNewRoundButton();
      displayController.showPlayAgainButton();
    } else if (playerTwoWinScore === 3) {
      gameStatusText.textContent = `${playerTwo.getName()} has won the game!`;
      displayController.hideNewRoundButton();
      displayController.showPlayAgainButton();
    }
  };

  return { switchTurn, checkGameStatus, resetGame, updatePlayerScores };
})();
