const express = require('express')
const { Nuxt, Builder } = require('nuxt')
const app = express()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000
const bodyParser = require('body-parser');
const axios = require('axios');
const fs = require('fs');
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

async function press(mark) {
	try {
		console.log('fetching asset srcs...')
		let mime = ['.png','.jpg','.gif','.svg','.css','.js']
		let clean = []
		for (const dirty of urls(mark)) {
			let url = prep(dirty).split('?')[0]
			let ext = path.extname(url)
			let test = parseurl.parse(url)
			if(mime.includes(ext) && !url.includes('typekit')) {
		      		let { data } = await axios.get(url,{responseType:"arraybuffer"})
				let name = path.basename(url)
				let parsed = path.parse(url)
				if(name.includes('slick')) {
					url = url.replace('http:','')
				}
				mark = mark.replace(url,'../static/'+parsed.base)
				
				fs.writeFile('static/'+name,data,function(err){
				        if(err)
						console.log(err)
				})
			}
		}
		const $ = cheerio.load(mark)
		$('a').each(function(){
			let org = $(this).attr('href')
			if(typeof org != 'undefined') {
				let href = parseurl.parse($(this).attr('href')).path
				let test = parseurl.parse($(this).attr('href'))
				if(href!==null) {
					href = href.replace(/^\/|\/$/g, '')
					href = href + ".html"
					let tag = $.html($(this))
					let fix = tag.replace(org,href)
					mark = mark.replace(tag,fix)
				}
			}

		})
		console.log('mark')
		return mark
	  } catch(err) {
	  	console.log('server');
	  	console.log(err);
	  }
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
	  let thepath = 'scrapes/'+base+'.html'
	  if(base=='/')
		  base='index'
	  let { data } = await axios.get(page)
	  let mark = await press(data)
	  console.log('write:' + base)
	  //let dirs = parsed.path.slice(1,-1)
	  //base = dirs.pop()
	  //console.log(dirs)
	  //.replace(/\//g,'-')
	  let dir = path.parse(thepath).dir
	  if(!fs.existsSync(dir))
		  fs.mkdirSync(dir)
	  console.log(dir)
	  fs.writeFileSync(thepath,mark);
	  res.send('done');
	  
  });
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}
start()
