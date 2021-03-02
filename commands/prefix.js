module.exports={
    description: "Change bot's prefix",
    usage: "prefix [newPrefix]",
    delay: 10000,
    op: true,
    alias: [],
    execute: async function(msg, args, guild) {
        if(args[0]!==undefined){
            guild.set({prefix: args[0]});
            await guild.save();
            return {
                data: 'Prefix has been changed to '+args[0],
                type: 'success'
            };
        }else return {
            data:'Usage: '+guild.prefix+this.usage,
            type: 'info'
        };
    }
}