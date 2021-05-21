let DataTracer = require('../modules/DataTracer.js');
module.exports={
    description: "Get weapon's information",
    usage: "weapon {a hint string}",
    delay: 5000,
    op: false,
    alias: ['w', 'vk'],
    execute: async function(msg, args, guild) {
        if(args[0]!==undefined){
            //join args to be a String, as a queryString
            args=args.join(' ');
            let result=await DataTracer.readWeapon(args, guild.language);
            if(result) return {
                data: result,
                type: 'weapon'
            }
            return {
                data: 'Sorry, I couldn\'t find any match `'+args+'`',
                type: 'warn'
            }
        }else return {
            data: 'Usage: '+guild.prefix+this.usage,
            type: 'info'
        };
    }
}