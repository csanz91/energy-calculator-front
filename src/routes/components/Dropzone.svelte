<script>
	import { onMount } from 'svelte';
	// If you are using JavaScript/ECMAScript modules:
	import Dropzone from 'dropzone';
	import 'dropzone/dist/dropzone.css';

	let wrapper;
	let myDropzone;

	let contracted_p1 = 3.0;
	let contracted_p2 = 3.0;

	export let energyData;

	onMount(() => {
		myDropzone = new Dropzone(wrapper, { maxFiles: 1, autoProcessQueue: false });
		myDropzone.on('complete', function (file) {
			myDropzone.removeFile(file);
		});
		myDropzone.on('success', function (file, response) {
			energyData = response.response;
		});
	});
	function calculateEnergy() {
		if (myDropzone) {
			myDropzone.processQueue();
		}
	}
</script>

<form bind:this={wrapper} action="http://localhost:8000/file-upload" class="dropzone">
	<div>
		<label for="contracted_p1">Potencia contratada periodo P1 (kW):</label>
		<input
			type="range"
			step="0.1"
			min="1"
			max="10"
			name="contracted_p1"
			required
			bind:value={contracted_p1}
		/>
		<input type="number" step="0.1" min="1" max="10" bind:value={contracted_p1} />
	</div>
	<div>
		<label for="contracted_p2">Potencia contratada periodo P2 (kW):</label>
		<input
			type="range"
			step="0.1"
			min="1"
			max="10"
			name="contracted_p2"
			required
			bind:value={contracted_p2}
		/>
		<input type="number" step="0.1" min="1" max="10" bind:value={contracted_p2} />
	</div>
	<div class="dz-message">Arrastra aqui el fichero .csv</div>
</form>
<button on:click={calculateEnergy}>Calcular Factura</button>

<style>
	.dropzone {
		border: 4px solid var(--color-theme-2);
		color: var(--color-text);
		margin: 2rem 0;
	}
</style>
