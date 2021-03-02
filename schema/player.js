this.mongoose=require('mongoose');
const playerSchema=new this.mongoose.Schema({
    _id: {
        type: String,
        required: true,
    },
    characters: {
        type: [],
    },
    weapons: {
        type: [],
    },
});
module.exports = this.mongoose.model('player', playerSchema);
