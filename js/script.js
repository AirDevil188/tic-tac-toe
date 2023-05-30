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

  return { getBoard, boardRender };
})();
