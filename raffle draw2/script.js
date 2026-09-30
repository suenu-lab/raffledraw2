const input = document.getElementById("participantInput");
const addButton = document.getElementById("addButton");
const drawButton = document.getElementById("drawButton");
const resetButton = document.getElementById("resetButton");

const participantList = document.getElementById("participantList");
const participantCount = document.getElementById("participantCount");

const winnerCount = document.getElementById("winnerCount");
const winnerHistory = document.getElementById("winnerHistory");

const winnerBox = document.getElementById("winnerBox");
const winnerText = document.getElementById("winnerText");


let participants = [];

let winners = [];



/* =========================
   ADD PARTICIPANT
========================= */

function addParticipant() {

    const name = input.value.trim();

    if (name === "") {

        alert("Please enter a participant name.");

        return;
    }


    participants.push(name);

    input.value = "";

    displayParticipants();

    input.focus();
}



/* =========================
   DISPLAY PARTICIPANTS
========================= */

function displayParticipants() {

    participantList.innerHTML = "";

    participantCount.textContent = participants.length;


    if (participants.length === 0) {

        participantList.innerHTML = `
            <p class="empty">
                🎉 Everyone has won!
            </p>
        `;

        return;
    }


    participants.forEach((name, index) => {

        const participant = document.createElement("div");

        participant.className = "participant";


        participant.innerHTML = `

            <span class="participant-name">
                🎟️ ${name}
            </span>

            <button
                class="remove"
                onclick="removeParticipant(${index})"
            >
                ×
            </button>

        `;


        participantList.appendChild(participant);

    });

}



/* =========================
   REMOVE PARTICIPANT
========================= */

function removeParticipant(index) {

    participants.splice(index, 1);

    displayParticipants();
}



/* =========================
   DRAW WINNER
========================= */

function drawWinner() {

    if (participants.length === 0) {

        alert(
            "There are no participants left. Add more participants to continue."
        );

        return;
    }


    drawButton.disabled = true;

    winnerBox.classList.remove("winner");

    winnerBox.classList.add("drawing");


    let count = 0;


    const animation = setInterval(() => {

        const randomIndex =
            Math.floor(
                Math.random() * participants.length
            );


        winnerText.textContent =
            "🎲 " + participants[randomIndex];


        count++;


        if (count >= 25) {

            clearInterval(animation);


            /*
             * PICK FINAL WINNER
             */

            const winnerIndex =
                Math.floor(
                    Math.random() * participants.length
                );


            const winner =
                participants[winnerIndex];


            /*
             * SHOW WINNER
             */

            winnerText.textContent =
                "🏆 " + winner + " 🏆";


            winnerBox.classList.remove("drawing");

            winnerBox.classList.add("winner");


            /*
             * ADD TO HISTORY
             */

            winners.push(winner);

            displayWinnerHistory();


            /*
             * REMOVE WINNER FROM PARTICIPANTS
             */

            participants.splice(winnerIndex, 1);

            displayParticipants();


            /*
             * UPDATE WINNER COUNT
             */

            winnerCount.textContent =
                winners.length;


            drawButton.disabled = false;


            /*
             * CHECK IF EVERYONE HAS WON
             */

            if (participants.length === 0) {

                setTimeout(() => {

                    winnerText.textContent =
                        "🎉 EVERYONE WON! 🎉";

                }, 2000);

            }

        }

    }, 100);

}



/* =========================
   WINNER HISTORY
========================= */

function displayWinnerHistory() {

    winnerHistory.innerHTML = "";


    if (winners.length === 0) {

        winnerHistory.innerHTML = `
            <p class="empty">
                No winners yet.
            </p>
        `;

        return;
    }


    /*
     * Show newest winner first
     */

    [...winners]
        .reverse()
        .forEach((winner, reverseIndex) => {


            const actualNumber =
                winners.length - reverseIndex;


            const historyItem =
                document.createElement("div");


            historyItem.className =
                "history-item";


            historyItem.innerHTML = `

                <div class="history-number">
                    ${actualNumber}
                </div>

                <div>

                    <div class="history-name">
                        🏆 ${winner}
                    </div>

                    <div class="history-label">
                        Winner #${actualNumber}
                    </div>

                </div>

            `;


            winnerHistory.appendChild(historyItem);

        });

}



/* =========================
   RESET EVERYTHING
========================= */

function resetDraw() {

    const confirmReset =
        confirm(
            "Are you sure you want to reset all participants and winner history?"
        );


    if (!confirmReset) {

        return;
    }


    participants = [];

    winners = [];


    winnerText.textContent =
        "🎁 READY?";


    winnerBox.classList.remove("winner");

    winnerBox.classList.remove("drawing");


    winnerCount.textContent = "0";


    displayParticipants();

    displayWinnerHistory();

}



/* =========================
   BUTTONS
========================= */

addButton.addEventListener(
    "click",
    addParticipant
);


drawButton.addEventListener(
    "click",
    drawWinner
);


resetButton.addEventListener(
    "click",
    resetDraw
);



/* =========================
   ENTER KEY
========================= */

input.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            addParticipant();

        }

    }
);



/* =========================
   START
========================= */

displayParticipants();

displayWinnerHistory();

winnerCount.textContent = "0";