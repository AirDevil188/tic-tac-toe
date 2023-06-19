/* factory function to create players, and to get active status */
const Player = (name, marker, isActive) => {
  const getName = () => name;
  const getMarker = () => marker;
  return { getName, getMarker, isActive };
};

/* factory gameBoard module */
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  const cell = document.querySelectorAll(".cell");
  const getBoard = () => board;

  /* function to render changes on screen for my board, and to add them to the game board variable */
  const boardRender = () => {
    cell.forEach(function (item, i) {
      item.textContent = `${board[i]}`;
      displayController.displayTextTurn();
    });
  };

  /* function to add markers to the screen on the game board */
  const showOnBoard = () => {
    for (let i = 0; i < cell.length; i++) {
      cell[i].addEventListener("click", function () {
        cell[i].textContent = updateBoard(i, gameController.switchTurn());
        cell[i].classList.add("disabled");
        boardRender();
        gameController.checkGameStatus();
      });
    }
  };

  /* function to reset the game board so that players can play more than one round */
  const resetBoard = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    for (let i = 0; i < cell.length; i++) {
      cell[i].classList.remove("disabled");
      boardRender();
    }
  };

  /* function to update the game board, and to check if the cell is empty */
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

/* displayController module */
const displayController = (() => {
  /* DOM */
  const gameStatusText = document.querySelector(".game-status-text");
  const boardContainer = document.querySelector(".board-container");
  const mainSection = document.querySelector(".game-container");
  const newPlayerInputsContainer = document.querySelector(".player-container");
  const playerScoresHeading = document.querySelector(".player-scores-heading");
  const inputPlayerOneName = document.querySelector("#first-player-name");
  const inputPlayerTwoName = document.querySelector("#second-player-name");
  const submitPlayerButton = document.querySelector(".submit-button");
  const newRoundButton = document.querySelector(".new-round-button");
  const playAgainButton = document.querySelector(".play-again-button");

  /* function to assign names to the players. */
  const createPlayer = () => {
    playerOne = Player(`${inputPlayerOneName.value}`, "X", true);
    playerTwo = Player(`${inputPlayerTwoName.value}`, "O", false);
  };

  /* function that checks if the players have entered their names in the form, and start's the game */
  const checkFormValidation = () => {
    if (inputPlayerOneName.value === "" || inputPlayerTwoName.value === "") {
      alert("Please input Player One and Player two names in order to play the game.");
      return false;
    } else {
      toggleGameBoard();
      createPlayer();
      gameController.updatePlayerScores();
      showPlayerScoresHeading();
      gameBoard.showOnBoard();
      return true;
    }
  };

  /* function that shows heading for the player scores after the submit button was clicked */
  const showPlayerScoresHeading = () => {
    playerScoresHeading.style.display = "block";
  };

  /* function that toggles the game board */
  const toggleGameBoard = () => {
    mainSection.style.display = "flex";
    boardContainer.style.display = "grid";
    newPlayerInputsContainer.style.display = "none";
  };

  /* function that checks if someone one the round */
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

  /* function that checks if the round is tied. */
  const updateTieGame = () => {
    showNewRoundButton();
    return (gameStatusText.textContent = "It's a Tie Game");
  };

  /* function that displays which turn it is. */
  const displayTextTurn = () => {
    if (playerOne.isActive === true) {
      gameStatusText.textContent = `It's ${playerOne.getName()} turn.`;
    } else {
      gameStatusText.textContent = `It's ${playerTwo.getName()} turn.`;
    }
  };

  /* function that shows button for the new round, after the current round. */
  const showNewRoundButton = () => {
    newRoundButton.style.visibility = "visible";
  };

  /* function that hides button for the new round, after the current round. */
  const hideNewRoundButton = () => {
    newRoundButton.style.visibility = "hidden";
  };

  /* function that hides button for the new round and displays button to play the game again. */
  const showPlayAgainButton = () => {
    hideNewRoundButton();
    displayController.playAgainButton.style.display = "block";
  };

  /* event listener for submit button */
  submitPlayerButton.addEventListener("click", () => {
    checkFormValidation();
  });

  /* event listener for new round button */
  newRoundButton.addEventListener("click", () => {
    boardContainer.classList.remove("disabled");
    gameController.resetGame();
    hideNewRoundButton();
  });
  /* event listener for button to play again the game, and also to refresh the page. */
  playAgainButton.addEventListener("click", () => {
    location.reload();
  });

  return { updateScreen, displayTextTurn, updateTieGame, hideNewRoundButton, showPlayAgainButton, playAgainButton };
})();

/* gameController module */
const gameController = (() => {
  let playerOneWinScore = 0;
  let playerTwoWinScore = 0;
  let activeMarker = "";
  let moves = 0;

  /* function for switching turns */
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

  /* function to toggle active Players */
  const toggleActivePlayers = () => {
    playerOne.isActive = !playerOne.isActive;
    playerTwo.isActive = !playerTwo.isActive;
  };

  /* function that resets the game (active marker, active players) that set's player one as active player so that players can play new round */
  const resetGame = () => {
    playerOne.isActive = true;
    playerTwo.isActive = false;
    activeMarker = "";
    gameBoard.resetBoard();
  };

  /* winning combinations for tic tac toe */
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

  /* function that checks if the game board contains winning combination */
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

  /* function that updates player scores on the screen */
  const updatePlayerScores = () => {
    const playerOneScore = document.querySelector(".player-one-score");
    const playerTwoScore = document.querySelector(".player-two-score");

    playerOneScore.textContent = `(X) ${playerOne.getName()}: ${playerOneWinScore}`;
    playerTwoScore.textContent = `(O) ${playerTwo.getName()}: ${playerTwoWinScore}`;
  };

  /* function that checks if the player score is equal to three if it is, then it displays the winner of the game */
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
