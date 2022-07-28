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
          <img class="gallery-title" src="/gallery.svg" alt="gallery header"/>
          <p>
            The best way to learn is by making things you care about and sharing them with others.
          </p>
          <p>
            Check out games by other Hack Clubbers! Click to play each game and to hack on the code.
          </p>
        </div>
        <div class="button-container">
          <button class="button"> Create </button>
          <button class="button"> Add Your Game </button>
        </div>
      </div>
    </div>
    <a class="logo" href="https://hackclub.com"
      ><img src="https://assets.hackclub.com/flag-orpheus-top.svg" alt="hack club logo" /></a
    >
    <a href="https://github.com/hackclub/sprig/tree/main/games" target="_blank"
      ><img src="./github.svg" alt="github logo" class="github-logo" /></a
    >
    <div class="gallery-outer">
      <div class="gallery-inner">
        {#each data as thumbnail}
          <div class="gallery-item">
            <a
              href={`https://sprig.hackclub.dev/?file=https://raw.githubusercontent.com/hackclub/sprig/main/games/${thumbnail.name}.js`}
            >
              <div class="image-box">
                <img src={thumbnail.imgURL} class="image" alt="game preview" />
              </div>

              <div class="text">
                <h3>
                  {thumbnail.name}
                  <!-- <br />
					by Name -->
                </h3>
              </div>
            </a>
          </div>
        {/each}
      </div>
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
  body {
    font-size: 62.5%;
    color: white;
    margin: 0;
    padding: 0;
    /* background-image: url(https://sprig.hackclub.dev/assets/bg.12a2b49c.svg); */
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/pixelart_ruins_girl_trees.png');
    background-size: cover;
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
    transform: translateZ(20px);
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
    padding-top: 4rem;
  }

  .info-outer {
    /* background-color: var(--pcb-base); */
    padding: 10vh 0;
    width: 40%;
    position: relative;
  }

  .info-inner {
    width: 80%;
    margin: auto;
  }

  .title {
    margin-bottom: 30px;
  }
  .gallery-outer {
    width: 60%;
    position: relative;
    /* background-color: #014a27; */
    height: fit-content;
    min-height: 100vh;
    padding: 40px 0;
    display: none;
    /* flex-grow: 1; */
  }
  .gallery-inner {
    width: 85%;
    margin: auto;
    display: grid;
    column-gap: 15px;
    row-gap: 15px;
  }

  .gallery-item {
    background: white;
    /* padding: 5px 3px; */
    /* border-radius: 5px; */
    border-image-repeat: stretch;
    border-image-slice: 3;
    border-image-width: 3;
    border-image-source: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="rgb(33,37,41)" /></svg>');
    border-image-outset: 2;
    padding: 1rem 1.5rem;
    margin: 4px;
    border-style: solid;
    border-width: 4px;
    /* border-bottom: var(--pcb-darker) 10px solid; */
  }

  .gallery-item:hover {
    /* transform: scale(1.05) rotate(2deg); */
    cursor: pointer;
  }

  /* .front {
    display: inline-block;
    padding: 4px 16px;
    border-radius: 4px;
    background: hsl(345deg 100% 47%);
    color: white;
    transform: translateY(-6px);
	letter-spacing: 1px;
  } */

  .button-container .button:not(:last-child) {
    margin-right: 10px;
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
    cursor: pointer;
    text-align: center;
    display: inline-flex;
    align-items: center;
    user-select: none;
    border-style: solid;
    position: relative;
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
    box-shadow: inset -4px -4px #e59400;
    box-sizing: border-box;
  }

  .button:hover {
    background: #f2c409;
    text-decoration: none;
  }

  .button:hover::after {
    box-shadow: inset -6px -6px #e59400;
  }

  /*   
  .button:active .front {
    transform: translateY(-2px);
  } */

  /* .big-button {
    position: relative;
    font-size: 16px;
	letter-spacing: 1px;
    background-color: rgb(224, 155, 26);
    color: white;
  }

  .big-button:hover {
    background-color: white;
    color: var(--pcb-base);
  } */

  .text {
    /* font-family: 'Press Start 2P'; */
    padding: 10px 0;
    display: flex;
    flex: 60% 40%;
    flex-wrap: wrap;
    width: 100%;
  }

  .github-logo {
    color: white;
    position: absolute;
    right: 30px;
    top: 30px;
    fill: white;
    width: 24px;
    transition-duration: 0.5s;
  }

  .github-logo:hover {
    transform: rotate(9deg);
  }

  .image-box {
    height: 180px;
    overflow: hidden;
    border: 2px solid black;
    visibility: hidden;
  }

  .image {
    width: 100%;
    height: 100%;
    border-radius: 3px;
    object-fit: cover;
    background: white;
    /* display: none; */
  }

  .logo {
    position: absolute;
    top: 0;
    left: 30px;
    background-size: contain;
    cursor: pointer;
    flex-shrink: 0;
    z-index: 333;
    transition: cubic-bezier(0.375, 0, 0.675, 1) transform;
    transform-origin: top left;
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
    .gallery-inner {
      grid-template-columns: 1fr;
    }

    .github-logo {
      width: 24px;
    }
  }

  @media (min-width: 480px) {
    /* h1 {
      font-size: 2rem;
    } */

    p {
      font-size: 1rem;
    }

    .gallery-inner {
      grid-template-columns: 1fr 1fr;
    }

    .github-logo {
      width: 36px;
    }

    /* .image-box {
      height: 200px;
    } */
  }

  @media (min-width: 760px) {
    /* h1 {
      font-size: 4rem;
    } */

    .gallery-inner {
      grid-template-columns: 1fr 1fr 1fr;
    }

    .github-logo {
      width: 38px;
    }

    /* .image-box {
      height: 200px;
    } */
  }

  @media (min-width: 920px) {
    /* h1 {
      font-size: 4.6rem;
    } */

    p {
      font-size: 2rem;
    }

    .button {
      font-size: 1.6rem;
    }

    .gallery-item {
      padding: 10px;
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

    p {
      font-size: 1.4rem;
    }

    .button {
      font-size: 1rem;
    }
  }
</style>
