<svelte:head>
  <meta charSet="utf-8" />
  <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Share | Sprig Gallery</title>
  <meta property="og:title" content="Share | Sprig Gallery" />
  <meta name="description" content="The best way to learn is by making things that you care about and sharing them with other people. Check out games created by Hack Clubbers." />
  <meta property="og:description" content="The best way to learn is by making things that you care about and sharing them with other people. Check out games created by Hack Clubbers." />
  <meta name="keywords" content="game, sprig, hack club" />
  <meta name="author" content="@hackclub" />
  <meta name="twitter:creator" content="@hackclub" />
  <meta name="theme-color" content="#0a0a16" />
  <meta property="og:url" content="https://sprig-gallery.hackclub.dev" />
  <meta name="twitter:site" content="https://sprig-gallery.hackclub.dev" />
  <meta property="og:type" content="website" />
  <meta property="og:image" content="/SPRIGDINO.svg" />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<body>
  <div class="wrapper">
    <a class="logo" href="https://hackclub.com">
      <img src="https://assets.hackclub.com/flag-orpheus-top.svg" alt="hack club logo" />
    </a>

    <div class="heading-outer">
      <div class="heading-inner">
        <h1>Share your game</h1>
        <p>
          After you <a href="https://sprig.hackclub.dev/" target="_blank">create your own game</a>, we'd love for you to
          <a href="/">share it with other makers</a> on the internet!
        </p>
      </div>
    </div>

    <div class="inner">
      <div class="step">
        <div>
          <p class="step-number">Step 0:</p>
          <h2>Name your game</h2>
          <p>Add the following code to the top of your file.</p>
        </div>
        <code class="media">
          /*<br />
          @title: your_game<br />
          @author: your name<br />
          */
        </code>
      </div>

      <div class="step">
        <div>
          <p class="step-number">Step 1:</p>
          <h2>Download your game file</h2>
          <p>In the top left, select "file", "share", then "as file". Your download should begin immediately.</p>
        </div>
        <img class="media" src="/screenshots/export.png" alt="screenshot of where to export the game file" />
      </div>

      <div class="step">
        <div>
          <p class="step-number">Step 2:</p>
          <h2>Fork the Sprig repository</h2>
          <p>Click below to create a fork of the <a href="https://github.com/hackclub/sprig">Sprig repository</a> on GitHub.</p>
          <p>You might have to sign up for a GitHub account.</p>
          <a href="https://github.com/hackclub/sprig/fork" target="_blank">
            <button class="btn active">Fork hackclub/sprig</button>
          </a>
        </div>
        <img class="media" src="/screenshots/fork.png" alt="screenshot of github's fork page" />
      </div>

      <div class="step">
        <div>
          <p class="step-number">Step 3:</p>
          <h2>Upload your game to your fork</h2>
          <ul>
            <li>Open the "Games" folder within your fork</li>
            <li>Click "Add File"</li>
            <li>Select "Upload File"</li>
            <li>Add your file and click "Commit File"</li>
          </ul>
        </div>
        <img class="media" src="/screenshots/upload.png" alt="screenshot of where to upload the game file on github" />
      </div>

      <div class="step">
        <div>
          <p class="step-number">(Optional) Step 4:</p>
          <h2>Add custom thumbnail</h2>
          <p>
            By default, the thumbnail that shows up in the gallery will be the first map of your game. If you want to
            change this, you can:
          </p>
          <ul>
            <li>Take a screenshot of your game (PNG format only)</li>
            <li>Click back to the gallery folder</li>
            <li>Open the img folder in gallery</li>
            <li>Click "Add File"</li>
            <li>Select "Upload File"</li>
            <li>Name your image file the file name for your game</li>
            <li>Click "Commit File"</li>
          </ul>
        </div>
        <img class="media" src="/screenshots/thumbnail.png" alt="screenshot of where to add a thumbnail" />
      </div>

      <div class="step">
        <div>
          <p class="step-number">Step 5:</p>
          <h2>Create a pull request</h2>
          <ul>
            <li>On your fork's page, click on "Contribute"</li>
            <li>Select "Open Pull Request"</li>
            <li>Click "Create Pull Request"</li>
            <li>Name your pull request with the name of your game</li>
            <li>Click "Create Pull Request"</li>
          </ul>
          <p>We'll take a look at your game! Once approved, your game will appear in the gallery :)</p>
        </div>
        <img class="media" src="/screenshots/contribute.png" alt="screenshot of the create pull request button" />
      </div>

      <a href="/" class="bottom-cta"><button class="btn active">Check out the gallery &raquo;</button></a>
    </div>
  </div>
</body>

<style lang="scss">
  @import '../styles/_variables.scss';
  @import '../styles/_fonts.scss';
  @import '../styles/_shared.scss';

  body {
    background: $accent;
    color: #16161e;
  }

  code {
    display: block;
    font-size: 1.2rem;
    font-family: inherit;
    font-weight: 400;
    border: 4px solid desaturate(darken($accent, 8%), 30%);
    padding: 20px 30px;
    width: 65%;
    margin: auto;
  }

  img {
    width: 100%;
    margin: auto;
    height: auto;
  }

  p,
  ul {
    font-size: 1.3rem;
    font-weight: 300;
  }

  .step-number {
    font-size: 1.2rem;
    margin: 0;
  }

  h2 {
    margin: 4px 0 20px 0;
  }

  li {
    line-height: 1.5em;
  }

  .inner {
    width: 75%;
    margin: 0 auto;
    padding-bottom: 5vh;
  }

  .heading-outer {
    padding: 10vh 0;
    margin: 0;
    margin-bottom: 5vh;
    color: white;
    background: url('/background.jpg'), $base-background;
    background-size: cover;
    background-attachment: fixed;
    background-position: bottom 200px center;
  }

  .heading-inner {
    width: 75%;
    margin: auto;

    a {
      color: $accent;
      text-decoration: underline;
    }
  }

  .step {
    display: grid;
    grid-template-columns: 1fr;
    padding-bottom: 7vh;
  }

  .bottom-cta {
    display: block;
    margin: 0 auto;
    width: fit-content;

    .btn {
      font-size: 1.6rem;
      padding: 10px 16px;
    }
  }

  @media (min-width: $breakpoint-2) {
    h1 {
      font-size: 42px;
    }

    .step {
      grid-template-columns: 0.8fr 1.2fr;
    }

    img {
      width: 80%;
    }

    @media (min-width: $breakpoint-3) {
      h1 {
        font-size: 54px;
      }
    }
  }
</style>
