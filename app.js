let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let msg = document.querySelector("#msg");
let newgamebtn = document.querySelector("#new-btn");
let msgCtr = document.querySelector(".msg-Container.hide");

let turnX = true;

const winningPatrn = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const resetGame = () => {
  turnX = true;
  enableBoxes();
  msgCtr.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnX) {
      box.textContent = "X";
      box.style.color = "#FF6347";
      turnX = false;
    } else {
      box.textContent = "O";
      box.style.color = "#6495ED";
      turnX = true;
    }
    box.disabled = true;
    checkwinr();
    count(); // Check for draw after each move
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.textContent = "";
  }
};

const showwinr = (winner) => {
  msg.textContent = `Congratulation! Winner is ${winner}`;
  msgCtr.classList.remove("hide");
  disableBoxes();
};

const checkwinr = () => {
  for (let pattern of winningPatrn) {
    let pos1Val = boxes[pattern[0]].textContent;
    let pos2Val = boxes[pattern[1]].textContent;
    let pos3Val = boxes[pattern[2]].textContent;

    if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showwinr(pos1Val);
      }
    }
  }
};

const count = () => {
  let allFilled = true;
  for (let box of boxes) {
    if (box.textContent === "") {
      allFilled = false;
      break;
    }
  }

  if (allFilled) {
    gamedraw();
  }
};

const gamedraw = () => {
  msg.textContent = "GAME OVER";
  msgCtr.classList.remove("hide");
  disableBoxes();
};

newgamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);