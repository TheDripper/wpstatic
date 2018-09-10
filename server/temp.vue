<template>
<div id=scrape>
</div>
</template>
<script>
let axios = require('axios')
export default {
	async fetch(context) {
		let sets = await axios.get('http://localhost:3000/css');
		sets = sets.data;
		context.store.commit('loadStyles',sets.css)
		context.store.commit('loadScripts',sets.js)
	},
	head() {
		let styles = this.$store.state.styles;
		let scripts = this.$store.state.scripts;
		let links = [];
		styles.forEach(style=>{
			var sheet = {
				rel: 'stylesheet',
				href: style
			}
			links.push(sheet);
		});
		console.log(links);
		return {
			script: scripts,
			link: links
		}
	}
}
</script>
