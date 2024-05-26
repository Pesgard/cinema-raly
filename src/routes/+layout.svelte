<script lang="ts">
	import '../app.postcss';
	import { AppBar } from '@skeletonlabs/skeleton';
	import logo from '$lib/logo.png';
	import { Icon, MagnifyingGlass } from 'svelte-hero-icons';
</script>

<AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end"
	>
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
	</svelte:fragment>
</AppBar>

<slot />
