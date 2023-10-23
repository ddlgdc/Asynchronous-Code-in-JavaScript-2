const apiUrl = 'https://deckofcardsapi.com/api/deck';

async function createNewDeck() {
    try {
        const response = await axios.get(`${apiUrl}/new/shuffle/?deck_count=1`);
        const deckId = response.data.deck_id;
        return deckId;
    } catch (error) {
        console.error('Error creating a new deck:', error);
    }
}

async function drawCard(deckId) {
    try {
        const response = await axios.get(`${apiUrl}/${deckId}/draw/?count=1`);
        const card = response.data.cards[0];
        return card;
    } catch (error) {
        console.error('Error drawing a card:', error);
    }
}

async function displayCardInfo() {
    const deckId = await createNewDeck();

    const drawCardButton = document.getElementById('drawCard');
    const cardDisplay = document.getElementById('cardDisplay');

    drawCardButton.addEventListener('click', async () => {
        while (cardDisplay.firstChild) {
            cardDisplay.removeChild(cardDisplay.firstChild);
        }

        const card = await drawCard(deckId);

        if (card) {
            const cardImage = document.createElement('img');
            cardImage.src = card.image;
            cardDisplay.appendChild(cardImage);

            const cardInfo = `${card.value} of ${card.suit}`;
            const cardText = document.createElement('p');
            cardText.textContent = cardInfo;
            cardDisplay.appendChild(cardText);
        } else {
            drawCardButton.disabled = true;
            drawCardButton.textContent = 'No Cards Remaining';
        }
    });
}

displayCardInfo();
