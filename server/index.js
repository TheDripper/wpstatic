
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
const cheerio = require('cheerio');
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
	  try {
	  let { data } = await axios('http://'+page);
	  let clean = []
	  let mime = ['.png','.jpg','.gif','.svg','.css','.js']
	  urls(data).forEach(url=>{
	  	url = prep(url).split('?')[0].replace('https','http')
	  	let ext = path.extname(url)
	  	if(mime.includes(ext)) {
	  		clean.push(nospec(decodeURI(strip(url))))
	  	}
	  });
	  let deps = []
	  for (const url of clean) {
	  	let ext = path.extname(url)
	  	let { data } = await axios.get(url,{responseType:"arraybuffer"})
	  	let name = path.basename(url)

	  	let parsed = path.parse(url)
	  	let fix = url.replace(parsed.dir+'/'+parsed.base,parsed.base)
	  	if(ext=='.js')
	  		deps.push({src: fix})
	  	//deps.push({src: nospec(decodeURI(strip(url)))})
	  	fs.writeFile('static/'+name,data,function(err){
          	        if(err)
          	      	  return log.write(err)
          	})
	  }
	  //reqhost = url.parse('http://'+req.params.page+'/').hostname
	  fs.writeFileSync('deps.txt',JSON.stringify(deps))
	  const $ = cheerio.load(data)
	  //$('html').find('script').each(function(){
	  //	$(this).remove()
	  //});
	  data = $('html').html()
	  //let matches = data.match(/\bhttps?:\/\/\S+/gi)
	  //let clean = await getFiles(data,'all')
	  console.log('clean')
	  clean.forEach(async url=>{
	  	url = prep(url).split('?')[0]
	  	let ext = path.extname(url)
	  	let imgMime = ['.jpg','.png','.gif','.svg']
	  	if(imgMime.includes(ext)) {
	  		let parsed = path.parse(url)
	  		data = data.replace(parsed.dir+'/'+parsed.base,parsed.base)
	  	} else if (ext=='.js') {
	  		let parsed = path.parse(url)
	  		//data = data.replace(url,'')
	  	}
	  })
	  //context.store.commit('mark',data)
	  fs.writeFileSync('test.html',data);
	  res.send(data);




	  } catch(err) {
	  	console.log('server');
	  	console.log(err);
	  }
  });
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  console.log('Server listening on http://' + host + ':' + port) // eslint-disable-line no-console
}
start()
