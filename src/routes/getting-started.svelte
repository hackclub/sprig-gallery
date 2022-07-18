<script>

import { marked } from "marked";

const content = `
# Let's make our first game in Sprig!

All Sprig games take place on a grid of tiles.
Sprig uses sprites in these tiles to represent everything in games. 

Let's learn how to use Sprig by making a simple game.

### Creating a Player

To start let's assign a single character to a variable which we can use in our sprite legend.

\`\`\`js
const player = "p";
\`\`\`

We can then set the image we want to use for our player like so.

\`\`\`js
const player = "p";

setLegend(
  [ player, bitmap\`...\`]
);
\`\`\`

Click on bitmap to open up the pixel editor and draw an image for our sprite.

![GIF of opening bitmap editor.]()

The bitmap is stored as a string. To take a look at it click on the little arrow next to the line number. You can minimize it by clicking the area again.

Let's also add some obstacles, boxes, and objectives into our game.

\`\`\`js
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap\`
................
................
................
.......0........
.....00.000.....
....0.....00....
....0.0.0..0....
....0......0....
....0......0....
....00....0.....
......00000.....
......0...0.....
....000...000...
................
................
................\`],
  [ box, bitmap\`
................
................
................
...888888888....
...8...8...8....
...8...8...8....
...8...8...8....
...8...8...8....
...888888888....
...8...8...8....
...8...8...8....
...888888888....
................
................
................
................\`],
  [ goal, bitmap\`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
................
................
................\`],
  [ wall, bitmap\`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000\`]
);
\`\`\`

### Creating a Level

Let's now create the first level. Ultimately we'll want multiple levels so let's store our current level in a variable and keep all our levels in a list.

\`\`\`js
let level = 0;

const levels = [
  map\`.\`
];
\`\`\`

Right now we only have one level. 
Click on \`map\` to open up the map editor. 
__Make sure you hit run__ to load the legend before editting the map.

![GIF of opening bitmap editor.]()

To set the map use \`setMap\`.

\`\`\`js
let level = 0;

const levels = [
    map\`
      p.w.
      .bwg
      ....
      ....
    \`
];

const currentLevel = levels[level];
setMap(currentLevel);
\`\`\`

### Adding Controls

Let's add some controls to our player.
Sprig has 8 inputs \`up\`, \`left\`, \`down\`, \`right\` which are w, a, s, d on the keyboard respectively and \`i\`, \`j\`, \`k\`, \`l\`.

You can do something on a button press like so:

\`\`\`js
onInput("up", () => {
  getFirst(player).y -= 1;
});
\`\`\`

We're using \`getFirst\` to retrieve our player sprite.

Repeating that pattern we can add up/down/left/right movement to our player.

\`\`\`js
onInput("up", () => {
  getFirst(player).y -= 1;
});

onInput("down", () => {
  getFirst(player).y += 1;
});

onInput("left", () => {
  getFirst(player).x -= 1;
});

onInput("right", () => {
  getFirst(player).x += 1;
});
\`\`\`

### Adding Behaviors

We want our player to push boxes and not be able to move through walls.

Let's make the player, boxes, and walls all solid so they can't move through eachother.

\`\`\`js
setSolids([ player, box, wall ]);
\`\`\`

Now those sprites won't overlap.

GIF OF SOLIDS

We want the player to push boxes though, we can set this behavior with \`setPushables\`.

\`\`\`js
setPushables({
  [ player ]: [ box ]
});
\`\`\`

The arguement passed to set pushables means that every sprite of type \`player\` or in this case \`p\` can push sprites with type \`box\` or in this case \`b\`.

Let's see what that looks like now.

GIF OF PUSHING

### Win Condition

We have some mechanics but we don't really have a game unless there is an objective. Let's add a win condition. The objective will be to push boxes onto the green goals.

We can check if all the green goals are covered after every input and if they are let's move on to the next level. We'll use the \`tilesWith\` function to help with this. We can pass in the sprite types and it will return all tiles which have every sprite type we passed inside.

\`\`\`js
afterInput(() => {
  const numberCovered = tilesWith(goal, box).length;
  const targetNumber = tilesWith(goal).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) setMap(currentLevel);
  }
});
\`\`\`

Let's add another level to our game to see this in action.

\`\`\`js
const levels = [
  map\`
p.w.
.bwg
....
....\`,
  map\`
p.w.
.bwg
....
..bg\`
];
\`\`\`

GIF OF CHANGING LEVEL

### Polish

Let's add some polish to our game.

It will be annoying to have to restart the entire game when we get stuck on one level.
We can fix this by adding the ability to restart levels.

\`\`\`js
onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) setMap(currentLevel);
});
\`\`\`

When our game is over let's let the player know they won.

\`\`\`js
afterInput(() => {
  const numberCovered = tilesWith(goal, box).length;
  const targetNumber = tilesWith(goal).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      setText("you win!")
    }
  }
});
\`\`\`

### Hackin' on It

Make the game your own. You can try:

- Drawing your own character art
- Adding more levels to the game (aim for 10)
- Changing the game mechanics
  - What if you could push walls?
  - What if you could move left and right 2 blocks instead of one?
  - What if there were laser beams which destroyed the player?
  - etc...

### Everything Together

Let's look at all of the code together now.

\`\`\`js
const player = "p";
const box = "b";
const goal = "g";
const wall = "w";

setLegend(
  [ player, bitmap\`
................
................
................
.......0........
.....00.000.....
....0.....00....
....0.0.0..0....
....0......0....
....0......0....
....00....0.....
......00000.....
......0...0.....
....000...000...
................
................
................\`],
  [ box, bitmap\`
................
................
................
...888888888....
...8...8...8....
...8...8...8....
...8...8...8....
...8...8...8....
...888888888....
...8...8...8....
...8...8...8....
...888888888....
................
................
................
................\`],
  [ goal, bitmap\`
................
................
................
....444444......
...44....44.....
...4......4.....
...4.......4....
...4.......4....
...4.......4....
...44......4....
....4......4....
....44....44....
.....444444.....
................
................
................\`],
  [ wall, bitmap\`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000\`]
);

let level = 0;
const levels = [
  map\`
p.w.
.bwg
....
....\`,
  map\`
p.w.
.bwg
....
..bg\`
];

const currentLevel = levels[level];
setMap(currentLevel);

onInput("up", () => {
  getFirst(player).y -= 1;
});

onInput("down", () => {
  getFirst(player).y += 1;
});

onInput("left", () => {
  getFirst(player).x -= 1;
});

onInput("right", () => {
  getFirst(player).x += 1;
});

onInput("j", () => {
  const currentLevel = levels[level];
  if (currentLevel !== undefined) setMap(currentLevel);
});

setSolids([ player, box, wall ]);

setPushables({
  [ player ]: [ box ]
});

afterInput(() => {
  const numberCovered = tilesWith(goal, box).length;
  const targetNumber = tilesWith(goal).length;

  if (numberCovered === targetNumber) {
    // increase the current level number
    level = level + 1;

    const currentLevel = levels[level];

    // make sure the level exists and if so set the map
    if (currentLevel !== undefined) {
      setMap(currentLevel);
    } else {
      setText("you win!");
    }
  }
});
\`\`\`

`

const mdHTML = marked(content);

</script>

{@html mdHTML}

<style>
  h1 {
    text-align: center;
    margin: 0;
    margin-top: 20px;
    margin-bottom: -10px;
    color: #868e96;
    font-size: 2.8em;
    line-height: 1;
    font-weight: normal;
  }

  h2 {
    color: var(--pcb-base);
    margin: 0;
    font-size: 1.75em;
    margin-top: 40px;
    margin-bottom: 20px;
  }

  h3 {
    margin: 0;
    margin-top: 30px;
    font-size: 1.125em;
  }

  p, ul, pre {
    color: #495057;
    margin: 16px 0;
    line-height: 1.5;
  }

  code, pre {
    font-family: monospace;
    font-size: 1.1em;
    background: #e9ecef;
    color: #343a40;
  }

  code {
    padding: 0 4px;
  }

  pre code {
    display: block;
    padding: 12px 16px;
    overflow: auto;
  }
</style>
