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

    /////////////////////////////////
    try {
      games = await fetch('https://editor.sprig.hackclub.com/metadata.json')
        .then((res) => res.json())
        .catch((error) => {
          console.log(error);
        });
    } catch (e) {
      console.log('Cowabunga! A spicy error:');
      console.log(e);
      games = [
        {
          filename: 'sokoban',
          title: 'sokoban',
          author: 'leo mcelroy',
          img: '',
          tags: ['beginner', 'hackable', 'puzzle'],
        },
        {
          filename: 'pong',
          title: 'pong',
          author: 'neesh',
          img: '',
          tags: ['classic'],
        },
        {
          filename: 'penguin_slide',
          title: 'penguin_slide',
          author: 'veehz',
          img: '',
          tags: ['puzzle'],
        },
        {
          filename: 'laser_tag',
          title: 'laser_tag',
          author: 'leo mcelroy',
          img: '',
          tags: ['hackable', 'puzzle'],
        },
        {
          filename: '15_puzzle',
          title: '15_puzzle',
          author: 'maggie liu',
          img: '',
          tags: ['advanced'],
        },
        {
          filename: '9_puzzle',
          title: '9_puzzle',
          author: 'brian silverman',
          img: '',
          tags: [],
        },
        {
          filename: 'kindless',
          title: 'kindless',
          author: 'Ishan',
          img: '',
          tags: ['advanced'],
        },
        {
          filename: 'color_patterns',
          title: 'color_patterns',
          author: 'brian silverman',
          img: '',
          tags: [],
        },
        {
          filename: 'matcher',
          title: 'matcher',
          author: 'brian silverman',
          img: '',
          tags: [],
        },
        {
          filename: 'shoot_green_blobs',
          title: 'shoot_green_blobs',
          author: 'otterly-otter',
          img: '',
          tags: [],
        },
        {
          filename: 'crappy_bird',
          title: 'crappy_bird',
          author: 'ced',
          img: '',
          tags: [],
        },
        {
          filename: 'friendship',
          title: 'friendship',
          author: 'nicky case',
          img: '',
          tags: ['beginner', 'puzzle'],
        },
        {
          filename: 'getting_started',
          title: 'getting_started',
          author: 'hack club',
          img: '',
          tags: ['beginner', 'tutorial'],
        },
        {
          filename: 'maze',
          title: 'maze',
          author: 'leo mcelroy',
          img: '',
          tags: ['beginner', 'hackable', 'puzzle'],
        },
        {
          filename: 'pyre',
          title: 'pyre',
          author: 'ced',
          img: '',
          tags: ['puzzle'],
        },
        {
          filename: 'raycasting',
          title: 'raycasting',
          author: 'henry bass',
          img: '',
          tags: ['advanced'],
        },
        {
          filename: 'tolls',
          title: 'tolls',
          author: 'leo mcelroy',
          img: '',
          tags: ['WIP'],
        },
        {
          filename: 'fogged',
          title: 'fogged',
          author: 'Jay Reddy',
          img: '',
          tags: ['WIP'],
        },
        {
          filename: 'multiplayer_soccer',
          title: 'multiplayer_soccer',
          author: 'Shannon Yeow',
          img: '',
          tags: ['multiplayer'],
        },
        {
          filename: 'snakey_snake',
          title: 'snakey_snake',
          author: 'Alexander Chin',
          img: '',
          tags: ['WIP', 'puzzle'],
        },
        {
          filename: 'platform_rogue',
          title: 'platform_rogue',
          author: 'farreltobias',
          img: '',
          tags: ['advanced'],
        },
        {
          filename: 'among_us_maze',
          title: 'among_us_maze',
          author: 'Riya and Christy',
          img: '',
          tags: ['advanced', 'web-only'],
        },
        {
          filename: '256',
          title: '256',
          author: 'Jacky Zhao',
          img: '',
          tags: ['classic'],
        },
        {
          filename: 'minesweeper',
          title: 'minesweeper',
          author: 'sam liu',
          img: '',
          tags: ['classic'],
        },
        {
          filename: 'connect_four',
          title: 'connect_four',
          author: 'sam liu',
          img: '',
          tags: ['classic'],
        },
        {
          filename: 'SprazeJS',
          title: 'SprazeJS',
          author: 'Peipr',
          img: '',
          tags: [],
        },
        {
          filename: 'nomis',
          title: 'nomis',
          author: 'Cheru Berhanu',
          img: '',
          tags: ['classic', 'hackable'],
        },
        {
          filename: 'snek',
          title: 'snek',
          author: 'gammacarrot',
          img: '',
          tags: ['classic'],
        },
        {
          filename: 'sokoban_plus',
          title: 'sokoban_plus',
          author: 'Leonard (Omay)',
          img: '',
          tags: ['puzzle'],
        },
        {
          filename: 'tictactoe',
          title: 'tictactoe',
          author: 'reesericci',
          img: '',
          tags: ['classic', 'multiplayer'],
        },
        {
          filename: 'alien',
          title: 'alien',
          author: 'anshimathur0325',
          img: '',
          tags: [],
        },
        {
          filename: 'mistery_of_scooter',
          title: 'mistery_of_scooter',
          author: 'LucasHT22',
          img: '',
          tags: ['WIP'],
        },
        {
          filename: 'balloon',
          title: 'balloon',
          author: 'LucasHT22',
          img: '',
          tags: ['WIP'],
        },
        {
          filename: 'purge',
          title: 'purge',
          author: 'noviicee',
          img: '',
          tags: ['puzzle'],
        },
        {
          filename: 'confusing_conditions',
          title: 'confusing_conditions',
          author: 'Sooraj',
          img: '',
          tags: [],
        },
        {
          filename: 'Virtual_Machine',
          title: 'Virtual_Machine',
          author: 'N_Rizwan',
          img: '',
          tags: [],
        },
      ];
    }
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
  <a href="/">
    <img src="./spriglogotext-white.png" alt="sprig logo" class="sprig-logo" />
  </a>
  <img src="/SPRIGDINO.svg" alt="sprig dino" class="sprig-dino" />

  <div class="gallery-outer">
    <div class="gallery-inner" bind:this={gallery}>
      <Card id="start-from-scratch" />

      {#each games as game}
        <!-- Tutorials first, or whatever the filter is -->
        {#if game.tags.includes(activeFilter || 'tutorial')}
          <Card {...game} />
        {/if}
      {/each}

      {#each games as game}
        <!-- Everything but tutorials, or nothing if we're filtering -->
        {#if !game.tags.includes('tutorial') && !activeFilter}
          <Card {...game} />
        {/if}
      {/each}
    </div>
  </div>
</div>
