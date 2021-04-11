let DataTracer = require('../modules/DataTracer.js');
module.exports={
    description: "Get character's information",
    usage: "character {a hint string}",
    delay: 5000,
    op: false,
    alias: ['nv', 'char'],
    execute: async function(msg, args, guild) {
        if(args[0]!==undefined){
            let result=await DataTracer.readCharacter(args[0], guild.language);
            if(result) return {
                data: result,
                type: 'character'
            }
            return {
                data: 'Sorry, I couldn\'t find any match `'+args[0]+'`',
                type: 'warn'
            }
        }else return {
            data: 'Usage: '+guild.prefix+this.usage,
            type: 'info'
        };
    }
}