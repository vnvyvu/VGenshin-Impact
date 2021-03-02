let lang=['vi', 'en'];
module.exports={
    description: "Set your language",
    usage: "language [region:{vi, en}]",
    delay: 5000,
    op: true,
    alias: ['lang'],
    execute: async function(msg, args, guild) {
        if(args[0]!==undefined){
            if(!lang.includes(args[0])) return {
                data: 'Sorry! Your language is not supported, please set another language',
                type: 'warn'
            }
            guild.set({language: args[0]});
            await guild.save();
            return {
                data: 'Language has been changed to `'+args[0]+'`',
                type: 'success'
            };
        }else return {
            data:'Usage: '+guild.prefix+this.usage,
            type: 'info'
        };
    }
}