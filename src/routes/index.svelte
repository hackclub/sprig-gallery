<script>
  import Card from '../components/Card.svelte';
  import { onMount } from 'svelte';

  let data = [];

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
      'https://raw.githubusercontent.com/hackclub/sprig/main/games/metadata.json',
    ).then((res) => res.json());

    const makeURL = (x) => `https://sprig.hackclub.dev/api/thumbnail/${x}`;

    const names = gitFiles.map(async (x) => {
      try {
        const res = await fetch(makeURL(x.title));
        const json = await res.json();

        json.image = decode(json.image);
        const c = document.createElement('canvas');
        c.width = json.image.width;
        c.height = json.image.height;
        c.getContext('2d').putImageData(json.image, 0, 0);
        c.style['image-rendering'] = 'pixelated';
        json.imgURL = c.toDataURL();
        json.author = x.author;
        json.tags = x.tags;

        return json;
      } catch (err) {
        console.log(err);
      }
    });

    const result = await Promise.all(names);

    data = result.filter((x) => x);
  });

  // $: visibleUsers =

  // Preloader observes for DOM update in .gallery-inner childlist
  onMount(() => {
    let preloader = document.querySelector('#preloader');
    let gallery = document.querySelector('.gallery-inner');
    let observer = new MutationObserver(() => {
      preloader.style.opacity = '0';

      setTimeout(() => {
        preloader.style.display = 'none';
        document.body.style.overflow = 'auto';
      }, 500);
      observer.disconnect();
    });
    observer.observe(gallery, { childList: true });
  });
</script>

<body>
  <div id="preloader">
    <img src="/loader.gif" alt="coin preloader" />
    <p>loading...</p>
  </div>

  <div class="wrapper">
    <div class="info-outer">
      <div class="info-inner">
        <div class="gallery-title">
          <img class="gallery-header" src="/gallery.svg" alt="gallery header" draggable="false" />
          <p>
            The best way to learn is by making things that you care about and sharing them with
            other people.
            <br /><br />
            Check out games by other Hack Clubbers! Click to play each game and to hack on the code.
          </p>
        </div>

        <div class="tag-container">
          <fieldset>
            <legend>Filter By Tag</legend>
            <button class="btn-tag btn"> Beginner </button>
            <button class="btn-tag btn"> Advanced </button>
            <button class="btn-tag btn"> Tutorials </button>
          </fieldset>
        </div>

        <div class="btn-container">
          <p>
            Want to join in on the fun? If you have a Sprig game to share with the community, click
            here!
          </p>
          <button class="btn"> Add Your Game </button>
        </div>
      </div>
    </div>
    <a class="logo" href="https://hackclub.com"
      ><img src="https://assets.hackclub.com/flag-orpheus-top.svg" alt="hack club logo" /></a
    >
    <a href="https://github.com/hackclub/sprig/tree/main/games" target="_blank"
      ><img src="./spriglogotext.png" alt="sprig logo" class="sprig-logo" /></a
    >
    <!-- <div class="dino-container">
      <div class="bubble">
        <p>Psst! We're on GitHub!</p>
      </div>
    </div> -->
    <img src="/SPRIGDINO.svg" alt="sprig dino" class="sprig-dino" />
    <div class="gallery-outer">
      <div class="gallery-inner">
        <Card id="start-from-scratch" />
        {#each data as thumbnail}
          <Card
            name={thumbnail.name}
            imgURL={thumbnail.imgURL}
            tags={thumbnail.tags}
            author={thumbnail.author}
          />
        {/each}
      </div>
    </div>
  </div>
</body>

<style type="text/scss">
  // ============= IMPORTS & VARIABLES ============

  @import '../styles/_variables.scss';
  @import '../styles/_fonts.scss';

  :root {
    --pcb-lighter: #04a356;
    --pcb-base: #016e3d;
    --pcb-trace: #014a27;
    --pcb-darker: #03321b;
  }
  // ============= END IMPORTS & VARIABLES ============

  *,
  *::before,
  *::after {
    cursor: $cursor-inactive;
    box-sizing: border-box;
  }

  body {
    font-size: 62.5%;
    color: white;
    margin: 0;
    padding: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
      url('/pixelart_ruins_girl_trees.png');
    background-size: cover;
    background-attachment: fixed;
    overflow: hidden;
  }

  h3::selection,
  p::selection,
  a::selection {
    color: var(--pcb-trace);
    background-color: white;
  }

  a {
    text-decoration: none;
  }

  p {
    font-size: 1.5rem;
    font-family: $text-font;
    // text-transform: lowercase;
  }

  #preloader {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4;
    // background: rgba(50,46,46,255);
    background: $preloader-background;
    opacity: 1;
    transition: all 0.5s ease;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      width: 14rem;
    }
    p {
      margin: 1rem 0;
    }
  }

  .wrapper {
    width: 100%;
    height: auto;
    z-index: -1;
    display: flex;
    padding: 3rem 6rem;
  }

  .info-outer {
    padding: 10vh 0;
    flex: 3;
    // width: 40%;
    position: relative;
    p {
      width: 98%;
    }

    .tag-container {
      margin: 2rem 0;
      position: relative;
      fieldset {
        border: 4px solid white;
        padding: 0.8rem;
        max-width: 100%;
        width: fit-content;
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        legend {
          font-family: $subheading-font;
          text-transform: lowercase;
          font-size: 1.6rem;
          padding: 0 0.5rem;
          margin-left: 1rem;
        }
      }
    }
  }

  .btn {
    font-family: $subheading-font;
    font-size: 1.4rem;
    text-transform: lowercase;
    margin: 4px;
    display: inline-block;
    color: $button-text-border;
    background: $button-background;
    white-space: nowrap;

    padding: 6px 12px;
    text-align: center;
    display: inline-flex;
    align-items: center;
    user-select: none;
    border-style: solid;
    position: relative;
    border-width: 4px;

    border-image-slice: 2;
    border-image-width: 2;
    border-image-source: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="5" height="5" xmlns="http://www.w3.org/2000/svg"><path d="M2 1 h1 v1 h-1 z M1 2 h1 v1 h-1 z M3 2 h1 v1 h-1 z M2 3 h1 v1 h-1 z" fill="' + $button-text-border + '" /></svg>');
    border-image-outset: 2;

    &::after {
      cursor: $cursor-active;
      position: absolute;
      top: -4px;
      left: -4px;
      right: -4px;
      bottom: -4px;
      content: '';
      box-shadow: inset 4px 4px $button-highlight, inset -4px -4px $button-shadow;
      box-sizing: border-box;
    }

    &:hover {
      background: #f2c409;
      transform: scale(1.05);
      text-decoration: none;

      &::after {
        box-shadow: inset 4px 4px $button-hover-highlight, inset -6px -6px $button-shadow;
      }
    }

    &-tag {
      // color: $button-tag-color;
      // background: $button-tag-background;
      // white-space: nowrap;

      // &::after {
      //   box-shadow: inset 4px 4px $button-tag-highlight, inset -4px -4px $button-tag-shadow;
      // }

      // &:hover {
      //   background: $button-tag-hover-background;

      //   &::after {
      //     box-shadow: inset 4px 4px $button-tag-hover-highlight, inset -4px -4px $button-tag-shadow;
      //   }
      // }
    }
  }

  .gallery {
    &-outer {
      padding: 10vh 0;
      margin: 0;
      // width: 50%;
      flex: 5;
    }

    &-inner {
      display: flex;
      flex-wrap: wrap;

      justify-content: flex-end;
      gap: 2.2rem;
    }

    &-header {
      width: 26rem;
      padding: 0;
      margin: 0;
    }
    &-title {
      margin-bottom: 30px;
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

    &,
    & * {
      cursor: $cursor-active;
    }

    img {
      width: 112px;
      height: auto;
    }

    &:hover,
    &:focus {
      animation: waveFlag 0.5s linear infinite alternate;
    }
  }

  // .dino-container {
  //   position: fixed;
  //   left: 30px;
  //   transition: all 0.5s linear;
  //   bottom: -3.8rem;
  //   display: flex;
  //   align-items: center;

  //   &,
  //   & * {
  //     cursor: $cursor-active;
  //   }

  //   &:hover {
  //     bottom: 0;

  //     .bubble {
  //       opacity: 1;
  //     }
  //   }

  //   .sprig-dino {
  //     width: 4rem;
  //   }
  //   .bubble {
  //     opacity: 0;
  //     transition: all 0.3s ease;
  //     transition-delay: 0.4s;
  //     border-image-repeat: stretch;
  //     border-image-slice: 3;
  //     border-image-width: 3;
  //     border-image-repeat: stretch;
  //     border-image-source: url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="rgb(33,37,41)" /></svg>');
  //     border-image-outset: 2;
  //     background: white;
  //     padding: 0.5rem 1.2rem;
  //     margin: 8px 8px 30px 18px;
  //     border-width: 4px;
  //     position: relative;
  //     border-style: solid;

  //     &::before {
  //       position: absolute;
  //       content: '';
  //       bottom: -14px;
  //       width: 26px;
  //       height: 10px;
  //       background-color: #fff;
  //       border-right: 4px solid #212529;
  //       border-left: 4px solid #212529;
  //     }

  //     &::after {
  //       position: absolute;
  //       content: '';
  //       bottom: -18px;
  //       width: 18px;
  //       height: 4px;
  //       margin-right: 8px;
  //       color: #212529;
  //       background-color: #fff;
  //       box-shadow: -4px 0, 4px 0, -4px 4px #fff, 0 4px, -8px 4px, -4px 8px, -8px 8px;
  //     }

  //     p {
  //       font-size: 1.4rem;
  //       margin: 0;
  //       color: black;
  //     }
  //   }
  // }

  .sprig {
    &-logo {
      position: absolute;
      right: 30px;
      top: 30px;
      width: 8rem;
      /* transition-duration: 0.5s; */
      cursor: $cursor-active;

      &:hover {
        transform: scale(1.05);
      }
    }

    &-dino {
      position: fixed;
      left: 30px;
      width: 4rem;
      bottom: -3.8rem;
      cursor: $cursor-active;
      transition: all 0.5s linear;

      &:hover {
        bottom: 0;
      }
    }
  }
  @keyframes waveFlag {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(-5deg);
    }
  }

  @media (max-width: 760px) {
  }

  @media (max-width: 920px) {
    .wrapper {
      flex-direction: column;
      padding: 3rem;
    }

    .sprig-dino {
      display: none;
    }

    // .tag-container fieldset {
    //   flex-direction: column;
    // }
    .gallery {
      &-outer {
        width: 100%;
      }

      &-inner {
        justify-content: center;
      }
      &-item {
        width: 12rem;
      }

      &-header {
        width: 20rem;
      }
    }
    .info-outer {
      width: 100%;

      p {
        font-size: 1.6rem;
        width: 100%;
      }
    }

    .btn,
    .tag-container fieldset legend {
      font-size: 1.6rem;
    }

    .tag-container {
      width: 100%;
    }

    .logo img {
      width: 128px;
      height: auto;
    }
    .gallery-header {
      width: 25rem;
    }
  }

  @media (max-width: 480px) {
    .gallery-header {
      width: 18rem;
    }

    .info-outer p,
    .btn,
    .tag-container fieldset legend {
      font-size: 1.4rem;
    }

    .wrapper {
      padding: 3rem 2rem;
    }
  }

  @media (max-width: 320px) {
    .wrapper {
      padding: 3rem 1rem;
    }
  }

  @media (resolution: 1.5dppx) {
    .gallery-item {
      width: 14rem;
    }

    p {
      font-size: 1.3rem;
    }

    h3 {
      font-size: 1.2rem;
    }
    .text span {
      font-size: 0.8rem;
    }
    .gallery-header {
      width: 20rem;
    }

    .btn,
    .tag-container fieldset legend {
      font-size: 1.3rem;
    }
  }
</style>
