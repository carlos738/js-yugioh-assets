const state = {
    score:{
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprities:{
        avatar: document.getElementById("card-image"),
        nome: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },
    fieldCards:{
        player: document.getElementById("player-field-card"),
        comouter: document.getElementById("computer-field-card"),
    },
    playerSides:{
        player1: "player-cards",
        player1BOX: document.querySelector("#player-cards"),
        computer: "computer-cards",
        computerBox: document.querySelector("computer-cards"),
    },
    actions:{
        button: document.getElementById("next-duel"),
    },
};

const pathImages = "./src/assets/icons";

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        winOf: [1],
        loseOf: [2],

    },
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: `${pathImages}dragon.png`,
        winOf: [1],
        loseOf:[2],
    },
    {
        id: 0,
        name: "Dark Magician",
        type: "Rock",
        img: `${pathImages}magician.png`,
        winOf:[2],
        loseOf: [0],
    },
    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: `${pathImages}exodia.png`,
        winOf: [0],
        loseOf: [1],
    },
];  
async function createCardImage(idCard, fieldSlide){
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height","100px");
    cardImage.setAttribute("src","./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", idCard);
    cardImage.classList.add("card");

    if (fieldSlide === state.playerSides.player1) {
        cardImage.addEventListener("mouseover",()=>{
            drawSelectCard(idCard);
        });
        cardImage.addEventListener("click",()=>{
            setCardsField(cardImage.getAttribute("data-id"));
        });
     
    }
    return cardImage;

}
async function removeAllCardsImages(){
    let{computerBox, player1BOX} = state.playerSides;
    let imgElements = computerBox.querySelectorAll("img");
    imgElements.forEach((img)=>img.remove());

    imgElements = player1BOX.querySelectorAll("img");
    imgElements.forEach((img)=>img.remove());
}
async function setCardsField(cardId){
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();

    await showHiddenCardFieldsImages(true);
    await hiddenCardDetails();
    await drawCardsInfield(cardId, computerCardId);

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);
}

async function drawCardsInfield(cardId, computerCardId){
state.fieldCards.player.src = cardData[cardId].img;
state.fieldCards.comouter.src = cardData[computerCardId].img;
}

async function showHiddenCardFieldsImages(value) {
    if (value === true) {
        state.fieldCards.player.style.display = "block";
    state.fieldCards.computer.style.display = "block";
    }
    if (value === false) {
        state.fieldCards.player.style.display = "none";
        state.fieldCards.computer.style.display = "none";
    }
}

async function hiddenCardDetails() {
    state.cardSprities.avatar.src ="";
    state.cardSprities.nome.innerText ="";
    state.cardSprities.type.innerText ="";
}

async function updateScore(){
    state.score.scoreBox.innerHTML = `YOU WIN : ${state.score.playerScore} ! YOU LOSE : 
    ${state.score.computerScore}`; 
}

async function drawButton(text) {
    state.actions.button.innerText = text.toUpperCase();
    state.actions.button.style.display = "block";
}

async function checkDuelResults(playerCardId, computerCardId) {
    let duelResults = "DRAW";
    let playerCard = cardData[playerCardId];

    if (playerCard.winOf.includes(computerCardId)) {
        duelResults = "YOU WIN";
        await playAudio(duelResults);
        state.score.playerScore++;
    }

    if (playerCard.loseOf.includes(computerCardId)) {
        duelResults = "you lose";
        await playAudio(duelResults);
        state.score.computerScore++;
    }
}

