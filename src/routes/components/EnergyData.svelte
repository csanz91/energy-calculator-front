<script>
	import { onMount } from 'svelte';
    import ConsumptionBars from './ConsumptionBars.svelte';
	import TariffsBars from './TariffsBars.svelte';
	import Chart from './Chart.svelte';

	export let energyData;

    let self_url = ``;

    onMount(() => self_url = window.location.origin + '/energy-data/' + energyData.id);

	const getMonthlyConsumption = (energyData, periodIdx) =>
		energyData
			? energyData.monthly_data.map(
					(monthly_data) => monthly_data['consumption_data'][`consumption_p${periodIdx}`]
			  )
			: [];

	function getMonthName(first_day) {
		const date = new Date(first_day);

		// Using the browser's default locale.
		return date.toLocaleString([], { month: 'long', year: 'numeric' });
	}

	$: consumption_p1 = getMonthlyConsumption(energyData, 1);
	$: consumption_p2 = getMonthlyConsumption(energyData, 2);
	$: consumption_p3 = getMonthlyConsumption(energyData, 3);

	$: first_day = energyData ? new Date(energyData.all.first_day) : new Date();
	$: last_day = energyData ? new Date(energyData.all.last_day) : new Date();
	$: num_days = energyData ? energyData.all.consumption_data.num_days : 0;
	$: monthly_data = energyData ? energyData.monthly_data : [];
	$: months_labels = energyData
		? energyData.monthly_data.map((monthly_data) => getMonthName(monthly_data['first_day']))
		: [];

</script>


<p />
<a href={self_url}>Comparte este analisis</a>
<div>Primer dia de los datos: {first_day.toLocaleDateString()}</div>
<div>Ultimo dia de los datos: {last_day.toLocaleDateString()}</div>
<div>Numero de dias: {num_days}</div>
<div>
    Precio medio compensacion de gas de los ultimos 30 dias: {energyData.rd_10_mean_price.toFixed(
        4
    )} €
</div>

<ConsumptionBars {consumption_p1} {consumption_p2} {consumption_p3} labels={months_labels} />
<Chart
    consumption_p1={energyData.all.consumption_data.consumption_p1}
    consumption_p2={energyData.all.consumption_data.consumption_p2}
    consumption_p3={energyData.all.consumption_data.consumption_p3}
/>

<h1>Comparacion de tarifas</h1>
<TariffsBars tariffs={energyData.all.tariffs} label="Todos los periodos" />
{#each monthly_data as { tariffs, first_day }}
    <TariffsBars {tariffs} label={getMonthName(first_day)} />
{/each}