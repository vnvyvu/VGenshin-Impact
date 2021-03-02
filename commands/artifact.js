let DataTracer = require('../modules/DataTracer.js');
module.exports={
    description: "Get artifact's information",
    usage: "artifact [artifactName:n-word]",
    delay: 5000,
    op: false,
    alias: ['art', 'tdv'],
    execute: async function(msg, args, guild) {
        if(args[0]!==undefined){
            args=args.join(' ');
            let result=await DataTracer.read('artifacts', args, guild.language);
            if(result) return {
                data: result,
                type: 'artifact'
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