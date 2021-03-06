const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('mz/fs');
const path = require('path');
const urls = require('get-urls');
const strip = require('striptags');
const cheerio = require('cheerio')
const nospec = function(string) {
	return string.replace(/[<>'"();]/gi, '');
}
const prep = function(url) {
	return nospec(strip(decodeURI(url)));
}
const parseurl = require('url')

app.use(bodyParser.json())
app.set('port', port)

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')


async function temp(mark) {
	const $ = cheerio.load(mark)
	try {
		let deps = []
		$('script').each(async function(){
			let src = $(this).attr('src')
			$(this).remove()
			if(typeof src != 'undefined') {
				try {
					let name = path.basename(src).split('?')[0]
					deps.push({src:name})
					let { data } = await axios.get(src,{responseType:"arraybuffer"})
					fs.writeFile(path.join('static',name),data,function(err){
						if(err)
							console.log('err')
					})
				} catch(err) {
					//console.log(err)
				}
			}
		})
		$('img').each(async function(){
			let src = $(this).attr('src')
			if(typeof src != 'undefined') {
				let name = path.basename(src).split('?')[0]
				//let newsrc = path.join(appdir,'static',name)
				let newsrc = name
				$(this).attr('src',newsrc)
				try {
					let { data } = await axios.get(src,{responseType:"arraybuffer"})
					fs.writeFile(path.join('static',name),data,function(err){
						if(err)
							console.log('err')
					})
				} catch(err) {
					console.log(err)
				}
			}
		})
		$('link').each(async function(){
			let href = $(this).attr('href').split('?')[0]
			let base = path.basename(href)
			//let newhref = path.join(appdir,'static',base)
			let newhref = base
			$(this).attr('href',newhref)
			if(path.parse(href).ext=='.css' && href.includes('http')) {
				try {
					let { data } = await axios.get(href)
					fs.writeFile(path.join('static',base),data,function(err){
						if(err)
							console.log('err')
					})
				} catch(err) {
					console.log(err)
				}
			}
		})
		$('[style*="background"]').each(async function(){
			//var reg = new RegExp("url("+"(.*)"+")")
			//let url = $(this).attr('style').match(reg)[1].slice(1,-2)
			let url = Array.from(urls($(this).attr('style')))[0]
			url = nospec(url)
			let name = path.basename(url)
			//let newsrc = path.join(appdir,'static',name)
			let newsrc = name
			let regurl = new RegExp(url)
			let style = $(this).attr('style')
			if(style!=null) {
				let newstyle = style.replace(regurl,newsrc)
				$(this).attr('style',newstyle)
			}
			try {
				let { data } = await axios.get(url,{responseType:"arraybuffer"})
				fs.writeFile(path.join('static',name),data,'binary',function(err){
					if(err)
						console.log('err')
				})
			} catch(err) {
				console.log(err)
			}
		})
		$('a').each(function(){
			let href = $(this).attr('href')
			let newpath = parseurl.parse(href).path
			if(newpath!==null) {
				if(newpath.length==1)
					newpath = 'index/'
				//newpath = path.join(appdir,'scrapes',newpath).slice(0,-1)+'.html'
				newpath = newpath.slice(0,-1)+'.html'
				$(this).attr('href',newpath)
			}
		})
	} catch(err) {
		console.log(err)
	}
	return $('body')

}


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


async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }
  app.post('/crawl/',async function(req,res,next) {
	let sites = await crawl(req.body.page)
	res.send(sites)
  })

  // Give nuxt middleware to express
  app.post('/scrape/',async function(req,res,next){
	  let page = req.body.page
	  let parsed = parseurl.parse(page)
	  let base = parsed.pathname
	  base = base.slice(1,-1)
	  if(!base)
		  base='index'
	  let thepath = 'pages/'+base+'.vue'
	  if(base=='/')
		  base='index'
	  let { data } = await axios.get(page)
	  let mark = await temp(data)
	  console.log('write:' + base)
	  let dir = path.parse(thepath).dir
	  try {
	  	let plate = await fs.readFile(path.join(__dirname,'temp.vue'),'utf-8')
	  	console.log(plate)
	  	const $ = cheerio.load(plate,{xmlMode:true})
	  	$('#scrape').html(mark)
	  	fs.writeFile(thepath,$.html(),'utf-8',err=>{
	  	        if(err) {
	  	      	  fs.mkdir(dir,err=>{
	  	      		  console.log(err)
	  	      	  })
	  	        }
	  	})
	  } catch(err) {
		console.log(err)
	  }
  })
  app.get('/css',async function(req,res,next){
  	let css = [];
  	let js = JSON.parse(await lfs.readFile('deps.txt','utf8'))
  	await fs.readdir('./static/').forEach(file=>{
  		ext = path.extname(file);
  		if(ext=='.css')
  			css.push(file);
  	});
  	let data = {
  		css: css,
  		js: js
  	}
  	res.send(JSON.stringify(data));
  })
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}
start()
