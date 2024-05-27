<script>
	import { authStore, authHandlers } from '../../stores/authStore';
	import { AppBar } from '@skeletonlabs/skeleton';
	import logo from '$lib/logo.png';
	import { Icon, MagnifyingGlass, User } from 'svelte-hero-icons';
	import { AppShell } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import js from 'jquery';

	let verified;
	let email;
	let admin;
	let showUserInfo = false;
	let cartItems = []; // Esta variable debe contener los productos del carrito
	let showCartInfo = false;

	//Mostrar informacion del Usuario
	function toggleUserInfo() {
		showUserInfo = !showUserInfo;
	}

	authStore.subscribe((curr) => {
		console.log('CURR', curr);
		// @ts-ignore
		email = curr?.currentUser?.email;
		// @ts-ignore
		verified = curr?.currentUser?.emailVerified;

		if (verified === false) {
			window.location.href = '/';
		}
	});

	onMount(() => {
		window.js = js;
		js('#myButton').on('click', function () {
			//haz que muestre un alert con la fecha actual
			alert(new Date());
		});
	});
</script>

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
	<svelte:fragment slot="pageHeader">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<a href="/"> <img src={logo} alt="logo" class="h-8" /></a>
			</svelte:fragment>
			<svelte:fragment>
				<div class="flex flex-row w-full items-center justify-center space-x-4">
					<a href="/dashboard" class="btn btn-initial hover:text-primary-600">Cartelera</a>
					<a href="/dashboard/contactanos" class="btn btn-initial hover:text-primary-600"
						>Contacto</a
					>
					<button id="myButton">jquery</button>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<button class="btn-icon bg-initial hover:text-primary-600">
					<Icon src={MagnifyingGlass} class="h-6" />
				</button>
				<!--- Usuarios -->
				<div>
					<button
						type="button"
						on:click={toggleUserInfo}
						class="btn btn-sm bg-transparent flex flex-col hover:bg-slate-300"
					>
						<Icon src={User} class="w-full h-6"></Icon>
						<span>Usuario</span>
					</button>

					{#if showUserInfo}
						<div
							class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
							role="menu"
							aria-orientation="vertical"
							aria-labelledby="user-menu-button"
							tabindex="-1"
						>
							<p class="block px-4 py-2 text-sm text-gray-700">{email}</p>
							<button
								type="button"
								on:click={authHandlers.logout}
								class="btn bg-transparent hover:bg-slate-300 w-full rounded-none"
								>Cerrar Sesión
							</button>
						</div>
					{/if}
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<slot />

	<svelte:fragment slot="pageFooter">
		<footer class=" text-gray-600 body-font mt-6">
			<div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
				<a
					class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900"
				>
					<img src={logo} alt="logo" class="h-8" />
				</a>
				<p
					class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l sm:border-gray-200 sm:py-2 sm:mt-0 mt-4"
				>
					© 2024 Cinemas Raly —
					<a
						href="https://www.facebook.com/cineraly/?locale=es_LA"
						class="text-gray-600 ml-1"
						rel="noopener noreferrer"
						target="_blank">Cinema Raly</a
					>
				</p>
				<span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
					<a class="text-gray-500">
						<svg
							fill="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							class="w-5 h-5"
							viewBox="0 0 24 24"
						>
							<path
								d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10 5.52 0 10-4.48 10-10 0-5.52-4.48-10-10-10zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-1.77.65-3.38 1.71-4.62L9 9.38V7l3 2v1.38l-1.29.91c.34.95.53 1.96.53 3 .01 4.41 3.59 7.99 8 8 .93 0 1.85-.16 2.71-.46l-1.54-1.54c-.61.19-1.24.29-1.89.29-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.65-.81 3.15-2.04 4.07l-1.52-1.52c.34-.55.56-1.19.56-1.88 0-2.21-1.79-4-4-4-2.21 0-4 1.79-4 4 0 1.09.44 2.08 1.16 2.8l-1.58 1.58c-1.27-1.26-2.03-2.99-2.03-4.89 0-3.08 3.05-7.44 7-7.93V7l3-2v2.07z
								"
							></path>
						</svg>
					</a>
					<a class="ml-3 text-gray-500">
						<svg
							fill="currentColor"
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							class="w-5 h-5"
							viewBox="0 0 24 24"
						>
							<path d="M23 3H1v18h22V3zm-2 16H3V5h18v14zM12 6v12"></path>
						</svg>
					</a>
				</span>
			</div>

			<section class=" flex w-full items-center justify-center p-5 bg-blue-500 text-white">
				<p>
					Copyright © 2024 Todos los derechos reservados. Diseñado por el equipo de Cinemas Raly .
				</p>
			</section>
		</footer>
	</svelte:fragment>
</AppShell>
