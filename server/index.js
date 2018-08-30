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
const nospec = function(string) {
	return string.replace(/[<>'"();]/gi, '');
}
const prep = function(url) {
	return nospec(strip(decodeURI(url)));
}
const url = require('url');

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
			if(mime.includes(ext) && !url.includes('typekit')) {
		      		let { data } = await axios.get(url,{responseType:"arraybuffer"})
				let name = path.basename(url)
				let parsed = path.parse(url)
				if(name.includes('slick')) {
					url = url.replace('http:','')
				}
				//let fix = url.replace(parsed.dir+'/'+parsed.base,'./static/'+parsed.base)
			      	//clean.push({dirty:url,clean:fix})
				mark = mark.replace(url,'../static/'+parsed.base)
				fs.writeFile('static/'+name,data,function(err){
				        if(err)
						console.log(err)
				})
			}
		}
		return mark
	  } catch(err) {
	  	console.log('server');
	  	console.log(err);
	  }
}


async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.post('/scrape/',async function(req,res,next){
	  let page = req.body.page
	  let { data } = await axios.get('http://'+page)
	  let mark = await press(data)
	  fs.writeFileSync('scrapes/test.html',mark);
	  res.send('done');
	  
  });
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}
start()
