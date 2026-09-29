import http from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
import {sendWhatsApp,validateContact} from './whatsapp.mjs';
try{process.loadEnvFile('.env');}catch(error){if(error.code!=='ENOENT')throw error;}
const root=resolve('dist');
const port=Number(process.env.PORT||5174),origin=process.env.APP_ORIGIN||`http://127.0.0.1:${port}`;
const clients=new Map();let hourly={start:Date.now(),count:0};
function limited(ip){const now=Date.now();for(const [key,bucket] of clients)if(now-bucket.start>600000)clients.delete(key);if(now-hourly.start>3600000)hourly={start:now,count:0};const bucket=clients.get(ip)||{start:now,count:0};clients.set(ip,bucket);return ++bucket.count>5||++hourly.count>30;}
function json(res,status,body){res.writeHead(status,{'Content-Type':'application/json','Cache-Control':'no-store'});res.end(JSON.stringify(body));}
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png','.webp':'image/webp','.jpg':'image/jpeg'};
const server=http.createServer(async(req,res)=>{
  res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','strict-origin-when-cross-origin');
  try{
    const pathname=new URL(req.url,'http://localhost').pathname;
    if(pathname==='/api/contact'){
      if(req.method!=='POST'){res.setHeader('Allow','POST');return json(res,405,{error:'Use the contact form.'});}
      if(req.headers.origin!==origin)return json(res,403,{error:'Please submit from the portfolio website.'});
      if(!/^application\/json(?:;|$)/i.test(req.headers['content-type']||''))return json(res,415,{error:'Expected JSON.'});
      // EDIT HINT: Limits are per process. Use a shared limiter for multi-instance production hosting.
      // Do not blindly trust forwarded IP headers; a reverse proxy currently shares the limit.
      if(limited(req.socket.remoteAddress))return json(res,429,{error:'Too many attempts. Please wait ten minutes or email instead.'});
      let size=0;const chunks=[];
      for await(const chunk of req){size+=chunk.length;if(size>10000){json(res,413,{error:'Message is too large.'});req.resume();return;}chunks.push(chunk);}
      let body;try{body=JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{return json(res,400,{error:'Invalid message format.'});}
      const input=validateContact(body);if(!input)return json(res,400,{error:'Please enter your name, valid email, message up to 1,000 characters, and consent.'});
      const result=await sendWhatsApp(input);return json(res,result.status,result.body);
    }
    if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
    const path=decodeURIComponent(pathname),file=resolve(root,'.'+(path==='/'?'/index.html':path));
    if(!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
    const bytes=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream','Cache-Control':'no-cache'});res.end(req.method==='HEAD'?undefined:bytes);
  }catch{if(!res.headersSent){res.writeHead(404);res.end('Not found');}else res.end();}
});
server.requestTimeout=15000;server.headersTimeout=10000;
server.listen(port,process.env.HOST||'127.0.0.1',()=>console.log(`Local: http://127.0.0.1:${port}`));
