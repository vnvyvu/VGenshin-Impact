module.exports={
    'getParameters': async function(prefix, msg) {
        //standardized
        let message=msg.content.trim().toLowerCase();
        //check prefix
        if(message.startsWith(prefix)){
            //split to get args
            let args = message.replace(prefix, '').split(' ');
            return {
                command: args.shift(),
                args: args||[]
            };
        }else return null;
    },
    'isValidChannel': async function(channels, msg) {
        if(channels.includes(msg.channel.id)) return true;
        else return false;
    }

}