document.addEventListener("DOMContentLoaded", () => {
    const partyForm = document.getElementById("party-form");
    const partyList = document.getElementById("party-list");

    // Function to add party to the list
    function addPartyToList(party) {
        const partyItem = document.createElement("li");
        partyItem.innerHTML = `
            <strong>${party.name}</strong>
            <br>Date: ${party.date}, Time: ${party.time}
            <br>Location: ${party.location}
            <br>Description: ${party.description}
            <button class="delete-button" data-id="${party.id}">Delete</button>
        `;

        partyList.appendChild(partyItem);

        const deleteButton = partyItem.querySelector(".delete-button");
        deleteButton.addEventListener("click", () => {
            const partyId = deleteButton.getAttribute('data-id');
            fetch(`https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF-B-elvis/events/${partyId}`, {
                method: "DELETE"
            })
                .then(response => {
                    console.log(data);
                    if (response.ok) {
                        partyList.removeChild(partyItem);
                    }
                });
        });
    }
//Fetch and render existing parties from API

    function fetchParties() {
        fetch(`${baseURL}/events`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success && Array.isArray(data.data)) {
                    data.data.forEach(party => {
                        addPartyToList(party);
                    });
                } else {
                    console.error('API does not contain an array of parties', data);
                }
            })
            .catch(error => {
                console.error("Error fetching parties from server", error);
            });
    }

    fetch(`${baseURL}/events`)
    .then(response => {
        console.log('Response:', response);
        return response.json();
    })
    .then(data => {
        console.log('API Data:', data);
        // Further processing...
    })
    .catch(error => {
        console.error('Error:', error);
    });
