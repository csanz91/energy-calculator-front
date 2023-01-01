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
			const min_cost = context.dataset.data[0];
			const cost = context.parsed.y;
			const percentage = ((cost - min_cost) / ((cost + min_cost) / 2)) * 100;
			return percentage < 2 ? green : percentage < 5 ? blue : percentage < 10 ? orange : red;
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
