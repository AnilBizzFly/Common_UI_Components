import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
let bad=0, n=0;
for(const cat of ['buttons','forms','cards','text']){
  for(const f of fs.readdirSync(cat).filter(x=>x.endsWith('.html'))){
    const html=fs.readFileSync(path.join(cat,f),'utf8');
    const m=html.match(/<script>([\s\S]*?)<\/script>/);
    if(!m){ if(f!=='index.html'){ console.log('NO SCRIPT '+cat+'/'+f); } continue; }
    n++;
    try{ new vm.Script(m[1]); }
    catch(e){ bad++; console.log('SYNTAX  '+cat+'/'+f+' :: '+e.message); }
    // crude sanity: every getElementById target should exist in the markup
    const ids=[...m[1].matchAll(/\$\('([\w-]+)'\)/g)].map(x=>x[1]);
    for(const id of new Set(ids)){
      if(!html.includes('id="'+id+'"')){ bad++; console.log('MISSING ID '+cat+'/'+f+' :: #'+id); }
    }
  }
}
console.log((n)+' scripts parsed, '+bad+' problems');
