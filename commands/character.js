let DataTracer = require('../modules/DataTracer.js');
module.exports={
    description: "Get character's information",
    usage: "character [characterName]",
    delay: 5000,
    op: false,
    alias: ['nv', 'char'],
    execute: async function(msg, args, guild) {
        if(args[0]!==undefined){
            return {
                data: await DataTracer.read('characters', args[0], guild.language),
                type: 'character'
            };
        }else return {
            data: 'Usage: '+guild.prefix+this.usage,
            type: 'info'
        };
    }
}