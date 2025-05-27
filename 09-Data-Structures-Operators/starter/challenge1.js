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
  printGoals: function (...playerNames) {
    console.log(playerNames);
    // for (let i = 1; i <= playerNames.length(); i++) {
    //     console.log(playerNames[i]);
    // }
    // console.log(playerNames.length());
  },
};

const [players1, players2] = game.players;
console.log(players1);
console.log(players2);

const [gk, ...fieldPlayers] = players1;
console.log(gk);
console.log(fieldPlayers);

const allplayers = [...players1, ...players2];
console.log(allplayers);

const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log(players1Final);

const {team1, x: draw, team2} = game.odds;
console.log(team1, draw, team2);

game.printGoals('Thiago', 'Coutinho', 'Perisic', 'Neuer', 'Pavard');