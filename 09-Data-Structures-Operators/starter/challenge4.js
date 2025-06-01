'use strict';

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  const text = document.querySelector('textarea').value;
  //   console.log(text);

  const lines = text.split('\n');
  console.log(lines);

  const formattedLines = [];
  let lineNumber = 0;

  for (const line of lines) {
    lineNumber += 1;
    const [a, b] = line.trim().split('_');
    formattedLines.push(
      [a.toLowerCase(), b.toLowerCase().replace(b[0], b[0].toUpperCase())]
        .join('')
        .padEnd(20, ' ') + '✅'.repeat(lineNumber)
    );
  }

  console.log(formattedLines.join('\n'));
});

// TEST DATA
/*
underscore_case
 first_name
Some_Variable
  calculate_AGE
delayed_departure
*/
// OUTPUT
/*
underscoreCase ✅
firstName ✅✅
delayedDeparture    ✅✅✅✅✅
*/
