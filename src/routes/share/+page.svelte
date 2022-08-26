<svelte:head>
  <style lang="scss">
    @import '../../styles/routes/share.scss';
  </style>

  <title>Share | Sprig</title>
  <meta property="og:title" content="Share" />
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
  <meta property="og:url" content="https://sprig.hackclub.com/share" />
  <meta name="twitter:site" content="https://sprig.hackclub.com/share" />
</svelte:head>

<div class="wrapper">
  <div class="heading-outer">
    <div class="heading-inner">
      <h1>Share your game</h1>
      <p>
        After you <a href="https://editor.sprig.hackclub.com/" target="_blank">create your own game</a>, we'd love for
        you to
        <a href="/gallery">share it with other makers</a> on the internet!
      </p>
    </div>
  </div>

  <h1>Anyone can submit to the gallery but if you want to get a Sprig read the details below.<h1>

  <div class="inner">
    <h2>How to get a Sprig!</h2>
    <p>
      Sprig consoles are a limited run and will be ready for delivery end of Oct 2022*.
    </p>
    <p>
      Get on the waitlist now by sharing your game and having it approved by one of our project maintainers.
      Once your GitHub pull request is approved, we'll collect your shipping details.
    </p>
    <p>
      <b>If you have any questions, join #sprig on our <a href="https://hackclub.com/slack">Slack</a>.</b>
    </p>
    <p>There are only a few requirements to get a Sprig console:</p>
    <ol>
      <li>you must be in high school or younger (this will be checked before mailing)</li>
      <li>your game must use the Sprig editor</li>
      <li>your game must be winnable</li>
      <li>your game has a minimum of 5mins of gameplay</li>
      <li>your game is original</li>
    </ol>
    <p>
      <small>(* Our aim is to ship everywhere except US-sanctioned and trade-/mail-restricted nations.)</small>
    </p>


    <div class="step">
      <div>
        <p class="step-number">Step 0:</p>
        <h2>Name your game</h2>
        <p>Add the following comment.</p>
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
        <p>Select "file", "share", then "as file". Your download should begin immediately.</p>
      </div>
      <img class="media" src="/screenshots/export.png" alt="screenshot of where to export the game file" />
    </div>

    <div class="step">
      <div>
        <p class="step-number">Step 2:</p>
        <h2>Fork the Sprig repository</h2>
        <p>Click below to create a fork of the Sprig repository.</p>
        <p>You might have to sign up for a GitHub account.</p>
        <a href="https://github.com/hackclub/sprig/fork" target="_blank">
          <button class="btn active">Fork hackclub/sprig</button>
        </a>

        <p>Optional: while you're here it'd be nice to give us a star!</p>
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

    <a href="/gallery" class="bottom-cta"><button class="btn big active">Check out the gallery &raquo;</button></a>
  </div>
</div>

<a class="logo" href="https://hackclub.com">
  <img src="https://assets.hackclub.com/flag-orpheus-top.svg" alt="hack club logo" />
</a>
<a href="https://github.com/hackclub/sprig/tree/main/games" target="_blank">
  <img src="./spriglogotext.png" alt="sprig logo" class="sprig-logo" />
</a>
<img src="/SPRIGDINO.svg" alt="sprig dino" class="sprig-dino" />
