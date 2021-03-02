this.mongoose=require('mongoose');
const guildSchema=new this.mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    prefix: {
        type: String, 
        required: true,
        default: '!'
    },
    language: {
        type: String,
        default: 'en'
    },
    farmingChannelID: {
        type: String,
    },
    eventChannelID:{
        type: String,
    }
});
module.exports = this.mongoose.model('guild', guildSchema);
