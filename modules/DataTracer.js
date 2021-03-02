let {fs} = require('../global.js');
let dir='./assets/data/';
let categories=fs.readdirSync(dir, {withFileTypes: true}).filter(dirent => dirent.isDirectory()).map(dirent=>dirent.name);
function search(str, strs){
    return strs.filter(s=>s.includes(str))[0];
}
module.exports={
    read: async function(category, item, lang){
        //search category and item
        category=await search(category, categories);
        let items=fs.readdirSync(dir+category+'/', {withFileTypes: true}).map(dirent=>dirent.name);
        item=await search(item, items);
        
        //return object
        let path=dir+category+'/'+item+'/'+lang+'.json';
        if(fs.existsSync(path)) return JSON.parse(fs.readFileSync(path));
        return null;
    },
};