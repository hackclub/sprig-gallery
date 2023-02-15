/*
@title: rainbow-maker :D
@author: neeysa

Instructions:

Welcome to Sprig!!!

Hit "run" to execute the code and
start the game (you can also press shift+enter).

To beat each level you'll have to edit the code.

The code for this game starts below this comment.

The objective is to push the purple boxes onto the green goals.
Press j to reset the current level.

Click the "open help" to discover your toolkit.

--------
Level 1
--------

Make the purple block pushable. 

--------
Level 2
--------

Add controls to move up and left, use "w" and "a" as inputs

Tip: 
Do you find it annoying restarting at level 0?
Try adjusting the starting level.

--------
Level 3
--------

Edit the map.

--------
Level 4
--------

Make boxes push boxes.

--------
Level 5
--------

Add sound effects when you move.

--------
Level 6
--------

Solve the puzzle!

--------
END
--------

Make your own game! Try
 - adding two players
 - leaving a trail as you move
 - having different blocks and goal types
 - come up with your own mechanic!

*/


const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap`
..0.........0...
.0D0.......040..
07D70.000.07470.
07D770666077470.
07D706666607470.
.0D06666666040..
..06666666660...
..00000000000...
...07CCCCC70....
..07CC0C0CC70...
..07C3CCC3C70.0.
..07000000070040
..07088888070740
..00088H88000740
...088888880D70.
...088858880D0..`],
  [ box, bitmap`
................
...000000000....
..03333333330...
..039999999930..
..0396666666930.
..0396DDDDDD6930
..0396D77777D693
..0396D7HHHH7D69
..0396D7H000H7D6
..0396D7H0..0000
..0396D7H0......
..0396D7H0......
..0396D7H0......
..0396D7H0......
..0396D7H0......
..0396D7H0......`],
  [ goal, bitmap`
................
................
......0000......
.....011110.....
....011L1110....
..001111L11100..
.0111LL11L11110.
.0111LL1L111110.
..001111111100..
....00000000....
................
................
................
................
................
................`],
  [ wall, bitmap`
396D7H396D7H396D
396D7H396D7H396D
396D7H396D7H396D
396D7H396D7H396D
396D7H396D7H396D
396D7H396D7H396D
396D7H396D7H396D
396D7H396D7H396D
396D7H396D7H396D
396D7H396D7H396D
396D7H396D7H396D
396D7H396D7H396D
396D7H396D7H396D
396D7H396D7H396D
396D7H396D7H396D
396D7H396D7H396D`]
);

let level = 0;
const levels = [
  map`
w....w
.p..bg
w....w`,
  map`
p..
.b.
..g`,
  map`
p.wg
.bw.
..w.
..w.`,
  map`
p...
...b
...b
.bbg`,
  map`
...
.p.
...`,
  map`
p.w.
.bwg
....
..bg`
];

const currentLevel = levels[level];
setMap(currentLevel);

setSolids([ player, box, wall ]);

setPushables({
  [player]: []
});

// START - PLAYER MOVEMENT CONTROLS

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

// END - PLAYER MOVEMENT CONTROLS

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) {
    clearText("");
    setMap(currentLevel);
  }
});

afterInput(() => {
  // count the number of tiles with goals
  const targetNumber = tilesWith(goal).length;
  
  // count the number of tiles with goals and boxes
  const numberCovered = tilesWith(goal, box).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      addText("you win!", { y: 4, color: color`3` });
    }
  }
});
