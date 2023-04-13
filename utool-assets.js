const fs = require('fs')
for(let source of ['plugin.json', 'preload.js'])
{
    let target = './dist/' + source
    if(fs.existsSync(target)) fs.rmSync(target)
    fs.copyFileSync(source, target)
}
