<script>
	import { onMount } from 'svelte';
	import VanillaTilt from 'vanilla-tilt';

	let data = [];

	onMount(() => {
		VanillaTilt.init(document.querySelectorAll('.gallery-item'), {
			max: 15,
			scale: 1.05
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
  }

	onMount(async () => {
		const gitFiles = await fetch('https://api.github.com/repos/hackclub/sprig/contents/games?recursive=1')
			.then(res => res.json());

		const makeURL = x => `https://sprig.hackclub.dev/api/thumbnail/${x}`

		const names = gitFiles
			.map(async x => {
				try {
					const res = await fetch(makeURL(x.name.slice(0, -3)));
					const json = await res.json();

					json.image = decode(json.image);
					const c = document.createElement("canvas");
					c.width = json.image.width;
					c.height = json.image.height;
					c.getContext("2d").putImageData(json.image, 0, 0);
					// const factor = 200/c.width;
					// c.style.width = c.width*factor + "px";
					// c.style.height = c.height*factor + "px";
					c.style["image-rendering"] = "pixelated";
					json.imgURL = c.toDataURL();
					return json;
				} catch (err) {
					console.log(err);
				}
			});

		const result = await Promise.all(names);

		data = result.filter(x => x);
	})


</script>

<body>
	<div class="info-outer">
		<div class="info-inner">
			<div class="title">
				<h1>Sprig Gallery</h1>
				<p>
					The best way to learn is by making things you care about and sharing them with others.
				</p>
				<p>
					Check out games by other Hack Clubbers!

					Click to play each game and to hack on the code.
				</p>
			</div>
			<div>
				<a href="https://sprig.hackclub.dev" class="button big-button">
					Create Your Own
				</a>
				<a href="https://github.com/hackclub/sprig/blob/main/games/README.md" class="button big-button">Share your game</a>
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
					<a href={`https://sprig.hackclub.dev/?file=https://raw.githubusercontent.com/hackclub/sprig/main/games/${thumbnail.name}.js`}>

						<div class="image-box">
							<img src={thumbnail.imgURL} class="image" alt="game preview" />
						</div>

						<div class="text">
							<h3> {thumbnail.name} </h3>
						</div>
						
					</a>
				</div>
			{/each}
		</div>
	</div>
</body>





<style>
	@import url('https://fonts.googleapis.com/css2?family=B612+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap');

	:root {
		--pcb-lighter: #04a356;
		--pcb-base: #016e3d;
		--pcb-trace: #014a27;
		--pcb-darker: #03321b;
	}

	body {
		font-family: 'B612 Mono', monospace;
		font-weight: 400;
		color: white;
		margin: auto;
	}

	h1::selection,
	h3::selection,
	p::selection,
	a::selection {
		color: var(--pcb-trace);
		background-color: white;
	}

	h1 {
		font-size: 24px;
		margin: 0;
	}

	h3 {
		margin: 0;
		text-transform: capitalize;
		color: white;
		margin-top: 10px;
		font-size: 15px;
		transform: translateZ(20px);
	}

	a {
		text-decoration: none;
	}

	p {
		font-size: 13px;
	}

	.info-outer {
		background-color: var(--pcb-base);
		background-image: url(https://sprig.hackclub.dev/assets/bg.12a2b49c.svg);
		padding: 10vh 0;
		width: 100vw;
	}

	.info-inner {
		width: 85%;
		margin: auto;
	}

	.title {
		margin-bottom: 50px;
	}
	.gallery-outer {
		width: 100vw;
		background-color: #014a27;
		height: fit-content;
		min-height: 100vh;
		padding: 40px 0;
	}
	.gallery-inner {
		width: 85vw;
		margin: auto;
		display: grid;
		column-gap: 30px;
		row-gap: 30px;
	}

	.gallery-item {
		background-color: var(--pcb-base);
		padding: 15px 13px;
		border-radius: 5px;
		border-bottom: var(--pcb-darker) 10px solid;
		transition-duration: 0.5s;
		transform-style: preserve-3d;
		transform: perspective(1000px);
	}

	.gallery-item:hover {
		transform: scale(1.12) rotate(3deg);
		cursor: pointer;
	}

	.button {
		background-color: var(--pcb-trace);
		padding: 5px 10px;
		font-size: 0.8em;
		color: var(--pcb-lighter);
		text-decoration: none;
		font-weight: 700;
		border-radius: 3px;
		margin-left: auto;
		transition-duration: 0.5s;
		margin-top: 10px;
		transform: translateZ(20px);
	}

	.button:hover {
		transform: scale(1.12) rotate(3deg);
	}

	.big-button {
		position: relative;
		font-size: 16px;
		background-color: transparent;
		color: white;
		border: white 2px dotted;
	}

	.big-button:hover {
		background-color: white;
		color: var(--pcb-base);
		border: white 2px solid;
	}

	.text {
		padding: 10px 0;
		display: flex;
		flex: 60% 40%;
		flex-wrap: wrap;
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
		width: 100%;
		height: 250px;
		overflow: hidden;
		transform: translateZ(20px);
	}

	.image {
		width: 100%;
		height: 100%;
		border-radius: 3px;
		object-fit: cover;
		transform: translateZ(20px);
		background: white;
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
		h1 {
			font-size: 26px;
		}

		h3 {
			font-size: 18px;
		}

		p {
			font-size: 14px;
		}

		.gallery-inner {
			grid-template-columns: 1fr 1fr;
		}

		.github-logo {
			width: 36px;
		}

		.big-button {
			position: relative;
			font-size: 20px;
		}

		.image-box {
			height: 200px;
		}
	}

	@media (min-width: 760px) {
		h1 {
			font-size: 42px;
		}

		h3 {
			font-size: 20px;
		}

		.gallery-inner {
			grid-template-columns: 1fr 1fr 1fr;
		}

		.github-logo {
			width: 38px;
		}

		.big-button {
			position: relative;
			font-size: 20px;
		}

		.image-box {
			height: 200px;
		}
	}

	@media (min-width: 920px) {
		h1 {
			font-size: 54px;
		}

		p {
			font-size: 18px;
		}

		.gallery-item {
			padding: 30px 25px;
		}

		.logo img {
			width: 128px;
			height: auto;
		}
	}
</style>
