let {fs} = require('../global.js'), clone = require('rfdc')(), flatten=require('flat'), unflatten=require('flat').unflatten;
let txtDir='./assets/', langDir='./assets/language/';
let paths=fs.readdirSync(txtDir).filter(f=>f.endsWith('.json')), data={};
for (const f of paths) {
    data[f.split('.json')[0]]=JSON.parse(fs.readFileSync(txtDir+f));
}
module.exports={
    readCharacter: async function(queryString, lang){
        let langObj=JSON.parse(fs.readFileSync(langDir+'Text'+lang.toUpperCase()+'.json'));
        //get character, find character data
        let character=Object.entries(data['characters']).find(([cId, cVal])=>langObj[cVal['Name']].toLowerCase().includes(queryString.toLowerCase()));
        //character=[ID, Object data], character[1]=Object data
        //if character is found, get relevant data
        if(character){
            //deepCopy itself to avoid exception
            character=clone(character).flat();
            //map lang
            character[1]=mapLanguage(character[1], langObj);

            //get Skills
            character[1]['SkillsId']=mapLanguage(clone(data['characterSkills'][character[1]['SkillsId']]||{}), langObj);
            //get AvatarPromote
            character[1]['AvatarPromoteId']=mapLanguage(clone(data['charactersPromote'][character[1]['AvatarPromoteId']]), langObj);
            //get AvatarInfoId
            character[1]['AvatarInfoId']=mapLanguage(clone(data['charactersInfo'][character[1]['AvatarInfoId']])||{}, langObj);

            return [...character, langObj];
        }
        return character;
    },
    readArtifact: async function(queryString, lang){
        let langObj=JSON.parse(fs.readFileSync(langDir+'Text'+lang.toUpperCase()+'.json'));
        //get artifact, find character data
        let artifact=Object.entries(data['artifacts']).find(([cId, cVal])=>langObj[cVal['NameTextMapHash']].toLowerCase().includes(queryString.toLowerCase()));
        if(artifact){
            //deepCopy itself to avoid exception
            artifact=clone(artifact).flat();
            //map lang
            artifact[1]=mapLanguage(artifact[1], langObj);

            //get affixes
            artifact[1]['affixId']=mapLanguage(clone(data['affixes'][artifact[1]['affixId']]||{}), langObj);

            return [...artifact, langObj];
        }
        return artifact;
    }
};
function mapLanguage(obj, langObj){
    //hash id properties
    let propertyNames=['Name', 'Description', 'AvatarNativeTextMapHash', 'NameTextMapHash', 'DescTextMapHash', 'TitleTextMapHash', 'TypeDescTextMapHash', 'InteractionTitleTextMapHash', 'EffectDescTextMapHash', 'SpecialDescTextMapHash', 'AvatarVisionBeforTextMapHash', 'AvatarConstellationBeforTextMapHash', 'AvatarTitleTextMapHash', 'AvatarDetailTextMapHash', 'CvChineseTextMapHash', 'CvJapaneseTextMapHash', 'CvEnglishTextMapHash', 'CvKoreanTextMapHash', 'AvatarVisionAfterTextMapHash', 'AvatarConstellationAfterTextMapHash', 'PropType', 'TextMapContentTextMapHash', 'EquipType'];
    //list of hash id properties
    let listPropertyNames=['ParamDescList'];
    let flatObj=flatten(obj);
    for (let key of Object.keys(flatObj)) {
        //check key is one of properties, if true mapping depend on langObj, replace some unexcept words
        if(propertyNames.includes(key.split('.').pop())) flatObj[key]=langObj[flatObj[key]].replace(/(\\n)/g, '\n').replace(/(<([^>]+)>)/gi, '__');
        if(listPropertyNames.includes(key.split('.').slice(-2)[0])){
            flatObj[key]=langObj[flatObj[key]];
        }
    }
    return unflatten(flatObj);
}