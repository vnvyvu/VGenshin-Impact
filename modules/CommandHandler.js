let {bot, Discord, fs}=require('../global.js');
let delayList=new Discord.Collection(), TimeDiff=require('diff-in-time');
module.exports = {
    load: async function(){
        //Init new map storage commands, alias
        bot.commands=new Discord.Collection();
        bot.alias=new Discord.Collection();
        //Read commands folder and get all file in
        files=fs.readdirSync('./commands/').filter(f=>f.endsWith('.js'));
        for (const f of files) {
            let key=f.split('.js')[0], value=require('../commands/'+f);
            bot.commands.set(key, value);
            value.alias.forEach(v=>{
                bot.alias.set(v, key);
            });
        }
        return bot;
    },
    exe: async function(msg, command, guild) {
        //Check alias and mapping
        if(bot.alias.has(command.command)) command.command=await bot.alias.get(command.command);
        //Get command and args
        let now=new Date(), args=command.args;
        command=await bot.commands.get(command.command);
        //command not found
        if(command==undefined) return {
            data: 'This command does not exist!',
            type: 'error'
        };
        //user cant use special commands, admin only
        if(!msg.member.hasPermission('ADMINISTRATOR')&&command.op) return {
            data: 'You dont have permission!',
            type: 'warn'
        };
        //delay processing
        if(delayList.has(msg.author.id)){
            if(delayList.get(msg.author.id)>=now){
                return {
                    data: 'You need to wait for '+TimeDiff.getDiffInSeconds({
                        firstTime: delayList.get(msg.author.id), 
                        secondTime: now
                    })+' seconds!',
                    type: 'warn'
                };
            }else delayList.delete(msg.author.id);
        }else {
            now.setMilliseconds(now.getMilliseconds()+command.delay);
            delayList.set(msg.author.id, now);
        }
        return command.execute(msg, args, guild);
    },
}