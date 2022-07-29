<script>
  import { onMount } from 'svelte';
  import VanillaTilt from 'vanilla-tilt';

  let data = [];

  onMount(() => {
    VanillaTilt.init(document.querySelectorAll('.gallery-item'), {
      max: 15,
      scale: 1.05,
    });
  });

  const decode = ({ data, width }) => {
    const decodedString = atob(data);
    const l = decodedString.length;
    const buf = new Uint8ClampedArray(l);
    for (let i = 0; i < l; i++) {
      const char = decodedString[i];
      const byte = char.charCodeAt(0);
      buf[i] = byte;
    }

    return new ImageData(buf, width);
  };

  onMount(async () => {
    const gitFiles = await fetch(
      'https://api.github.com/repos/hackclub/sprig/contents/games?recursive=1',
    ).then((res) => res.json());

    const makeURL = (x) => `https://sprig.hackclub.dev/api/thumbnail/${x}`;

    const names = gitFiles.map(async (x) => {
      try {
        const res = await fetch(makeURL(x.name.slice(0, -3)));
        const json = await res.json();

        json.image = decode(json.image);
        const c = document.createElement('canvas');
        c.width = json.image.width;
        c.height = json.image.height;
        c.getContext('2d').putImageData(json.image, 0, 0);
        // const factor = 200/c.width;
        // c.style.width = c.width*factor + "px";
        // c.style.height = c.height*factor + "px";
        c.style['image-rendering'] = 'pixelated';
        json.imgURL = c.toDataURL();
        return json;
      } catch (err) {
        console.log(err);
      }
    });

    const result = await Promise.all(names);

    data = result.filter((x) => x);
  });
</script>

<body>
  <div class="wrapper">
    <div class="info-outer">
      <div class="info-inner">
        <div class="title">
          <div class="gallery-title">
            <!-- <img src="/spriglogotext.png" alt="sprig logo" class="sprig-logo"> -->
            <img class="gallery-header" src="/gallery.svg" alt="gallery header" draggable="false" />
            <p>
              The best way to learn is by making things you care about and sharing them with others.
            </p>
            <p>
              Check out games by other Hack Clubbers! Click to play each game and to hack on the
              code.
            </p>
          </div>
        </div>
        <div class="button-container">
          <!-- <button class="button"> Create </button> -->
          <button class="button"> Add Your Game </button>
        </div>
      </div>
    </div>
    <a class="logo" href="https://hackclub.com"
      ><img src="https://assets.hackclub.com/flag-orpheus-top.svg" alt="hack club logo" /></a
    >
    <a href="https://github.com/hackclub/sprig/tree/main/games" target="_blank"
      ><img src="./spriglogotext.png" alt="sprig logo" class="sprig-logo" /></a
    >
    <div class="gallery-outer">
      <div class="gallery-item start-from-scratch">
        <a href="/">
          <div class="image-box">
            <div class="gallery-image">
              <span>Start<br />From<br />Scratch</span>
            </div>
          </div>
          <div class="gallery-text">
            <h3>Title<br /> <span>by Author</span></h3>
          </div>
        </a>
      </div>
      {#each data as thumbnail}
        <div class="gallery-item">
          <a
            href={`https://sprig.hackclub.dev/?file=https://raw.githubusercontent.com/hackclub/sprig/main/games/${thumbnail.name}.js`}
            style="margin:0;padding:0;"
          >
            <div class="image-box">
              <img src={thumbnail.imgURL} class="gallery-image" alt="game preview" />
            </div>
            <div class="gallery-text">
              <h3>
                {thumbnail.name}<br />
                <span>by Author</span>
              </h3>
            </div>
          </a>
        </div>
      {/each}
    </div>
  </div>
</body>

<style>
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

  @font-face {
    font-family: 'AddLGBitmap09';
    src: url('/fonts/AddLGBitmap09.ttf');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Pixel Emulator';
    src: url('/fonts/Pixel Emulator.otf');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'OS X Darwin';
    src: url('/fonts/OS X Darwin.ttf');
    font-weight: 400;
    font-style: normal;
  }

  :root {
    --pcb-lighter: #04a356;
    --pcb-base: #016e3d;
    --pcb-trace: #014a27;
    --pcb-darker: #03321b;
  }

  * {
    cursor: url('/cursor.png'), auto;
  }

  body {
    font-size: 62.5%;
    color: white;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    /* background-color: var(--pcb-base);
    background-image: url(https://sprig.hackclub.dev/assets/bg.12a2b49c.svg); */
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url('/pixelart_ruins_girl_trees.png');
    background-size: cover;
    background-attachment: fixed;
  }

  h3::selection,
  p::selection,
  a::selection {
    color: var(--pcb-trace);
    background-color: white;
  }

  /* h1 {
    margin: 0;
    text-transform: uppercase;
    font-family: 'AddLGBitmap09', monospace;
    letter-spacing: 2px;
    color: white;
    text-shadow: -4px -4px 0 #000, 0 -4px 0 #000, 4px -4px 0 #000,
      4px 0 0 #000, 4px 11px 0 #000, 0 11px 0 #000, -4px 11px 0 #000, -4px 0 0 #000;
  } */

  .gallery-header {
    width: 20rem;
    padding: 0;
    margin: 0;
  }

  .gallery-title {
    width: 90%;
  }

  h3 {
    margin: 0;
    text-transform: capitalize;
    color: black;
    margin-top: 10px;
    font-size: 1.6rem;
    font-weight: 400;
  }
  a {
    text-decoration: none;
  }

  p {
    font-family: 'OS X Darwin', 'JetBrains Mono', monospace;
    /* text-shadow: 0 1px 0px #000; */
    /* line-height: 1.5; */
  }

  .wrapper {
    width: 100vw;
    z-index: -1;
    display: flex;
    padding: 4rem 6rem;
  }

  .info-outer {
    /* background-color: var(--pcb-base); */
    padding: 10vh 0;
    width: calc(50% - 6rem);
    position: relative;
  }

  /* .info-inner {
    width: 70%;
    margin: auto;
  } */

  .title {
    margin-bottom: 30px;
  }

  .button-container .button:not(:last-child) {
    margin-right: 1rem;
  }

  .button {
    font-family: 'Pixel Emulator';
    font-size: 1.2rem;
    text-transform: uppercase;
    margin: 4px;
    display: inline-block;
    /* background: hsl(340deg 100% 32%); */
    /* border: none; */
    color: #212529;
    background: #ffde4d;

    padding: 6px 12px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    user-select: none;
    border-style: solid;
    position: relative;
    cursor: url('/cursor-click.png'), pointer;
    border-width: 4px;

    border-image-slice: 2;
    border-image-width: 2;
    border-image-source: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="rgb(33,37,41)" /></svg>');
    border-image-outset: 2;
  }

  .button::after {
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    content: '';
    box-shadow: inset 4px 4px #fbf7b1, inset -4px -4px #e59400;
    box-sizing: border-box;
  }

  .button:hover {
    background: #f2c409;
    transform: scale(1.05);
    text-decoration: none;
  }

  .button:hover::after {
    box-shadow: inset 4px 4px #fbf7b178, inset -6px -6px #e59400;
  }

  .gallery-text {
    font-family: 'OS X Darwin';
    display: flex;
    flex: 60% 40%;
    flex-wrap: wrap;
    padding: 0 0.8rem 0.8rem 0.8rem;
  }

  .gallery-text span {
    font-size: 1.2rem;
    padding: 0;
  }

  .start-from-scratch .gallery-text {
    visibility: hidden;
  }

  .gallery-item {
    display: flex;
    flex-direction: column;
    background: #ffde4d;
    border-style: solid;
    border-width: 4px;
    border-image-repeat: stretch;
    border-image-slice: 3;
    border-image-width: 3;
    border-image-source: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="rgb(229, 148, 0)" /></svg>');
    border-image-outset: 2;
  }

  .gallery-item,
  .gallery-item * {
    cursor: url('/cursor-click.png'), pointer;
  }

  .gallery-item:hover {
    transform: scale(1.05);
    background: #f2c409;
  }

  .sprig-logo {
    position: absolute;
    right: 30px;
    top: 30px;
    width: 8rem;
    /* transition-duration: 0.5s; */
    cursor: url('/cursor-click.png'), pointer;
  }

  .sprig-logo:hover {
    transform: scale(1.05);
  }

  .gallery-outer {
    padding: 10vh 0;
    margin: 0;
    width: calc(50%);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2.2rem;
  }

  .image-box {
    width: 13rem;
    height: 13rem;
    border: 4px solid black;
    margin: 0.8rem;
  }

  .gallery-image {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    background: white;
    /* border: 4px solid #000; */
  }
  .gallery-image span {
    font-family: 'OS X Darwin', 'JetBrains Mono', monospace;
    color: black;
    font-size: 1.8rem;
    text-transform: lowercase;
    display: block;
    padding: 0.4rem;
  }

  .logo {
    position: absolute;
    top: 0;
    left: 30px;
    background-size: contain;
    flex-shrink: 0;
    z-index: 333;
    transition: cubic-bezier(0.375, 0, 0.675, 1) transform;
    transform-origin: top left;
  }

  .logo,
  .logo * {
    cursor: url('/cursor-click.png'), pointer;
  }

  .logo img {
    width: 112px;
    height: auto;
  }

  .logo:hover,
  .logo:focus {
    animation: waveFlag 0.5s linear infinite alternate;
  }

  @keyframes waveFlag {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-5deg);
    }
  }

  @media (min-width: 320px) {
    /* .sprig-logo {
      width: 24px;
    } */
  }

  @media (min-width: 480px) {
    /* h1 {
      font-size: 2rem;
    } */

    p {
      font-size: 1rem;
    }

    /* .sprig-logo {
      width: 36px;
    } */
  }

  @media (min-width: 760px) {
    /* .sprig-logo {
      width: 38px;
    } */
  }

  @media (min-width: 920px) {
    /* h1 {
      font-size: 4.6rem;
    } */

    p {
      font-size: 1.8rem;
    }

    .button {
      font-size: 1.6rem;
    }
    .logo img {
      width: 128px;
      height: auto;
    }
  }

  @media (resolution: 1.5dppx) {
    /* h1 {
      font-size: 3.2rem;
      letter-spacing: 0.3rem;
      padding-bottom: 0.8rem;
    } */

    .image-box {
      width: 10rem;
      height: 10rem;
    }

    p {
      font-size: 1.2rem;
    }

    h3 {
      font-size: 1.3rem;
    }
    .gallery-text span {
      font-size: 1rem;
    }

    .button {
      font-size: 1rem;
    }
  }
</style>
