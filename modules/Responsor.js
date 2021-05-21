let {Discord, Responsor, fs} = require('../global.js'), https=require('https');
module.exports = {
    character: async function(msg, g, result) {
        //get data
        let data=result.data[1], langObj=result.data[2];
        fs.writeFileSync('log.json', JSON.stringify(data, null, 2));

        new Responsor.Embeds()
        //default
        .setAuthorizedUsers([msg.author.id])
        .setChannel(msg.channel)
        //import data
        .setArray(characterEmbed(data, g, langObj))
        .setTitle(data["Name"])
        .setImage('https://vnvyvu.github.io/GI_Sprite/character/'+data["Icon"]+'.png')
        .setDescription(data["Description"])
        .setFooter('@VyVu | Made in Teyvat', 'https://upload-os-bbs.hoyolab.com/upload/2020/10/05/37506120/b50e32624ab513812d97d6dea7b478ec_3772599663477054535.gif')
        .setTimestamp()
        .setClientAssets({prompt: lang[2][g.language]})
        .setColor(color[data["AvatarInfoId"]["AvatarVisionBeforTextMapHash"]])
        .build();
    },
    artifact: async function(msg, g, result){
        let data=result.data[1], langObj=result.data[2];
        //fs.writeFileSync('log.json', JSON.stringify(data, null, 2));

        artifactEmbed(data, g, langObj, (embedArr)=>{
            new Responsor.Embeds()
            //default
            .setAuthorizedUsers([msg.author.id])
            .setChannel(msg.channel)
            //import data
            .setArray(embedArr)
            .setTitle(data["NameTextMapHash"])
            .setThumbnail('https://vnvyvu.github.io/GI_Sprite/artifact/'+data["Icon"]+'.png')
            .setDescription(data["DescTextMapHash"])
            .setFooter('@VyVu | Made in Teyvat', 'https://upload-os-bbs.hoyolab.com/upload/2020/10/05/37506120/b50e32624ab513812d97d6dea7b478ec_3772599663477054535.gif')
            .setTimestamp()
            .setClientAssets({prompt: lang[2][g.language]})
            .setColor('#'+Math.floor(Math.random()*16777215).toString(16))
            .addField(langObj[4250824114], data["EquipType"])
            .build();
        });
    },
    weapon: async function(msg, g, result){
        let data=result.data[1], langObj=result.data[2];
        fs.writeFileSync('log.json', JSON.stringify(data, null, 2));

        weaponEmbed(data, g, langObj, (embedArr)=>{
            new Responsor.Embeds()
            //default
            .setAuthorizedUsers([msg.author.id])
            .setChannel(msg.channel)
            //import data
            .setArray(embedArr)
            .setTitle(data["NameTextMapHash"])
            .setThumbnail('https://vnvyvu.github.io/GI_Sprite/weapon/'+data["Icon"]+'.png')
            .setDescription(data["DescTextMapHash"])
            .setFooter('@VyVu | Made in Teyvat', 'https://upload-os-bbs.hoyolab.com/upload/2020/10/05/37506120/b50e32624ab513812d97d6dea7b478ec_3772599663477054535.gif')
            .setTimestamp()
            .setClientAssets({prompt: lang[2][g.language]})
            .setColor('#'+Math.floor(Math.random()*16777215).toString(16))
            .addField(langObj[4250824114], data["EquipType"])
            .build();
        });
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
    "SWORD": '<:sword:815237469381066773>',
    "POLE": '<:polearm:815238147892969482>',
    "CLAYMORE": '<:claymore:815237958755680337>',
    "CATALYST": '<:catalyst:815237634120351744>',
    "BOW": '<:bow:815237237578661888>',
};
let lang={
    0: {
        "vi": "Độ hiếm",
        "en": "Rarity"
    },
    1: {
        "vi": "Xin lỗi, chúng tôi không tìm thấy thông tin này.\nVui lòng chờ, chúng tôi sẽ sớm cập nhật nó",
        "en": "Sorry, we didn't find this information.\nPlease wait, we will update it soon"
    },
    2: {
        "vi": "{{user}}, Nhập trang bạn muốn nhảy đến. Nếu muốn hủy, hãy nhập `cancel` hoặc `0`.",
        "en": "{{user}}, Input page's index to jump, or `cancel` or `0` to cancel."
    },
    3: {
        "vi": "Mục lục",
        "en": "Index"
    },
};
function characterEmbed(data, g, langObj){
    let id=[1171619685, 4260972229, 3626565793];
    return [
        //info
        new Discord.MessageEmbed()
        .addField(langObj[3396004690].toUpperCase(), '\u200B')
        .addField(langObj[2163156502], icon[data["AvatarInfoId"]["AvatarVisionBeforTextMapHash"]]||'---', true)
        .addField(langObj[1681042783], icon[data["WeaponType"]]||'---', true)
        .addField(lang[0][g.language]||lang[0]["en"], data["Rarity"]?':star:'.repeat(data["Rarity"]):'---', true)
        .addField(langObj[1293559686], (data["AvatarInfoId"]["AvatarAssocType"]||'0_1_---').split('_')[2], true)
        .addField(langObj[3888496674], langObj[3766780332]+" "+data["AvatarInfoId"]["InfoBirthDay"]||'---'+" "+langObj[4192225828]+" "+data["AvatarInfoId"]["InfoBirthMonth"]||'---', true)
        .addField(langObj[3374446314], data["AvatarInfoId"]["AvatarNativeTextMapHash"]||'---', true)
        .addField(langObj[334233881], data["AvatarInfoId"]["AvatarConstellationBeforTextMapHash"]||'---', true)
        .addField(langObj[1352082565], [data["AvatarInfoId"]["CvEnglishTextMapHash"]||'---', data["AvatarInfoId"]["CvJapaneseTextMapHash"]||'---', data["AvatarInfoId"]["CvKoreanTextMapHash"]||'---', data["AvatarInfoId"]["CvChineseTextMapHash"]||'---'].join(', ')),
        //abilities
        new Discord.MessageEmbed()
        .addField(langObj[585804532].toUpperCase(), '\u200B')
        .addField(langObj[931326071], Math.round(data["HpBase"])||'---', true)
        .addField(langObj[2334963823], Math.round(data["AttackBase"])||'---', true)
        .addField(langObj[3591287138], Math.round(data["DefenseBase"])||'---', true)
        .addField(langObj[1916797986], (Math.round(data["Critical"]*100)||'---')+'%', true)
        .addField(langObj[4137936461], (Math.round(data["CriticalHurt"]*100)||'---')+'%'),
        //talent normal attack
        ...([data["SkillsId"]["NormalSkill"], data["SkillsId"]["ElementSkill"], data["SkillsId"]["EnergySkill"]].map((obj, i)=>{
            if(!obj) return new Discord.MessageEmbed().addField(langObj[1164736193].toUpperCase(), ':small_blue_diamond:'+langObj[id[i]]).addField('404', lang[1][g.language]||lang[1]['en']);
            return new Discord.MessageEmbed()
            .setThumbnail('https://vnvyvu.github.io/GI_Sprite/characterSkill/'+data["Name"].toLowerCase()+'/'+obj["Icon"]+'.png')
            .addField(langObj[1164736193].toUpperCase(), ':small_blue_diamond:'+langObj[id[i]])
            .addField(obj["NameTextMapHash"].replace(': ', '-')||'---', obj["DescTextMapHash"]||'---')
            .addField(langObj[3977391333], skillDetail(obj["ProudSkillGroupId"]||'---'));
        })),
        //talent passive skill 1
        ...(data["SkillsId"]["InherentProudSkillOpens"]||[]).map((obj, i)=>{
            if(!obj) return new Discord.MessageEmbed().addField(langObj[1164736193].toUpperCase(), ':small_blue_diamond:'+langObj[2537361669]).addField('404', lang[1][g.language]||lang[1]['en']);
            return new Discord.MessageEmbed()
            .setThumbnail('https://vnvyvu.github.io/GI_Sprite/characterSkill/'+data["Name"].toLowerCase()+'/'+obj["Icon"]+'.png')
            .addField(langObj[1164736193].toUpperCase(), ':small_blue_diamond:'+langObj[2537361669])
            .addField(obj["NameTextMapHash"].replace(': ', '-'), obj["DescTextMapHash"]||'---')
        }),
        //talent-constellation
        ...(data["SkillsId"]["Talents"]||[]).map((obj, i)=>{
            if(!obj) return new Discord.MessageEmbed().addField(langObj[334233881].toUpperCase(), ':small_blue_diamond:'+(i+1)).addField('404', lang[1][g.language]||lang[1]['en']);
            return new Discord.MessageEmbed()
            .setThumbnail('https://vnvyvu.github.io/GI_Sprite/characterSkill/'+data["Name"].toLowerCase()+'/'+obj["Icon"]+'.png')
            .addField(langObj[334233881].toUpperCase(), ':small_blue_diamond:'+(i+1))
            .addField(obj["NameTextMapHash"].replace(': ', '-')||'---', obj["DescTextMapHash"]||'---')
        }),
    ];
}
let unitMap={
    "F1P": "%",
    "P": "%",
    "F1": ""
};
function skillDetail(proudSkill){
    if(proudSkill=='---') return "---";
    return proudSkill["ParamDescList"].map(txt=>{
        let res=txt.split(/[\|{}]+/);
        for (let i=0;i<res.length;i++) {
            let t=res[i];
            if(t.startsWith('param')){
                let d=t.split('param')[1].split(':');
                res[i]=proudSkill["Level"].reduce((result, obj)=>{
                    if(unitMap[d[1]]=='%') result+=Math.floor(obj["ParamList"][+d[0]-1]*100)+'|';
                    else result+=Math.floor(obj["ParamList"][+d[0]-1])+'|';
                    return result;
                }, "`").replace(/.$/g, unitMap[d[1]]+'`');
            }
        }
        res[0]='__'+res[0]+'__\n';
        return res.join('');
    }).join('\n');
}
async function artifactEmbed(data, g, langObj, callback){
    let storyUrl='https://vnvyvu.github.io/GI_Sprite'+Object.entries(data["Story"]).filter(([key, value])=>key.toLowerCase().startsWith(g.language.toLowerCase()))[0][1];
    https.get(storyUrl, (res)=>{
        if(res.statusCode==200){
            let txt="";
            res.on('data', (data)=>{txt+=data});
            res.on('end', ()=>{
                callback([
                    new Discord.MessageEmbed()
                    .addField(data["affixId"]["Name"]||'---', Object.entries(data["affixId"]).filter(([key, value])=>key.match(/[0-9]+$/g)).reduce((string, [key, value], i, arr)=>{
                        //[2^0, 2^1, 2^2], [2^1]
                        if(arr.length>1){
                            return string+langObj[2650361549].replace(/\{0\}/g, 2**(i+1)).replace(/\{1\}/g, value["DescTextMapHash"])+"\n";
                        }else return string+langObj[2650361549].replace(/\{0\}/g, 2**i).replace(/\{1\}/g, value["DescTextMapHash"])+"\n";
                    }, ""), true),
                    new Discord.MessageEmbed()
                    .addField(langObj[667553201], txt)
                ]);
            });
        }
    })
}
async function weaponEmbed(data, g, langObj, callback){
    let storyUrl='https://vnvyvu.github.io/GI_Sprite'+Object.entries(data["Story"]).filter(([key, value])=>key.toLowerCase().startsWith(g.language.toLowerCase()))[0][1];
    https.get(storyUrl, (res)=>{
        if(res.statusCode==200){
            let txt="";
            res.on('data', (data)=>{txt+=data});
            res.on('end', ()=>{
                callback([
                    new Discord.MessageEmbed()
                    .addField()
                ]);
            });
        }
    })
}