module.exports={
    description: "Add farming target (Coding...)",
    usage: "farming [character, weapon] {a hint string}",
    delay: 10000,
    op: false,
    alias: [],
    execute: async function(msg, args, guild) {
        /*if(args[0]!==undefined){
            guild.set({prefix: args[0]});
            await guild.save();
            return {
                data: 'Prefix changed to '+args[0],
                type: 'success'
            };
        }else*/ return {
            data: 'Usage: `'+guild.prefix+this.usage+'`',
            type: 'info'
        };
    }
}