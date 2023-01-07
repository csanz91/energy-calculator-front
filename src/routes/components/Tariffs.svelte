<script>
	import SvelteTable from 'svelte-table';

	export let tariffsData;

	const rows = tariffsData;
	const columns = [
		{
			key: 'name',
			title: 'Tarifa',
			value: (v) => v.name
		},
		{
			key: 'energy_cost_p1',
			title: 'Coste Energia Periodo 1 (€/kWh)',
			value: (v) => v.energy_cost_p1
		},
		{
			key: 'energy_cost_p2',
			title: 'Coste Energia Periodo 2 (€/kWh)',
			value: (v) => v.energy_cost_p2
		},
		{
			key: 'energy_cost_p3',
			title: 'Coste Energia Periodo 3 (€/kWh)',
			value: (v) => v.energy_cost_p3,
			class: 'text-center'
		},
		{
			key: 'power_cost_p1',
			title: 'Coste Potencia Periodo 1 (€/kW/dia)',
			value: (v) => v.power_cost_p1
		},
		{
			key: 'power_cost_p2',
			title: 'Coste Potencia Periodo 2 (€/kW/dia)',
			value: (v) => v.power_cost_p2
		},
		{
			key: 'rd_10_included',
			title: 'Compensacion Gas Incluido',
			value: (v) => v.rd_10_included,
			renderValue: (v) => (v.rd_10_included ? 'SI' : 'NO')
		}
	];
</script>

<link
	href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
	rel="stylesheet"
	integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
	crossorigin="anonymous"
/>

<SvelteTable
	{columns}
	{rows}
	classNameTable={['table table-striped']}
	classNameThead={['table-primary']}
	classNameSelect={['custom-select']}
/>
