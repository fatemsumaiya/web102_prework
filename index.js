/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)


// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
/*
Create a for loop within the addGamesToPage function that loops over each item in the argument games.
You can expect that games will be an array of objects with the same structure as GAMES_JSON.
*/
function addGamesToPage(games) {

    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        console.log(games[i]);
        // create a new div element, which will become the game card
        /*
        Within the loop you created, create a new div element which 
        will become the game card that displays info
        about a game. Add the class game-card to the div's class list.
        */
        //new div element
        const gameCard = document.createElement("div");


        // add the class game-card to the list
        gameCard.classList.add("game-card"); //adds a class to given element newDiv


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")

        gameCard.innerHTML = `
                <div class =  game-img>
                    <img src="${games[i].img}" alt="${games[i].name}"/>
                    </div>
                <h1> Introducing ${games[i].name}</h1>
                <p>description: ${games[i].description}</p>
                <p>pledged: ${games[i].pledged} </p>
                <p>goal: ${games[i].goal}</p>
                    <h1>${i}</h1>
        `;

        // append the game to the games-container
        gamesContainer.appendChild(gameCard);
    }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);


// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((acc, game) => {
    return acc + game.backers;
}, 0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `
    ${totalContributions.toLocaleString()}
`;


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((acc, game) => { //pledges
    return acc + game.pledged;
}, 0);


// set inner HTML using template literal
raisedCard.innerHTML = `
    ${totalRaised.toLocaleString()}
`;

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const numGames = GAMES_JSON.length;

gamesCard.innerHTML = `
    ${numGames.toLocaleString()}
`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const listOfUnfunded = GAMES_JSON.filter ( (games) => {
        return games.pledged < games.goal;
    }

    )

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(listOfUnfunded);
}

//event listener to get the results
const filterButton = document.getElementById("unfunded-btn");
filterButton.addEventListener("click", filterUnfundedOnly);



// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const listOfFunded = GAMES_JSON.filter ( (games) => {
        return games.pledged >= games.goal;
    }

)
    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(listOfFunded);
} 

//event listener to get the results
const filterButton2 = document.getElementById("funded-btn");
filterButton2.addEventListener("click", filterFundedOnly);

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
}

//event listener to get the results
const filterButton4 = document.getElementById("all-btn");
filterButton4.addEventListener("click", showAllGames); 

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numOfUnfunded = GAMES_JSON.reduce((count, game) => {
    return game.pledged < game.goal ? count + 1 : count;
}, 0); 

// create a string that explains the number of unfunded games using the ternary operator
const unfundedMessage = `
There ${numOfUnfunded === 1 ? 'is' : 'are'} currently ${numOfUnfunded} unfunded game${numOfUnfunded !== 1 ? 's' : ''}.
We need your help to fund these incredible projects!
`;

// create a new DOM element containing the template string and append it to the description container
const paragraphElement = document.createElement("p");
paragraphElement.innerHTML = unfundedGamesMessage;
descriptionContainer.appendChild(paragraphElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games

// create a new element to hold the name of the top pledge game, then append it to the correct element

// do the same for the runner up item