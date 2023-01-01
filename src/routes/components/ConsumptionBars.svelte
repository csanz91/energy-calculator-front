<script>
	import { Bar } from 'svelte-chartjs';
	import {
		p1_color,
		p1_color_opaque,
		p2_color,
		p2_color_opaque,
		p3_color,
		p3_color_opaque
	} from '../constants';
	import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

	Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

	export let consumption_p1 = [];
	export let consumption_p2 = [];
	export let consumption_p3 = [];
	export let labels = [];

	const unit = 'kWh';

	const data = {
		labels: labels,
		datasets: [
			{
				label: 'Energia Periodo 1',
				data: consumption_p1,
				backgroundColor: [p1_color],
				borderWidth: 2,
				borderColor: [p1_color_opaque]
			},
			{
				label: 'Energia Periodo 2',
				data: consumption_p2,
				backgroundColor: [p2_color],
				borderWidth: 2,
				borderColor: [p2_color_opaque]
			},
			{
				label: 'Energia Periodo 3',
				data: consumption_p3,
				backgroundColor: [p3_color],
				borderWidth: 2,
				borderColor: [p3_color_opaque]
			}
		]
	};
</script>

<h1>Consumo</h1>
<Bar
	{data}
	options={{
		responsive: true,
		scales: {
			x: {
				stacked: true
			},
			y: {
				stacked: true
			}
		},
		plugins: {
			tooltip: {
				callbacks: {
					label: function (context) {
						let label = context.dataset.label || '';
						let value = context.parsed.y.toFixed(2) || '';
						return `${label}: ${value} ${unit}`;
					}
				}
			}
		}
	}}
/>
