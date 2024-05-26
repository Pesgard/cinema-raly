<script>
	import { authStore, authHandlers } from '../../stores/authStore';
	import { AppBar } from '@skeletonlabs/skeleton';
	import logo from '$lib/logo.png';
	import { Icon, MagnifyingGlass, User } from 'svelte-hero-icons';
	import { AppShell } from '@skeletonlabs/skeleton';


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
</script>

<AppShell regionPage="relative" slotPageHeader="sticky top-0 z-10">
	<svelte:fragment slot="pageHeader">
		<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end">
			<svelte:fragment slot="lead">
				<a href="/"> <img src={logo} alt="logo" class="h-8" /></a>
			</svelte:fragment>
			<svelte:fragment>
				<div class="flex flex-row w-full items-center justify-center space-x-4">
					<a href="/home" class="btn btn-initial hover:text-primary-600">Cartelera</a>
					<a href="/about" class="btn btn-initial hover:text-primary-600">Contacto</a>
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
</AppShell>
