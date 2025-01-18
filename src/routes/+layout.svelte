<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

{@render children()}

<style>
	@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');

	:global(body) {
		font-family: 'Outfit', sans-serif;
		background-color: #090909;
		color: #fff;
	}
</style>