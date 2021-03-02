this.Discord=require('discord.js-light');
this.bot=new this.Discord.Client({cacheGuilds: true, cacheChannels: true, cacheRoles: true});
this.fs=require('fs');
this.CommandHandler=require('./modules/CommandHandler.js');
this.CommandMatcher=require('./modules/CommandMatcher.js');
this.Responsor = require('discord-paginationembed');

module.exports = this;