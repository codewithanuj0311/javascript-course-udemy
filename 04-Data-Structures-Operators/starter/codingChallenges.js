/*Coding Challenge #1
We're building a football betting app (soccer for my American friends �)!
Suppose we get data from a web service about a certain game ('game' variable on
next page). In this challenge we're gonna work with that data.
Your tasks:
1. Create one player array for each team (variables 'players1' and
'players2')
2. The first player in any player array is the goalkeeper and the others are field
players. For Bayern Munich (team 1) create one variable ('gk') with the
goalkeeper's name, and one array ('fieldPlayers') with all the remaining 10
field players
3. Create an array 'allPlayers' containing all players of both teams (22
players)
4. During the game, Bayern Munich (team 1) used 3 substitute players. So create a
new array ('players1Final') containing all the original team1 players plus
'Thiago', 'Coutinho' and 'Perisic'
5. Based on the game.odds object, create one variable for each odd (called
'team1', 'draw' and 'team2')
6. Write a function ('printGoals') that receives an arbitrary number of player
names (not an array) and prints each of them to the console, along with the
number of goals that were scored in total (number of player names passed in)
7. The team with the lower odd is more likely to win. Print to the console which
team is more likely to win, without using an if/else statement or the ternary
operator.
Test data for 6.: First, use players 'Davies', 'Muller', 'Lewandowski' and 'Kimmich'.
Then, call the function again with players from game.scored */

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
  [
  'Neuer',
  'Pavard',
  'Martinez',
  'Alaba',
  'Davies',
  'Kimmich',
  'Goretzka',
  'Coman',
  'Muller',
  'Gnarby',
  'Lewandowski',
  ],
  [
  'Burki',
  'Schulz',
  'Hummels',
  'Akanji',
  'Hakimi',
  'Weigl',
  'Witsel',
  'Hazard',
  'Brandt',
  'Sancho',
  'Gotze',
  ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski',
  'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
  team1: 11.33,
  x: 3.25,
  team2: 6.5,
  },
  };

 //1
 let [players1, players2] = game.players;
 console.log(players1, players2);

 //2
 let [gk, ...fieldPlayers] = players1;
 console.log(gk, fieldPlayers);

 //3
 let allPlayers = [...players1, ...players2];
 console.log(allPlayers);

 //4
 let players1Final = [...players1,'Thiago', 'Coutinho', 'Perisic' ];
 console.log(players1Final);

 //5
 let {team1, x:draw, team2} = game.odds;
 console.log(team1, draw, team2);

 //6
 let printGoals = function(...goals) {
  for(let i = 0; i < goals.length; i++) {
      console.log(`${goals[i]}`);
  }
  console.log(`Total goals scored ${goals.length}`);
 }

 printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');

 //7
 team1 < team2 && console.log(`Team 1 is winner`);
 team1 < team2 || console.log(`Team 2 is winner`);

 /*Coding Challenge #2
Let's continue with our football betting app! Keep using the 'game' variable from
before.
Your tasks:
1. Loop over the game.scored array and print each player name to the console,
along with the goal number (Example: "Goal 1: Lewandowski")
2. Use a loop to calculate the average odd and log it to the console (We already
studied how to calculate averages, you can go check if you don't remember)
3. Print the 3 odds to the console, but in a nice formatted way, exactly like this:
Odd of victory Bayern Munich: 1.33
Odd of draw: 3.25
Odd of victory Borrussia Dortmund: 6.5
Get the team names directly from the game object, don't hardcode them
(except for "draw"). Hint: Note how the odds and the game objects have the
same property names �
4. Bonus: Create an object called 'scorers' which contains the names of the
players who scored as properties, and the number of goals as the value. In this
game, it will look like this:
{
Gnarby: 1,
Hummels: 1,
Lewandowski: 2
}
*/

//1
for (let player of game.scored.entries()) {
  console.log(`Goal ${player[0]+1}: ${player[1]}`);

}

//2
let sum = 0;
for (let average of Object.values(game.odds)) {
  sum+=average;
}
console.log(sum/(Object.values(game.odds).length));

//3
for (let [key, value] of Object.entries(game.odds)){
  if(key == "x"){
      console.log(`Odd of draw: ${value}`);
  } else {
      console.log(`Odd of victory ${game[key]}: ${value}`);
  }
}

/*Coding Challenge #3
Let's continue with our football betting app! This time, we have a map called
'gameEvents' (see below) with a log of the events that happened during the
game. The values are the events themselves, and the keys are the minutes in which
each event happened (a football game has 90 minutes plus some extra time).
Your tasks:
1. Create an array 'events' of the different game events that happened (no
duplicates)
2. After the game has finished, is was found that the yellow card from minute 64
was unfair. So remove this event from the game events log.
3. Compute and log the following string to the console: "An event happened, on
average, every 9 minutes" (keep in mind that a game has 90 minutes)
4. Loop over 'gameEvents' and log each element to the console, marking
whether it's in the first half or second half (after 45 min) of the game, like this:
[FIRST HALF] 17: ⚽ GOAL
GOOD LUCK � */
const gameEvents = new Map([
[17, '⚽ GOAL'],
[36, '� Substitution'],
[47, '⚽ GOAL'],
[61, '� Substitution'],
[64, '� Yellow card'],
[69, '� Red card'],
[70, '� Substitution'],
[72, '� Substitution'],
[76, '⚽ GOAL'],
[80, '⚽ GOAL'],
[92, '� Yellow card'],
]); 

//1
let eventsSet = new Set ([...gameEvents.values()])
let events = [...eventsSet];
console.log(events);

//2
gameEvents.delete(64);
console.log(gameEvents);

//3
let totalEvents = gameEvents.size;
averageTime = 90/totalEvents;
console.log(`An event happened, on
average, every ${averageTime} minutes`);

//4
for (let [key, value] of gameEvents) {
  if ( key <= 45){
      console.log(`[first half] ${key}: ${value}`);
  } else {
      console.log(`[second half] ${key}: ${value}`);
  }
}


/*Coding Challenge #4
Write a program that receives a list of variable names written in underscore_case
and convert them to camelCase.
The input will come from a textarea inserted into the DOM (see code below to
insert the elements), and conversion will happen when the button is pressed.
Test data (pasted to textarea, including spaces):
underscore_case
first_name
Some_Variable
calculate_AGE
delayed_departure
Should produce this output (5 separate console.log outputs):
underscoreCase ✅
firstName ✅✅
someVariable ✅✅✅
calculateAge ✅✅✅✅
delayedDeparture ✅✅✅✅✅
*/

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function(){
let textareaContent = document.querySelector('textarea').value;
let arrayText = textareaContent.split('\n');
for(let [i, item] of arrayText.entries()){
  let [first, second] = item.toLowerCase().trim().split('_');
  let output = `${first}${second.replace(second[0], second[0].toUpperCase())}`
  console.log(`${output.padEnd(20)}${'✅'.repeat(i+1)}`);
}

})


//*Coding challenge-5

const flights =
"_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

//   console.log(flights.replaceAll(':', 'h').split('+'));
let fligthArr = flights.replaceAll(':', 'h').split('+');

for (let item of fligthArr){
  let [type, from, d1, to, d2, time] = item.replace(';', ' from ').replace(';', ' to ').replace('_', '').replace(';', ' ').split(' ');
  let output = `${type.startsWith('Delayed') ? '✅' : ""} ${type.replace('_', ' ')} ${from} ${d1.slice(0,3).toUpperCase()} ${to} ${d2.slice(0,3).toUpperCase()} (${time})`;
  console.log(output.padStart(55, " "));
}



