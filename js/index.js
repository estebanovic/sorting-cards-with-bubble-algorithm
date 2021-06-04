
let drawButton = document.getElementById("draw");
let sortButton = document.getElementById("sort");
let container = document.getElementById("container");
let cards = [];

function randomNumber() {
    let num = Math.floor(Math.random() * 13) + 1;
    return num;
}

function cardValue(num) {
    if (num > 1 && num < 11) {
        return num.toString();
    } else {
        switch (num) {
            case 1:
                return "A";
            case 11:
                return "J";
            case 12:
                return "Q";
            case 13:
                return "K";
        }
    }
}

function randomSuit() {
    let suit = Math.floor(Math.random() * 4) + 1;
    switch (suit) {
        case 1:
            return "♦";
        case 2:
            return "♥";
        case 3:
            return "♠";
        case 4:
            return "♣";
    }
}

function printCards(num, suit, obj) {

    num = cardValue(num);

    let col = document.createElement('div');
    col.className = 'col-2  col-lg-1';

    let card = document.createElement('div');
    card.className = 'card';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body p-2';

    let suitTop = document.createElement('h5');
    suitTop.className = 'card-title text-start';
    suitTop.innerHTML = suit;

    let numDiv = document.createElement('h5');
    numDiv.className = 'card-title  text-center';
    numDiv.innerHTML = num;

    let suitBottom = document.createElement('h5');
    suitBottom.className = 'card-title  text-end upsidedown';
    suitBottom.innerHTML = suit;

    if (suit === "♥" || suit === "♦") {
        suitTop.style["color"] = "red";
        suitBottom.style["color"] = "red";
    }

    cardBody.appendChild(suitTop);
    cardBody.appendChild(numDiv);
    cardBody.appendChild(suitBottom);
    card.appendChild(cardBody);
    col.appendChild(card);

    obj.appendChild(col);
}

function removeOldSorts(){
    if (document.getElementsByClassName("newRow").length != 0) {
        var newRows = document.getElementsByClassName("newRow");
        for(let i = document.getElementsByClassName("newRow").length-1; i >= 0; i--){
            container.removeChild(newRows[i])
        }
    }

}

drawButton.onclick = function draw() {

    firstRow = document.getElementById("first-row");
    firstRow.innerHTML = "";
    cards = [];
    
    removeOldSorts();

    for (let i = 0; i < document.getElementById("amount").value; i++) {
        let cardObj = { value: randomNumber(), suit: randomSuit() }
        cards.push(cardObj);
    }
    cards.forEach(element => {
        printCards(element.value, element.suit, firstRow);
    });
}

sortButton.onclick = function sort() {

    removeOldSorts();

    for (let wall = cards.length - 1; wall >= 0; wall--) {
        for (let index = 0; index < wall; index++) {
            console.log(cards[index].value);
            if (parseInt(cards[index].value) > parseInt(cards[index + 1].value)) {
                console.log(cards[index].value + " " + cards[index + 1].value);
                let aux = cards[index].value;
                cards[index].value = cards[index + 1].value;
                cards[index + 1].value = aux;
            }
        }
        let newRow = document.createElement('div');
        newRow.className = 'row m-2 newRow';
        container.appendChild(newRow);
        for (let i = 0; i < cards.length; i++) {
            printCards(cards[i].value, cards[i].suit, newRow);
        }
    }


}

