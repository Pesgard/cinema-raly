<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	const url = 'https://api.themoviedb.org/3';
	const apiKey = '14acb3038613b4236cdce36eb0ba80d7';
	const imageUrl = 'https://image.tmdb.org/t/p/original';
	const imagePath = 'https://image.tmdb.org/t/p/original';

	let result = '';

	onMount(() => {
		fetch(`${url}/movie/popular?api_key=${apiKey}&language=es-ES&page=1`)
			.then((res) => res.json())
			.then((data) => {
				result = data.results;
				console.log(result);
				//Obtener todas las imagenes
				const images = result.map((movie) => {
					return `${imageUrl}${movie.poster_path}`;
				});
			});
	});
</script>

<div class="h-full bg-white">
	<h2 class="h2 text-blue-500 flex items-center justify-center w-full">Cartelera</h2>

	<div class="ml-20 me-20 space-x-4">
		<div class=" grid grid-cols-3">
			{#each result as movie}
				<a href="/card" class="card bg-initial card-hover overflow-hidden m-4">
					<img class=" h-96 w-full" src={`${imageUrl}${movie.poster_path}`} alt={movie.title} />
					<p class="text-center">{movie.title}</p>
				</a>
			{/each}
		</div>
	</div>
</div>
