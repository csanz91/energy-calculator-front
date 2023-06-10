<script>
	import EnergyData from '../../components/EnergyData.svelte';
	export let data;
</script>

{#if data.energyData}
    <EnergyData energyData={data.energyData} />
{/if}