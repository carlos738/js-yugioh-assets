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
        return cardImage;
    }

}