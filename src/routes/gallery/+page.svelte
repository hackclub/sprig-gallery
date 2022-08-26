<script>
  import Card from '../../components/Card.svelte';
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

    const makeURL = (x) => `https://editor.sprig.hackclub.com/api/thumbnail/${x}`;

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

<svelte:head>
  <style lang="scss">
    @import '../../styles/routes/gallery.scss';
  </style>

  <meta charSet="utf-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Gallery | Sprig</title>
  <meta property="og:title" content="Gallery" />
  <meta property="og:site_name" content="Sprig" />
  <meta
    name="description"
    content="The best way to learn is by making things that you care about and sharing them with other people. Check out games created by Hack Clubbers."
  />
  <meta
    property="og:description"
    content="The best way to learn is by making things that you care about and sharing them with other people. Check out games created by Hack Clubbers."
  />
  <meta name="keywords" content="game, sprig, hack club" />
  <meta name="author" content="@hackclub" />
  <meta name="twitter:creator" content="@hackclub" />
  <meta name="theme-color" content="#0a0a16" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="https://sprig.hackclub.com/SPRIGDINO.png" />
  <meta name="twitter:card" content="summary" />
  <meta property="og:url" content="https://sprig.hackclub.com/gallery" />
  <meta name="twitter:site" content="https://sprig.hackclub.com/gallery" />
</svelte:head>

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

  <a class="logo" href="https://hackclub.com">
    <img src="https://assets.hackclub.com/flag-orpheus-top.svg" alt="hack club logo" />
  </a>
  <a href="https://github.com/hackclub/sprig/tree/main/games" target="_blank">
    <img src="./spriglogotext.png" alt="sprig logo" class="sprig-logo" />
  </a>
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
