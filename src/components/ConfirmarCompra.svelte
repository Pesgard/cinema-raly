<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { authHandlers, authStore } from '../stores/authStore'
	// Stores
	import { getModalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent: SvelteComponent;
	export let info: any;

	let validar;
	let email;

	
	authStore.subscribe((curr) => {
		console.log('CURR', curr);
		email = curr?.currentUser?.email;
		console.log('EMAIL', email);
	});

	console.log(info);

	const modalStore = getModalStore();

	// Validar la información del formulario
	const validateInput = (value, type) => {
		switch (type) {
			case 'email':
				const emailRegex = /^\S+@\S+\.\S+$/;
				if (!emailRegex.test(value)) {
					console.log('Por favor, introduce un correo electrónico válido.');
					validar = false;
				}
				break;
			case 'tel':
				const telRegex = /^\d{10}$/;
				if (!telRegex.test(value)) {
					console.log('Por favor, introduce un número de teléfono válido.');
					validar = false;
				}
				break;
			case 'tarjeta':
				if (value.length !== 16) {
					console.log('Por favor, introduce un número de tarjeta válido.');
					validar = false;
				}
				break;
			case 'expiracion':
				const expiryRegex = /^(\d{2}\/\d{2})$/;
				if (!expiryRegex.test(value)) {
					console.log('Por favor, introduce una fecha de vencimiento válida (MM/AA).');
					validar = false;
				}
				break;
			case 'codigo':
				if (value.length !== 3) {
					console.log('Por favor, introduce un CVV válido.');
					validar = false;
				}
				break;
			default:
				if (!value) {
					console.log('Este campo es obligatorio.');
					validar = false;
				}
		}
		validar = true;
	};

	// Form Data
	const formData = {
		user: email,
		title: info.title,
		asientos: info.asientosSeleccionados,
		total: info.total,
		dia: info.dia,
		horario: info.horario,

		// Datos Personales
		firstName: '',
		lastName: '',
		tel: '',
		email: '',
		// Datos de Tarjeta
		tarjeta: '',
		expiracion: '',
		codigo: ''
	};

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-fit shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class={cBase}>
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<!-- Enable for debugging: -->
		<form >
			<div class="{cForm} flex flex-row gap-4">
				<!-- Datos Personales -->
				<div class="space-y-4 w-fit">
					<h2 class="mb-2">Ingresa tus datos</h2>
					<label class="label">
						<span>Nombre</span>
						<input
							name="firstName"
							class="input"
							type="text"
							bind:value={formData.firstName}
							placeholder="Ingresa Nombre..."
							on:blur={() => validateInput(formData.firstName, 'firstName')}
						/>
					</label>
					<label class="label">
						<span>Apellido</span>
						<input
							name="lastName"
							class="input"
							type="text"
							bind:value={formData.lastName}
							placeholder="Ingresa Apellido..."
							on:blur={() => validateInput(formData.lastName, 'lastName')}
						/>
					</label>
					<label class="label">
						<span>Numero de Telefono</span>
						<input
							name="tel"
							class="input"
							type="tel"
							bind:value={formData.tel}
							placeholder="Telefono..."
							on:blur={() => validateInput(formData.tel, 'tel')}
						/>
					</label>
					<label class="label">
						<span>Email</span>
						<input
							name="email"
							class="input"
							type="email"
							bind:value={formData.email}
							placeholder="Direccion de correo..."
							required
							on:blur={() => validateInput(formData.email, 'email')}
						/>
					</label>

					<hr />

					<label class="label">
						<span>Numero de Tarjeta</span>
						<input
							name="tarjeta"
							class="input"
							type="text"
							bind:value={formData.tarjeta}
							placeholder="Numero de Tarjeta..."
							required
							on:blur={() => validateInput(formData.tarjeta, 'tarjeta')}
						/>
					</label>
					<label class="label">
						<span>Fecha de Expiracion</span>
						<input
							name="expiracion"
							class="input"
							type="text"
							bind:value={formData.expiracion}
							placeholder="Fecha de Expiracion..."
							required
							on:blur={() => validateInput(formData.expiracion, 'expiracion')}
						/>
					</label>
					<label class="label">
						<span>Codigo de Seguridad</span>
						<input
							name="codigo"
							class="input"
							type="text"
							bind:value={formData.codigo}
							placeholder="Codigo de Seguridad..."
							required
							on:blur={() => validateInput(formData.codigo, 'codigo')}
						/>
					</label>
				</div>

				<span class="divider-vertical h-screen" />

				<!-- Informacion de Compra -->
				<div class="space-y-4 w-auto">
					<h2 class="h3 mb-2">Resumen de Compra</h2>
					<hr />
					<p class="font-bold">{formData.title}</p>

					<div class="flex flex-row">
						<p>
							Dia:
							<span class="font-bold">{formData.dia}</span>
						</p>
					</div>

					<div class="flex flex-row">
						<p>
							Horario:
							<span class="font-bold">{formData.horario}</span>
						</p>
					</div>

					<div class="flex flex-row">
						<p>
							Asientos:
							<span class="font-bold">{formData.asientos.join(', ')}</span>
						</p>
					</div>

					<hr />

					<div class="flex flex-row">
						<p>
							Total:
							<span class="font-bold">${formData.total}.00 MXN</span>
						</p>
					</div>
				</div>
			</div>
			<footer class="modal-footer {parent.regionFooter}">
				<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>
					{parent.buttonTextCancel}
				</button>

				<!-- // si esta validado activa el boton o caso contario desactivalo -->
				{#if validar}
					<button  class="btn {parent.buttonPositive}" on:click={onFormSubmit}
						>Confirmar</button
					>
				{:else}
					<button class="btn {parent.buttonPositive}" disabled>Confirmar</button>
				{/if}
			</footer>
		</form>
	</div>
{/if}
