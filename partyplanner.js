const baseURL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-fsa-et-web-pt-sf-b";

async function getParties() {
    try {
        const response = await fetch(`${baseURL}/events`);
        const data = await response.json();
        console.log(data);
        if (data.success) {
            return data.data;
        } else {
            console.error('Error fetching parties:', data.error.message);
            return [];
        }
    } catch (error) {
        console.error('Error fetching parties:', error);
        return [];
    }
}

function renderParties(parties) {
    const partyList = document.getElementById('partyList');

    // Clear existing content
    partyList.innerHTML = '';

    // Iterate through parties and append HTML to party list
    parties.forEach(party => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
        <span class="partyName">${party.name}</span>
        <span class="partyDate">${party.date}</span>
        <span class="partyTime">${party.time}</span>
        <span class="partySize">${party.size}</span>
        <button class="deleteButton" data-party-id="${party.id}" onclick="deleteParty(${party.id})">Delete</button>
        `;
        partyList.appendChild(listItem);
    });
}

// Asynchronous function to fetch data and render parties
async function fetchDataAndRender() {
    try {
        const parties = await getParties();
        renderParties(parties);
    } catch (error) {
        console.error('Error fetching or rendering parties:', error);
    }
}

// Call the asynchronous function
fetchDataAndRender();

//POST to events

async function addParty(partyData) {
    try {
        const response = await fetch(`${baseURL}/events`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(partyData),
        });

        const data = await response.json();
        console.log(data);

        if (data.success) {
            // If party addition is successful, refresh the party list
            fetchDataAndRender();
        } else {
            console.error('Error adding party:', data.error.message);
        }
    } catch (error) {
        console.error('Error adding party:', error);
    }
}