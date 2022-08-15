<script>
  import Card from '../components/Card.svelte';
  import { onMount } from 'svelte';

  let data = [];
  let tags = ['beginner', 'advanced', 'tutorial'];

  let preloader;
  let gallery;

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
    // Preloader observes for changes in .gallery-inner childlist
    let observer = new MutationObserver(() => {
      preloader.style.opacity = '0';

      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
      observer.disconnect();
    });
    observer.observe(gallery, { childList: true });

    /////////////////////////////////

    const gitFiles = await fetch('https://raw.githubusercontent.com/hackclub/sprig/main/games/metadata.json').then(
      (res) => res.json(),
    );

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

  let activeFilters = [];

  let handleFilter = (x) => {
    let index = activeFilters.indexOf(x.tag);
    if (index > -1) {
      activeFilters.splice(index, 1);
    } else {
      activeFilters.push(x.tag);
    }
    activeFilters = activeFilters;
  };
</script>

<div bind:this={preloader} id="preloader">
  <img src="/loader.gif" alt="coin preloader" />
  <p>loading...</p>
</div>

<div class="wrapper">
  <div class="info-outer">
    <div class="info-inner">
      <div class="gallery-title">
        <img class="gallery-header" src="/gallery.svg" alt="gallery header" draggable="false" />
        <p>
          The best way to learn is by making things that you care about and sharing them with other people.
          <br /><br />
          Check out games by other Hack Clubbers! Click to play each game and to hack on the code.
        </p>
      </div>

      <div class="tag-container">
        <fieldset>
          <legend>Filter By Tag</legend>
          {#each tags as tag, i}
            <button
              id={tag}
              class={activeFilters.length === 0 || activeFilters.includes(tag)
                ? 'btn-tag btn'
                : 'btn-tag btn inactive'}
              on:click={() => {
                handleFilter({ tag });
              }}
            >
              {tag}
            </button>
          {/each}
        </fieldset>
      </div>

      <div class="btn-container">
        <p>Want to join in on the fun? If you have a Sprig game to share with the community, click here!</p>
        <a href="https://github.com/hackclub/sprig/blob/main/games/README.md">
          <button class="btn"> Add Your Game </button>
        </a>
      </div>
    </div>
  </div>
  <a class="logo" href="https://hackclub.com"
    ><img src="https://assets.hackclub.com/flag-orpheus-top.svg" alt="hack club logo" /></a
  >
  <a href="https://github.com/hackclub/sprig/tree/main/games" target="_blank"
    ><img src="./spriglogotext.png" alt="sprig logo" class="sprig-logo" /></a
  >
  <img src="/SPRIGDINO.svg" alt="sprig dino" class="sprig-dino" />
  <div class="gallery-outer">
    <div class="gallery-inner" bind:this={gallery}>
      <Card id="start-from-scratch" />
      {#each data as thumbnail}
        {#if activeFilters.every((elem) => thumbnail.tags.includes(elem))}
          <Card name={thumbnail.name} imgURL={thumbnail.imgURL} tags={thumbnail.tags} author={thumbnail.author} />
        {/if}
      {/each}
    </div>
  </div>
</div>

<style type="text/scss">
  // ============= IMPORTS ============

  @import '../styles/_variables.scss';
  @import '../styles/_fonts.scss';

  // ============= END IMPORTS ============

  *,
  *::before,
  *::after {
    cursor: $cursor-inactive;
    box-sizing: border-box;
  }

  :global(body) {
    font-size: 62.5%;
    color: white;
    margin: 0;
    padding: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/pixelart_ruins_girl_trees.png');
    background-size: cover;
    background-attachment: fixed;
    overflow: hidden;
  }

  ::selection {
    color: black;
    background-color: white;
  }

  a {
    text-decoration: none;
  }

  p {
    font-size: 1.4rem;
    font-family: $text-font;
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
    height: 100vh;
    overflow: hidden;
    z-index: -1;
    display: flex;
    --wrapper-padding-vertical: 3rem;
    --wrapper-padding-horizontal: 6rem;
  }

  .info-outer {
    overflow: auto;
    padding: calc(10vh + var(--wrapper-padding-vertical)) 0;
    padding-left: var(--wrapper-padding-horizontal);
    flex: 3;
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
          font-size: 1.4rem;
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

    &.inactive {
      color: $button-inactive-color;
      background: $button-inactive-background;

      &::after {
        box-shadow: inset 4px 4px $button-inactive-highlight, inset -4px -4px $button-inactive-shadow;
      }

      &:hover {
        background: $button-inactive-hover-background;
        &::after {
          box-shadow: inset 4px 4px $button-inactive-hover-highlight, inset -6px -6px $button-inactive-hover-shadow;
        }
      }
    }

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
      background: $button-hover-background;
      transform: scale(1.05);
      text-decoration: none;

      &::after {
        box-shadow: inset 4px 4px $button-hover-highlight, inset -6px -6px $button-shadow;
      }
    }
  }

  .gallery {
    &-outer {
      padding: calc(10vh + var(--wrapper-padding-vertical)) 0;
      padding-right: var(--wrapper-padding-horizontal);
      margin: 0;
      flex: 5;
      overflow: auto;
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
      overflow: auto;
      --wrapper-padding-horizontal: 3rem;
    }

    .sprig-dino {
      display: none;
    }

    .gallery {
      &-outer {
        padding-top: 0;
        padding-left: var(--wrapper-padding-horizontal);
        width: 100%;
        overflow: unset;
      }

      &-inner {
        justify-content: center;
      }

      &-header {
        width: 20rem;
      }
    }
    .info-outer {
      width: 100%;
      padding-right: var(--wrapper-padding-horizontal);
      padding-bottom: 10vh;

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
      --wrapper-padding-horizontal: 2rem;
    }
  }

  @media (max-width: 320px) {
    .wrapper {
      --wrapper-padding-horizontal: 1rem;
    }
  }

  @media (resolution: 1.5dppx) {
    p {
      font-size: 1.3rem;
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
