let boxes = document.querySelectorAll(".box");
let newGameButton = document.querySelector("#new-btn");
let resetBtn = document.querySelector("#reset-btn");
let msgcontainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turn0 = true;
let arr = ["apple","banana", "litchi"]
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [2,4,6],
    [3,4,5],
    [1,4,7],
    [6,7,8],
    [2,5,8]
]


boxes.forEach((box) => {
    box.addEventListener("click" , ()=>{
        if(turn0 === true){
            box.innerText = "O";
            turn0 = false;

        }else{
            box.innerText = "X";
            turn0 = true;
 
        }
        box.disabled = true; 


        checkWinner();
    });
});


const disabledBoxes = () => {
    for(let box of boxes){
        box.disabled = true;
    }
}

const showWinner = (winner) => {
    msg.innerText = `Congratulations, ${winner}! Hurra you are the winner of this game!`;
    msgcontainer.classList.remove("hide");

    disabledBoxes();
}

const showTie = () => {
    msg.innerText = `It's a tie! No one wins`;

    msgcontainer.classList.remove("hide");
    boxes.forEach(b => b.disabled = true);
}

const checkWinner = () => {
    for (const pattern of winPatterns){

        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !== "" && pos2Val !== "" && pos3Val !== ""){


            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("Winner found:", pos1Val)
                showWinner(pos1Val);
                return; 
            }
        }
    }

    const allFilled = Array.from(boxes).every(b => b.innerText !== "");
    if (allFilled) {
        showTie();
    }
}

const resetGame = () => {
    boxes.forEach(b => {
        b.innerText = "";
        b.disabled = false;
    });

    if (msgcontainer) msgcontainer.classList.add("hide");
    if (msg) msg.innerText = "Winner";

    turn0 = true;
}

if (resetBtn) resetBtn.addEventListener("click", resetGame);

if (newGameButton) newGameButton.addEventListener("click", resetGame);