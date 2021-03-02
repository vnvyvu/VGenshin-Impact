require('dotenv').config();
let {bot, CommandHandler, CommandMatcher} = require('./global.js');
let Responsor = require('./modules/Responsor.js');

async function processing(){
    //load commands and connect db
    bot=await CommandHandler.load();
    await require('mongoose').connect('mongodb+srv://'+process.env.DB_NAME+':'+process.env.DB_SECRET+'@vgenshin.fmhdt.mongodb.net/'+process.env.DB_NAME+'?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true, useFindAndModify: false});
}
processing();

let {Guild} = require('./schema/DAO.js');
//let DataTracer = require('./modules/DataTracer.js');

bot.on('message', async msg => {
    //bot wont work with another or in dm cnannel
    if(msg.author.bot||msg.channel.type=='dm') return;
    //Init guild config
    let g=await Guild.findOne({_id: msg.guild.id});
    //Guild missing in database
    if(g==null) g=await (new Guild({_id: msg.guild.id})).save();
    //Command matcher
    let command = await CommandMatcher.getParameters(g.prefix, msg);
    //not a command
    if(command==null) return;

    let result=await CommandHandler.exe(msg, command, g);
    if(typeof result.data=='string') await Responsor.send(msg, g, result);
    else await Responsor[result.type](msg, g, result);
});

bot.on('guildDelete', async guild =>{
    Guild.findOneAndDelete({_id: guild.id});
})

bot.login(process.env.BOT_TOKEN);