"use strict";

const gameEvents = new Map([
[17, '⚽ GOAL'],
[36, '🔁 Substitution'],
[47, '⚽ GOAL'],
[61, '🔁 Substitution'],
[64, '🔶 Yellow card'],
[69, '🔴 Red card'],
[70, '🔁 Substitution'],
[72, '🔁 Substitution'],
[76, '⚽ GOAL'],
[80, '⚽ GOAL'],
[92, '🔶 Yellow card'],
]);

const eventsSet = new Set([...gameEvents.values()]);
const events = [...eventsSet];
console.log(events);

gameEvents.delete(64);
console.log(gameEvents);

console.log(`An event happened, on average, every ${90 / gameEvents.size} minutes`);

for (const [key, value] of gameEvents) {
    console.log(`${key < 45 ? '[FIRST HALF]' : '[SECOND HALF]'} ${key}: ${value}`);
}