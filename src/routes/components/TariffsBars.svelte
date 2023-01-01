<script>
	import { Bar } from 'svelte-chartjs';
	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
	import { green, blue, orange, red } from '../constants';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	export let tariffs = [];
	export let label = '';

	const unit = '€';

	const data = {
		labels: tariffs.map((tariff) => tariff.name),
		datasets: [
			{
				label: 'Coste',
				data: tariffs.map((tariff) => tariff.tariff_cost),
				cost_diff: tariffs.map((tariff) => tariff.tariff_cost_diff)
			}
		]
	};
	function colorize() {
		return (context) => {
			let cost_diff = context.dataset.cost_diff[context.dataIndex];
			const c = cost_diff < 2 ? green : cost_diff < 5 ? blue : cost_diff < 10 ? orange : red;
			return c;
		};
	}
</script>

<h1>{label}</h1>
<Bar
	{data}
	options={{
		responsive: true,
		scales: {
			x: {
				stacked: true
			},
			y: {
				title: {
					display: true,
					text: `Coste (${unit})`
				}
			}
		},
		elements: {
			bar: {
				backgroundColor: colorize(),
				borderColor: colorize(),
				borderWidth: 2
			}
		},
		plugins: {
			legend: {
				display: false
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						let label = context.dataset.label || '';
						let value = context.parsed.y.toFixed(2) || '';
						let cost_diff = context.dataset.cost_diff[context.dataIndex].toFixed(2) || '';

						return `${label}: ${value} ${unit} (+${cost_diff}${unit})`;
					}
				}
			}
		}
	}}
/>
