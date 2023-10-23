async function getNumberFact(number){
    const timeStamp = Date.now();

    const apiUrl = `http://numbersapi.com/${number}?json&unique=${timeStamp}`;

    try {
        const response = await axios.get(apiUrl);
        return response.data.text;
    }
    catch (error) {
        console.error(error);
    }
}

async function displayFacts() {
    const favoriteNumbers = [5, 1, 10, 7];
    const factsList = document.getElementById('facts-list');

    try {
        const requests = favoriteNumbers.map(number => getNumberFact(number));

        const facts = await Promise.all(requests);

        facts.forEach(fact => {
            const li = document.createElement('li');
            li.textContent = fact;
            factsList.appendChild(li);
        });
    } catch (error) {
        console.error(error);
    }
}

displayFacts();