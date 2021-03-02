module.exports={
    description: "Set your language",
    usage: "language [region:{vn, en}]",
    delay: 5000,
    op: true,
    alias: ['lang'],
    execute: async function(msg, args, guild) {
        if(args[0]!==undefined){
            guild.set({language: args[0]});
            await guild.save();
            return {
                data: 'Language has been changed to '+args[0],
                type: 'success'
            };
        }else return {
            data:'Usage: '+guild.prefix+this.usage,
            type: 'info'
        };
    }
}