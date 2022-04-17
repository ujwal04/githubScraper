const request = require("request");
const cheerio = require("cheerio");
let { getAllIssues } = require("./issues");

function getAllPages(url,folderName){
    request(url,cb);

    function cb(err,res,body){
        if(err){
            console.log("error",err);
        }else{
            getPages(body)
        }
    }
    function getPages(html) {
        let selecTool = cheerio.load(html);
        let anchorelement = selecTool(".text-bold.wb-break-word");
        // console.log(anchorelement);
        console.log(folderName);
        for (let i = 0; i < 8; i++) {
            let pagelinkArr = selecTool(anchorelement[i]).attr("href");
            let fileName=pagelinkArr.split("/")[2];
            // console.log(fileName);
            let fullUrl = "https://github.com/" + pagelinkArr + "/issues";
            // console.log(fullUrl);
            getAllIssues(fullUrl,folderName,fileName);
            // break;
        }
        console.log("*****************************************************");
    
    }
}
module.exports = {
    getAllPages: getAllPages
};