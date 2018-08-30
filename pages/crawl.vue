<template>
</template>
<script>
let axios = require('axios')
let cheerio = require('cheerio')
let path = require('path')

function crawl(page) {
		let done = []
		let loadCrawl = async function(page) {
			if(done.includes(page))
				return
			let { data } = await axios.get(page)
			const $ = cheerio.load(data)
			$('a').each(function(){
				let href = $(this).attr('href')
				let parsed = path.parse(href)
				if(parsed.dir.includes('food.berkeley.edu')) {
					done.push(href)
					return loadCrawl(href)
				}
			})
			return done
		}
		return loadCrawl(page)
}

export default {
	async asyncData(context) {
		let done = await crawl('http://food.berkeley.edu')
		console.log(done)
	}
}
</script>
<style>
</style>
