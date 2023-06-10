<script>
	import Dropzone from './components/Dropzone.svelte';
	import Tariffs from './components/Tariffs.svelte';
	import EnergyData from './components/EnergyData.svelte';

	export let data;

	let energyData;
	let tariffsVisible = false;
</script>

<div class="data-selection">
	<h1>Calculadora</h1>
	<Dropzone bind:energyData />
	<button on:click={() => (tariffsVisible = !tariffsVisible)}>Mostrar tarifas</button>
</div>

{#if tariffsVisible}
	<Tariffs tariffsData={data.tariffsData} />
{/if}

{#if energyData}
    <EnergyData energyData={energyData} />
{/if}

<style>
	.data-selection {
		display: flex;
		align-content: space-around;
		align-items: stretch;
		flex-direction: column;
		flex-wrap: wrap;
	}
</style>
