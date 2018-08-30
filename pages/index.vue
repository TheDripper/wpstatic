<template>
<div id=press>
	<input id=site type=text />
	<button v-on:click='press'>Press</button>
</div>
</template>
<script>
let axios = require('axios');    
let getUrls = require('get-urls');
let path = require('path');
let sanitize = require('sanitize-filename');
let strip = require('striptags');
let cheerio = require('cheerio');
const nospec = function(string) {
	return string.replace(/[<>'"();]/gi, '');
}
const prep = function(url) {
	return nospec(strip(decodeURI(url)));
}
const getFiles = async function(data,type) {
	//let { data } = await axios.get(url);
	let matches = data.match(/\bhttps?:\/\/\S+/gi);
	let clean = [];
	console.log('getfiles')
	matches.forEach(url=>{
		url = prep(url).split('?')[0];
		let ext = path.extname(url);
		let imgMime = ['.jpg','.png','.gif','.svg'];
		if(type=='all'||type=='image'&&imgMime.includes(ext)||type=='script'&&ext=='.js')
			clean.push(prep(url));
	});
	return clean;
}
const fixPath = function(url) {
	let parsed = path.parse(url);
	return url.replace(parsed.dir+'/'+parsed.base,parsed.base);
}
export default {
	methods: {
		press: async function() {
			//let sets = await axios.get('http://localhost:3000/css');
			//sets = sets.data;
			//context.store.commit('loadStyles',sets.css)
			//context.store.commit('loadScripts',sets.js)
			//console.log("TODAY")
			//let page = context.params.page;
			console.log('hit it');
			let page = document.querySelector('#site').value;
			let { data } = await axios.post('/scrape',{page:page});
			console.log(data);
		}
	}
}
</script>
<style>
</style>
