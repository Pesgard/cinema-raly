<script lang="ts">
	import { createPurchase } from '$lib/firebase';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { getModalStore } from '@skeletonlabs/skeleton';
	import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';
	import ConfirmarCompra from '../../../components/ConfirmarCompra.svelte';

	const movieID = $page.params.peliculas;
	console.log(movieID);
	const url = 'https://api.themoviedb.org/3';
	const apiKey = '14acb3038613b4236cdce36eb0ba80d7';
	const imageUrl = 'https://image.tmdb.org/t/p/original';
	const imagePath = 'https://image.tmdb.org/t/p/original';

	let result = '';
	let asientosSeleccionados;

	let dia = '';
	let horario = '';
    let validacion;

	//Datos de la pelicula a enviar al modal
	let info;
	onMount(() => {
		fetch(`${url}/movie/${movieID}?api_key=${apiKey}&language=es-ES&page=1`)
			.then((res) => res.json())
			.then((data) => {
				result = data;
				console.log(result);
			});
	});


    // funcion asincroma para registrar compra en base de datos
    async function crearCompra(userId, pelicula, dia, hora, asientos, total) {
        console.log(userId, pelicula, dia, hora, asientos, total);
        const response = await createPurchase(userId, pelicula, dia, hora, asientos, total);
		//enviar correo al servidor
		const api = fetch('/api/mail', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body:JSON.stringify({
				user: userId,
				pelicula: pelicula,
				dia: dia,
				hora: hora,
				asientos: asientos,
				total: total
			}
			)
		}
		)
		console.log(api, 'api');
        console.log(response, "response");
    }

	const modalStore = getModalStore();
	// Confirmar compra en un modal
	function modalComponentCompra(info: any) {
		const c: ModalComponent = {
			ref: ConfirmarCompra,
			props: { info }
		};
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			title: 'Confirma tu compra',
			body: 'Revisa los datos de tu compra y confirma para continuar',
			response: (r) => {
				console.log(r);
				//evalua si todos los campos de r estan llenos
				if (Object.values(r).every((x) => x !== '')) {
                    validacion = true;            
				} else {
					alert('Por favor, llena todos los campos.');
				}

                if (validacion === true) {
                    crearCompra(r.user, r.title, r.dia, r.horario, r.asientos, r.total);
                }
			} // r is the form data
		};
		modalStore.trigger(modal);
	}

	// Asientos
	let seats = Array(50).fill(false); // Crear 50 asientos, todos desocupados inicialmente
	const toggleSeat = (index) => (seats[index] = !seats[index]); // Función para seleccionar/deseleccionar asientos

	//crea una funcion para registrar los asientos seleccionados
	const registerSeats = () => {
		const selectedSeats = seats.reduce((acc, seat, index) => {
			if (seat) {
				acc.push(index + 1);
			}
			return acc;
		}, []);
		asientosSeleccionados = selectedSeats;
		console.log(asientosSeleccionados);
		info = {
			title: result.title,
			asientosSeleccionados: asientosSeleccionados,
			total: asientosSeleccionados.length * 40,
			dia: dia,
			horario: horario
		};
		console.log(info);
		modalComponentCompra(info);
	};
</script>

<div class="flex bg-gray-800 text-white p-4">
	<div class="w-1/2">
		<img
			class="h-96 w-full object-cover"
			src={`${imageUrl}${result.poster_path}`}
			alt={result.title}
		/>
	</div>
	<div class="w-1/2 p-5">
		<h2 class="text-4xl mb-5">{result.title}</h2>
		<p class="mb-5">{result.overview}</p>
		<p class="mb-5">
			Calificacion:
			<span class="h3">
				{result.vote_average} ⭐
			</span>
		</p>
		<p>Fecha de lanzamiento: {result.release_date}</p>
	</div>
</div>

<div class=" bg-blue-500 p-5">
	<div class="flex flex-col w-full items-center justify-center">
		<h2 class="h1 mb-5">Compra de boletos</h2>
		<hr class="w-full border-2 border-white mb-5" />
		<div class="flex flex-row">
			<!-- Selecciona un dia -->
			<select class="select" bind:value={dia}>
				<option value="Lunes">Lunes</option>
				<option value="Martes">Martes</option>
				<option value="Miercoles">Miercoles</option>
				<option value="Jueves">Jueves</option>
				<option value="Viernes">Viernes</option>
				<option value="Sabado">Sabado</option>
				<option value="Domingo">Domingo</option>
			</select>
			<!-- Selecciona un horario -->
			<select class="select" bind:value={horario}>
				<option value="10:00">10:00</option>
				<option value="12:00">12:00</option>
				<option value="14:00">14:00</option>
				<option value="16:00">16:00</option>
				<option value="18:00">18:00</option>
				<option value="20:00">20:00</option>
				<option value="22:00">22:00</option>
			</select>
		</div>
		<div class="flex flex-row mb-2">
			<div class="flex flex-row">
				<div class="flex items-center p-2">
					<div class="w-4 h-4 variant-filled rounded-full mr-2"></div>
					<span class="text-white">Disponible</span>
				</div>
				<div class="flex items-center p-2">
					<div class="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
					<span class="text-white">Seleccionado</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Asientos -->
	<div class="grid grid-cols-10">
		{#each seats as seat, index}
			<button
				class="btn h-10 w-10 {seat ? 'bg-red-500' : 'variant-filled'}"
				on:click={() => toggleSeat(index)}
			>
				{index + 1}
			</button>
		{/each}
	</div>

	<div class="flex justify-center mt-5">
		<button class="btn variant-filled-surface" on:click={registerSeats}> Comprar </button>
	</div>
</div>
