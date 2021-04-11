module.exports={
    description: "",
    usage: "channel [farming, event]",
    delay: 5000,
    op: true,
    alias: [],
    execute: async function(msg, args, guild) {
        if(args[0]!==undefined){
            switch (args[0].toLowerCase()) {
                case 'farming':
                    guild.set({farmingChannelID: msg.channel.id});
                    break;
                case 'event':
                    guild.set({eventChannelID: msg.channel.id});
                    break;
                default:
                    return {
                        data: 'Usage: `'+guild.prefix+this.usage+'`',
                        type: 'info'
                    };
            }
            await guild.save();
            return {
                data: args[0].charAt(0).toUpperCase()+args[0].slice(1)+' channel has been changed to `'+msg.channel+'`',
                type: 'success'
            };
        }else return {
            data: 'Usage: `'+guild.prefix+this.usage+'`',
            type: 'info'
        };
    }
}