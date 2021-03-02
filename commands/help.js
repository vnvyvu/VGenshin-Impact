let {bot} = require('../global.js');
module.exports={
    description: "Guide to use this bot",
    usage: "help",
    delay: 5000,
    op: false,
    alias: [],
    execute: async function(msg, args, guild) {
        /*if(args[0]!==undefined){
            let cmd=bot.commands.get(args[0]);
            return {
                data: '*'+cmd.description+'*\n'+'Usage: '+guild.prefix+cmd.usage,
                type: args[0]+' command'
            };
        }else */return {
            data: bot.commands.map((cmd, cmdName)=>'**'+cmdName+'-'+cmd.description+'**\n`json\n'+'Usage: '+guild.prefix+cmd.usage+'`').join('\n'),
            type: 'help'
        };
    }
}