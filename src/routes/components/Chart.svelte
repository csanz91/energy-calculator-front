<script>
	import { Pie } from 'svelte-chartjs';
	import {
		p1_color,
		p1_color_opaque,
		p2_color,
		p2_color_opaque,
		p3_color,
		p3_color_opaque
	} from '../constants';
	import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

	export let consumption_p1 = 0.0;
	export let consumption_p2 = 0.0;
	export let consumption_p3 = 0.0;

	const data = {
		labels: ['Energia P1', 'Energia P2', 'Energia P3'],
		datasets: [
			{
				data: [consumption_p1, consumption_p2, consumption_p3],
				backgroundColor: [p1_color_opaque, p2_color_opaque, p3_color_opaque],
				hoverBackgroundColor: [p1_color, p2_color, p3_color]
			}
		]
	};
</script>

<h1>Distribucion del consumo</h1>
<Pie
	{data}
	options={{
		responsive: true,
		radius: '90%',
		aspectRatio: 2,
		plugins: {
			legend: {
				display: true,
				labels: {
					generateLabels(chart) {
						const data = chart.data;
						if (data.labels.length && data.datasets.length) {
							const {
								labels: { pointStyle }
							} = chart.legend.options;

							return data.labels.map((label, i) => {
								const meta = chart.getDatasetMeta(0);
								const style = meta.controller.getStyle(i);
								const value = data['datasets'][0].data[i];
								const total = data['datasets'][0].data.reduce((a, b) => a + b, 0);
								const per = (value / total) * 100;

								return {
									text: `${label}: ${value.toFixed(1)} Kw/h - ${per.toFixed(1)}%`,
									fillStyle: style.backgroundColor,
									strokeStyle: style.borderColor,
									lineWidth: style.borderWidth,
									pointStyle: pointStyle,
									hidden: !chart.getDataVisibility(i),

									// Extra data used for toggling the correct item
									index: i
								};
							});
						}
						return [];
					}
				}
			},
			tooltip: {
				callbacks: {
					label: function (context) {
						let label = context.dataset.label || '';
						let value = context.parsed;
						const total = context.dataset.data.reduce((a, b) => a + b, 0);
						const per = (value / total) * 100;
						return `${label}: ${per.toFixed(1)} %`;
					}
				}
			}
		}
	}}
/>
