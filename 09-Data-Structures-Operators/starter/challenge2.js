'use strict';

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
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};


// const entries = game.scored;
// console.log(entries);

for (const [i, name] of game.scored.entries()) {
    console.log(`Goal ${i + 1}: ${name}`);
}

// const values = Object.values(game.odds);
// console.log(values);

let sum = 0;
for (const x of Object.values(game.odds)) {
    sum += x;
}
let avg = sum/Object.values(game.odds).length;
console.log(avg)

for (const [key, value] of Object.entries(game.odds)) {
    (key != 'x') ? console.log(`Odd of victory ${game[key]}: ${value}`) : console.log(`Odd of draw: ${game.odds.x}`);
}
