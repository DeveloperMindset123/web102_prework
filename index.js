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
//let div = document.createElment('div');
//gamesContainer.appendChild(div);
//div.classList.add('game-card');
//let HTMLtarget = document.getElementsByClassName('game-card')

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
     for (let i = 0; i < games.length; i++) {
        //This is how we write HTML in a js file, using tilda paranthases ` `
        let innerHTMLStuff = `  
        <img class = 'game-img' src = ${games[i].img} alt = "image">
        <h1>${games[i].name}</h1>
        <p>${games[i].description}</p>
        <p>Backers: ${games[i].backers}</p>
        `;
        let div = document.createElement("div");
        div.classList.add("game-card");
        div.innerHTML = innerHTMLStuff;  
        gamesContainer.appendChild(div);
     }  

        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container


// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/
    }
//addGamesToPage(GAMES_JSON);


// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
// use reduce() to count the number of total contributions by summing the backers
//reference link: https://www.javascripttutorial.net/javascript-array-reduce/ (scroll down to "More JavaScript Array reduce() examples")
let totalContribution = GAMES_JSON.reduce(function (previousValue, currentValue){
    return previousValue + currentValue.backers;
},0);
//Change from integer to string
totalContribution = totalContribution.toLocaleString('en-US');
//Displays the Total number of contribution
contributionsCard.innerHTML = `${totalContribution}`;

// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
//reference to the totalContribution code example and how reduce function was used to calculate the sum of all the backers
//total-raised = pledged money
let totalRaised = GAMES_JSON.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue.pledged;
},0);
//change total raised to readable string format
totalRaised = totalRaised.toLocaleString('en-US'); 
//Display the total amount of money raised
raisedCard.innerHTML = `$${totalRaised}`;


// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
//similar to how "Total Raised and Total contribution was implemented"

//Display the total number of games
gamesCard.innerHTML = `11`;

/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/
// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    //let unfundedGamesOnly = GAMES_JSON.filter( game => {return game.pledged < game.goal});
    let unfundedGames = GAMES_JSON.filter( (unfunded) => {return unfunded.pledged < unfunded.goal});
    
    // use the function we previously created to add the unfunded games to the DOM
    return addGamesToPage(unfundedGames);
}
/*NOTE TO SELF: when calling the functions directly, the games being shown, the list will change. */
//filterUnfundedOnly();

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    let fundedGamesOnly = GAMES_JSON.filter( game => {return game.pledged >= game.goal});
    // use the function we previously created to add unfunded games to the DOM
    return addGamesToPage(fundedGamesOnly);
}
//filterFundedOnly();


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);  //if this function is deleted, it will cause a growing list of duplicate games
    // add all games from the JSON data to the DOM
    return addGamesToPage(GAMES_JSON);
}
//showAllGames();

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const numberOfUnfundedGames = GAMES_JSON.filter(game => game.pledged < game.goal);
const numberOfFundedGames = GAMES_JSON.filter(game => game.pledged > game.goal); 

// create a string that explains the number of unfunded games using the ternary operator
const unfundedTotal = `${numberOfUnfundedGames.length > 0 ? numberOfUnfundedGames.length : 0}`;

const displayStr = `A total of $${totalRaised} has been raised for 11 games. Currently, ${unfundedTotal} games remains unfunded. We need your help to fund these amazing games!`
// create a new DOM element containing the template string and append it to the description container
const p = document.createElement('p');
descriptionContainer.appendChild(p);
p.innerHTML = displayStr;

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
//for the first game
let [firstGameName, secondGameName, ...otherGames] = sortedGames;
const {name: topGameName} = firstGameName;
const {name: runnerUpName} = secondGameName;


// create a new element to hold the name of the top pledge game, then append it to the correct element
const p1 = document.createElement('p');
p1.innerHTML = `${topGameName}`;
firstGameContainer.appendChild(p1);
console.log(topGameName);

// do the same for the runner up item
//for the second game
const p2 = document.createElement('p');
p2.innerHTML = `${runnerUpName}`;
secondGameContainer.appendChild(p2);
console.log(runnerUpName);
