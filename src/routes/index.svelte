<script>
  import Card from '../components/Card.svelte';
  import { onMount } from 'svelte';

  let games = [];
  let tags = [];

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

        if (json.image.kind === 'png') {
          json.imgURL = `data:image/png;base64,${json.image.data}`;
        } else {
          // Raw, hopefully
          const imageData = decode(json.image);
          const c = document.createElement('canvas');
          c.width = imageData.width;
          c.height = imageData.height;
          c.getContext('2d').putImageData(imageData, 0, 0);
          c.style['image-rendering'] = 'pixelated';
          json.imgURL = c.toDataURL();
        }

        json.author = x.author;
        json.tags = x.tags;

        return json;
      } catch (err) {
        console.log(err);
      }
    });

    const result = await Promise.all(names);
    games = result.filter((x) => x);
    tags = [...new Set(games.reduce((p, c) => [...p, ...c.tags], []))];
  });

  let activeFilter = null;
</script>

<body>
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
            {#each tags as tag}
              <button
                id={tag}
                class={activeFilter === tag ? 'btn-tag btn active' : 'btn-tag btn'}
                on:click={() => (activeFilter = activeFilter === tag ? null : tag)}
              >
                {tag}
              </button>
            {/each}
          </fieldset>
        </div>

        <div class="btn-container">
          <p>Want to join in on the fun? If you have a Sprig game to share with the community, click here!</p>
          <a href="/share">
            <button class="btn active">Add Your Game</button>
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

        {#each games as game}
          <!-- Tutorials first, or whatever the filter is -->
          {#if game.tags.includes(activeFilter || 'tutorial')}
            <Card name={game.name} imgURL={game.imgURL} tags={game.tags} author={game.author} />
          {/if}
        {/each}

        {#each games as game}
          <!-- Everything but tutorials, or nothing if we're filtering -->
          {#if !game.tags.includes('tutorial') && !activeFilter}
            <Card name={game.name} imgURL={game.imgURL} tags={game.tags} author={game.author} />
          {/if}
        {/each}
      </div>
    </div>
  </div>
</body>

<style lang="scss">
  @import '../styles/_variables.scss';
  @import '../styles/_fonts.scss';
  @import '../styles/_shared.scss';

  body {
    background: $base-background;
    color: white;
  }

  .wrapper {
    background: url('/background.jpg'), $base-background;
    background-size: cover;
    background-attachment: fixed;
    background-position: center center;
    overflow: hidden;
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
    background: $base-background;
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

  .btn {
    text-transform: lowercase;
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

  @media (max-width: 920px) {
    .wrapper {
      flex-direction: column;
      overflow: auto;
      --wrapper-padding-horizontal: 3rem;
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

    .tag-container fieldset legend {
      font-size: 1.6rem;
    }

    .tag-container {
      width: 100%;
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
    .gallery-header {
      width: 20rem;
    }

    .tag-container fieldset legend {
      font-size: 1.3rem;
    }
  }
</style>
