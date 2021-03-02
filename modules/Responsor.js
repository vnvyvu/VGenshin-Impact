let {Discord, Responsor} = require('../global.js');
module.exports = {
    character: async function(msg, g, result) {
        let data=result.data, embeds=[];
        for (let skill of data.skillTalents) {
            embeds.push(skillTalentEmbed(skill));
        }
        embeds.push(passiveTalentsEmbed(data.passiveTalents, g));
        embeds.push(constellationsEmbed(data.constellations, g));
        new Responsor.Embeds()
        //default
        .setAuthorizedUsers([msg.author.id])
        .setChannel(msg.channel)
        //import data
        .setArray(embeds)
        //.attachFiles('./assets/images/characters/'+data.name.toLowerCase()+'/icon.png')
        .setThumbnail('https://api.genshin.dev/characters/'+data.fileName+'/portrait.png')
        .setImage('https://api.genshin.dev/characters/'+data.fileName+'/icon.png')
        .setTitle(data.name.toUpperCase())
        .setDescription(data.description)
        .setFooter('@VyVu | Made in Teyvat', 'https://upload-os-bbs.hoyolab.com/upload/2020/10/05/37506120/b50e32624ab513812d97d6dea7b478ec_3772599663477054535.gif')
        .setTimestamp()
        .setClientAssets({prompt: lang[12][g.language]})
        .setColor(color[data.vision])
        /*.addFields(
            {name: lang[1][g.language], value: icon[data.vision]||'---', inline: true},
            {name: lang[2][g.language], value: data.weapon||'---', inline: true},
            {name: lang[3][g.language], value: data.rarity?':star:'.repeat(data.rarity):'---', inline: true},
            {name: lang[4][g.language], value: data.nation||'---', inline: true},
            {name: lang[5][g.language], value: data.affiliation||'---', inline: true},
            {name: lang[6][g.language], value: data.gender||'---', inline: true},
            {name: lang[7][g.language], value: data.constellation||'---', inline: true},
            {name: lang[8][g.language], value: data.birthday||'---', inline: true},
            {name: lang[9][g.language], value: data.specialDish||'---', inline: true},
        )*/
        .addField(lang[1][g.language], icon[data.vision]||'---', true)
        .addField(lang[2][g.language], icon[data.weapon]||'---', true)
        .addField(lang[3][g.language], data.rarity?':star:'.repeat(data.rarity):'---', true)
        .addField(lang[4][g.language], data.nation||'---', true)
        .addField(lang[5][g.language], data.affiliation||'---', true)
        .addField(lang[6][g.language], data.gender||'---', true)
        .addField(lang[7][g.language], data.constellation||'---', true)
        .addField(lang[8][g.language], data.birthday||'---', true)
        .addField(lang[9][g.language], data.body||'---', true)
        .build();
    },
    artifact: async function(msg, g, result){
        let data=result.data;
        let embed=new Discord.MessageEmbed()
        .setColor('#'+Math.floor(Math.random()*16777215).toString(16))
        .setThumbnail('https://api.genshin.dev/artifacts/'+data.fileName+'/flower-of-life.png')
        .setTitle(data.name)
        .setDescription(lang[13][g.language]+': '+':star:'.repeat(data['max_rarity']))
        .setFooter('@VyVu | Made in Teyvat', 'https://upload-os-bbs.hoyolab.com/upload/2020/10/05/37506120/b50e32624ab513812d97d6dea7b478ec_3772599663477054535.gif')
        .setTimestamp();
        if(data['1-piece_bonus']) embed.addField(lang[14][g.language][0], data['1-piece_bonus'])
        if(data['2-piece_bonus']) embed.addField(lang[14][g.language][1], data['2-piece_bonus'])
        if(data['4-piece_bonus']) embed.addField(lang[14][g.language][2], data['4-piece_bonus'])
        msg.channel.send(embed);
    },
    send: async function(msg, g, result){
        msg.channel.send(new Discord.MessageEmbed()
        .setColor(color[result.type])
        .setTitle(result.type.toUpperCase())
        .setDescription(result.data)
        .setFooter('@VyVu | Made in Teyvat', 'https://upload-os-bbs.hoyolab.com/upload/2020/10/05/37506120/b50e32624ab513812d97d6dea7b478ec_3772599663477054535.gif')
        .setTimestamp()
        );
    }
}
let color={
    "Hỏa": 0xff5c33,
    "Lôi": 0xd633ff,
    "Phong": 0x00ffff,
    "Nham": 0xffb31a,
    "Thảo": 0x1aff1a,
    "Băng": 0xccffff,
    "Thủy": 0x3399ff,
    //
    "Pyro": 0xff5c33,
    "Electro": 0xd633ff,
    "Anemo": 0x00ffff,
    "Geo": 0xffb31a,
    "Dendro": 0x1aff1a,
    "Cryo": 0xccffff,
    "Hydro": 0x3399ff,
    //
    "info": 0x83B8FC,
    "warn": 0xFCED83,
    "error": 0xFC8383,
    "success": 0xA6FC83,
    "help": 0xb8d5fc
};
let icon={
    "Hỏa": '<:pyro:815209454621425674>',
    "Lôi": '<:electro:815209390054309901>',
    "Phong": '<:anemo:815209321868558336>',
    "Nham": '<:geo:815209413916098571>',
    "Thảo": '<:dendro:815209366939893790>',
    "Băng": '<:cryo:815209346291466241>',
    "Thủy": '<:hydro:815209433708888065>',
    //
    "Pyro": '<:pyro:815209454621425674>',
    "Electro": '<:electro:815209390054309901>',
    "Anemo": '<:anemo:815209321868558336>',
    "Geo": '<:geo:815209413916098571>',
    "Dendro": '<:dendro:815209366939893790>',
    "Cryo": '<:cryo:815209346291466241>',
    "Hydro": '<:hydro:815209433708888065>',
    //
    "Kiếm Đơn": '<:sword:815237469381066773>',
    "Thương": '<:polearm:815238147892969482>',
    "Trọng Kiếm": '<:claymore:815237958755680337>',
    "Pháp Khí": '<:catalyst:815237634120351744>',
    "Cung": '<:bow:815237237578661888>',
    //
    "Sword": '<:sword:815237469381066773>',
    "Polearm": '<:polearm:815238147892969482>',
    "Claymore": '<:claymore:815237958755680337>',
    "Catalyst": '<:catalyst:815237634120351744>',
    "Bow": '<:bow:815237237578661888>',
};
let lang=[
    {
        "vi": "Điều kiện mở khóa",
        "en": "Requirement"
    },
    {
        "vi": "Hệ",
        "en": "Vision"
    },
    {
        "vi": "Vũ khí",
        "en": "Weapon"
    },
    {
        "vi": "Độ hiếm",
        "en": "Rarity"
    },
    {
        "vi": "Nguồn gốc",
        "en": "Nation"
    },
    {
        "vi": "Tổ chức",
        "en": "Affiliation"
    },
    {
        "vi": "Giới tính",
        "en": "Gender"
    },
    {
        "vi": "Chòm sao",
        "en": "Constellation"
    },
    {
        "vi": "Sinh nhật",
        "en": "Birthday"
    },
    {
        "vi": "Ngoại hình",
        "en": "Body"
    },
    {
        "vi": "Kỹ năng bị động",
        "en": "Passive skills"
    },
    {
        "vi": "Cung Mệnh",
        "en": "Constellations"
    },
    {
        "vi": "{{user}}, Nhập trang bạn muốn tới, hoặc `cancel` hoặc `0` để hủy.",
        "en": "{{user}}, Input page's index to jump, or `cancel` or `0` to cancel."
    },
    {
        "vi": "Độ hiếm cao nhất",
        "en": "Max Rarity"
    },
    {
        "vi": ["Hiệu quả bộ 1 món", "Hiệu quả bộ 2 món", "Hiệu quả bộ 4 món"],
        "en": ["1-Piece Bonus", "2-Piece Bonus", "4-Piece Bonus"]
    },
    
];
function skillTalentEmbed(skill){
    return new Discord.MessageEmbed().addField(skill.unlock+'-'+skill.name, '*'+skill.description+'*\n-----------------------------------------\n:small_blue_diamond: '+(skill.upgrades?skill.upgrades.map(v=>v.name+': '+v.value).join('\n:small_blue_diamond: '):''));
}
function passiveTalentsEmbed(passives, g){
    let map=passives.map(v=>'**'+v.name+'**\n*'+v.description+'*\n'+lang[0][g.language]+': '+v.unlock).join('\n\n');
    return new Discord.MessageEmbed().addField(lang[10][g.language], map);
}
function constellationsEmbed(constellations, g){
    let map=constellations.map(v=>'**'+v.name+'-'+v.unlock+'**\n*'+v.description+'*').join('\n\n');
    return new Discord.MessageEmbed().addField(lang[11][g.language], map);
}