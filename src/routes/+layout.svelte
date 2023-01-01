<script>
	import './styles.css';
</script>

<div class="app">
	<main>
		<slot />
	</main>

	<footer>
		<div>
			Cesar Sanz Martinez - <a href="mailto:cesarsanz91@gmail.com">cesarsanz91@gmail.com</a> - 2023
		</div>
		<div>
			Visita <a href="https://github.com/csanz91/energy-calculator-front">Github Frontend</a> para obtener
			el codigo fuente de esta pagina
		</div>
		<div>
			Visita <a href="https://github.com/csanz91/energy-calculator-api">Github API</a> para obtener el
			codigo fuente del backend
		</div>
	</footer>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
