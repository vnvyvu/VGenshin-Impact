let {fs} = require('../global.js');
let dir='./assets/data/';
let categories=fs.readdirSync(dir, {withFileTypes: true}).filter(dirent => dirent.isDirectory()).map(dirent=>dirent.name);//artifact?character?...
function search(str, strs){
    return strs.filter(s=>s.includes(str))[0];
}
module.exports={
    read: async function(category, queryString, lang){
        //search category and item
        category=await search(category, categories);
        //get all folder names in this category
        let items=fs.readdirSync(dir+category+'/', {withFileTypes: true}).map(dirent=>dirent.name);
        //get data based on queryString
        for (const dirent of items) {
            let tempObj=JSON.parse(fs.readFileSync(dir+category+'/'+dirent+'/'+lang+'.json'));
            if(removeMark(tempObj.name, true).includes(removeMark(queryString, true))) {
                tempObj.fileName=dirent;
                return tempObj;
            }
        }
        return null;
    },
};
function removeMark(str, lowerCase) {
    if (typeof str == "string") {
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
      str = str.replace(/đ/g, "d");
      str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
      str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
      str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
      str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
      str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
      str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
      str = str.replace(/Đ/g, "D");
    }
    return lowerCase?str.toLowerCase():str;
};