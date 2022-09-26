<script>
  import Card from '../../components/Card.svelte';
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  let games = [];
  let tags = [];

  let preloader;
  let gallery;

  onMount(async () => {
    if (!browser) return;

    // Preloader observes for changes in .gallery-inner childlist
    let observer = new MutationObserver(() => {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
      observer.disconnect();
    });
    observer.observe(gallery, { childList: true });

    games = await fetch('https://editor.sprig.hackclub.com/metadata.json').then((res) => res.json());
    [...games]
      .sort((a, b) => new Date(b.addedOn) - new Date(a.addedOn))
      .slice(0, 9)
      .forEach((game) => (game.isNew = true));
    tags = [...new Set(games.reduce((p, c) => [...p, ...c.tags], []))].filter((x) => x !== "");
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

<div class="top-bar">
  <div class="info-outer">
    <img class="gallery-header" src="/gallery.svg" alt="gallery header" draggable="false" />
    <div class="info-inner">
      <div class="tag-container">
        <p>
          The best way to learn is by making things that you care about and sharing them with other people. Check out
          games by other Hack Clubbers!
        </p>
        <div class="btn select-btn">
          <select
            on:input={(event) => {
              activeFilter = event.target.value || null;
            }}
            value={activeFilter || ''}
          >
            <option value="">filter by tag...</option>
            {#each tags as tag}
              <option value={tag}>
                #{tag.toLowerCase()}
              </option>
            {/each}
            <option value="_new">recently added</option>
          </select>
        </div>
      </div>

      <div class="btn-container">
        <p>Have a Sprig game to share with the community? Join the fun!</p>
        <a href="/share">
          <button class="btn active">Add Your Game</button>
        </a>
      </div>
    </div>
  </div>

  <a class="logo" href="https://hackclub.com">
    <img src="https://assets.hackclub.com/flag-orpheus-top.svg" alt="hack club logo" />
  </a>
  <a href="/">
    <img src="./spriglogotext-white.png" alt="sprig logo" class="sprig-logo" />
  </a>
</div>

<div class="wrapper">
  <img src="/SPRIGDINO.svg" alt="sprig dino" class="sprig-dino" />

  <div class="gallery-outer">
    <div class="gallery-inner" bind:this={gallery}>
      <Card id="start-from-scratch" />

      {#each games as game}
        <!-- Tutorials first, or whatever the filter is -->
        {#if (activeFilter === '_new' && game.isNew) || game.tags.includes(activeFilter || 'tutorial')}
          <Card isNew={game.isNew} title={game.title} tags={game.tags} author={game.author} />
        {/if}
      {/each}

      {#each games as game}
        <!-- Everything but tutorials, or nothing if we're filtering -->
        {#if !game.tags.includes('tutorial') && !activeFilter}
          <Card isNew={game.isNew} title={game.title} tags={game.tags} author={game.author} />
        {/if}
      {/each}
    </div>
  </div>
</div>
