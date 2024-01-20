document.addEventListener("DOMContentLoaded", () => {
    const partyForm = document.getElementById("party-form");
    const partyList = document.getElementById("party-list");

    const baseURL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2310-FSA-ET-WEB-PT-SF-B-elvis';

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
            fetch(`${baseURL}/events/${partyId}`, {
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

//calling to render parties
    fetchParties();

    // Handle form submission
    partyForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById("party-name").value;
        const date = document.getElementById("party-date").value;
        const time = document.getElementById("party-time").value;
        const location = document.getElementById("party-location").value;
        const description = document.getElementById("party-description").value;

        // Create party data object
        const partyData = {
            name: name,
            date: date,
            time: time,
            location: location,
            description: description
        };

        // Send the party details to the server using fetch
        fetch('${baseURL}/events', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(partyData)
        })
            .then(response => response.json())
            .then(party => {
                addPartyToList(party);
                partyForm.reset();
            })
            .catch(error => {
                console.error("Error sending party details to server:", error);
            });
    });
});

   