const state = {
    score: {
      playerScore: 0,
      computerScore: 0,
      scoreBox: document.getElementById("score_points"),
    },
    cardSprites: {
      avatar: document.getElementById("card-image"),
      name: document.getElementById("card-name"),
      type: document.getElementById("card-type"),
    },
    fieldCards: {
      player: document.getElementById("player-field-card"),
      computer: document.getElementById("computer-field-card"),
    },
  
    playerSides: {
      player1: "player-cards",
      player1BOX: document.querySelector("#player-cards"),
      computer: "computer-cards",
      computerBOX: document.querySelector("#computer-cards"),
    },
  
    actions: {
      button: document.getElementById("next-duel"),
    },
  };
  
  const pathImages = "./src/assets/icons/";
  
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
      id: 1,
      name: "Dark Magician",
      type: "Rock",
      img: `${pathImages}magician.png`,
      winOf: [2],
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
    {

        id: 3,
        name: "Mystical Elf",
        type: "Paper",
        img: `${pathImages}Mystical Elf.png`,
        winOf: [1],
        loseOf: [2],
      },
    {

        id: 4,
        name: "Chica Maga Oscura",
        type: "Rock",
        img: `${pathImages}Chica Maga Oscura.jpg`,
        winOf: [0],
        loseOf: [0],
      },
  ];
  
  async function createCardImage(idCard, fieldSlide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", idCard);
    cardImage.classList.add("card");
  
    if (fieldSlide === state.playerSides.player1) {
      cardImage.addEventListener("mouseover", () => {
        drawSelectCard(idCard);
      });
      cardImage.addEventListener("click", () => {
        setCardsField(cardImage.getAttribute("data-id"));
      });
    }
  
    return cardImage;
  }
  
  async function removeAllCardsImages() {
    let { computerBOX, player1BOX } = state.playerSides;
    let imgElements = computerBOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
  
    imgElements = player1BOX.querySelectorAll("img");
    imgElements.forEach((img) => img.remove());
  }
  
  async function setCardsField(cardId) {
    await removeAllCardsImages();
  
    let computerCardId = await getRandomCardId();
  
    await showHiddenCardFieldsImages(true);
    await hiddenCardDetails();
    await drawCardsInfield(cardId, computerCardId);
  
    let duelResults = await checkDuelResults(cardId, computerCardId);
  
    await updateScore();
    await drawButton(duelResults);
  }
  
  async function drawCardsInfield(cardId, computerCardId) {
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
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
    state.cardSprites.avatar.src = "";
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
  }
  
  async function updateScore() {
    state.score.scoreBox.innerHTML = `Win : ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
  }
  
  async function drawButton(text) {
    state.actions.button.innerText = text.toUpperCase();
    state.actions.button.style.display = "block";
  }
  
  async function checkDuelResults(playerCardId, computerCardId) {
    let duelResults = "Draw";
    let playerCard = cardData[playerCardId];
  
    if (playerCard.winOf.includes(computerCardId)) {
      duelResults = "win";
      await playAudio(duelResults);
      state.score.playerScore++;
    }
  
    if (playerCard.loseOf.includes(computerCardId)) {
      duelResults = "lose";
      await playAudio(duelResults);
      state.score.computerScore++;
    }
  
    return duelResults;
  }
  
  async function drawSelectCard(index) {
    state.cardSprites.avatar.src = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attribute : " + cardData[index].type;
  }
  
  
  
  async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length);
    return cardData[randomIndex].id;
  }
  
  async function drawCards(cardNumbers, fieldSlide) {
    for (let i = 0; i < cardNumbers; i++) {
      const randomIdCard = await getRandomCardId();
      const cardImage = await createCardImage(randomIdCard, fieldSlide);
  
      document.getElementById(fieldSlide).appendChild(cardImage);
    }
  }
  
  const players = {
    player1: "player-cards",
  };
  
  async function resetDuel() {
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";
  
    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";
  
    init();
  }
  
  async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
  
    try {
      audio.play();
    } catch {}
  }
  
  const init = function () {
    showHiddenCardFieldsImages(false);
  
    drawCards(5, state.playerSides.player1);
    drawCards(5, state.playerSides.computer);
  
    const bgm = document.getElementById("bgm");
    bgm.play();
  };
  
  init();