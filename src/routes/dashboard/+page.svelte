<script>
	// @ts-nocheck
	//Carousel
	import { Carousel } from 'flowbite-svelte';
	import { onMount } from 'svelte';
	import js from 'jquery';

	const url = 'https://api.themoviedb.org/3';
	const apiKey = '14acb3038613b4236cdce36eb0ba80d7';
	const imageUrl = 'https://image.tmdb.org/t/p/original';
	const imagePath = 'https://image.tmdb.org/t/p/original';

	let result = '';
	let images = [];

	onMount(() => {
		fetch(`${url}/movie/popular?api_key=${apiKey}&language=es-ES&page=1`)
			.then((res) => res.json())
			.then((data) => {
				result = data.results;
				console.log(result);
				//Obtener todas las imagenes y guardarlas en un array
				result.forEach((movie) => {
					images.push({
						alt: movie.title,
						src: `${imageUrl}${movie.backdrop_path}`,
						title: movie.title.toLowerCase().replace(/ /g, '-')
					});
				});
				console.log(images);
			});
	});
</script>

<div class="h-full bg-white">
	<section class="bg-primary-500 mb-24">
		<div class="max-w-full bg-transparent">
			<Carousel {images} duration="3000" />
		</div>
	</section>

	<h2 class="h2 text-blue-500 flex items-center justify-center w-full">Cartelera</h2>

	<div class="ml-20 me-20 space-x-4">
		<div id="pel" class=" grid grid-cols-3">
			{#each result as movie}
				<a
					data-sveltekit-reload
					href={`dashboard/${movie.id}`}
					class="card bg-initial card-hover overflow-hidden m-4"
				>
					<img class=" h-96 w-full" src={`${imageUrl}${movie.poster_path}`} alt={movie.title} />
					<p class="text-center">{movie.title}</p>
				</a>
			{/each}
		</div>
	</div>
</div>
