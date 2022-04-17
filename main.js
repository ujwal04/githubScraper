let url = "https://github.com/topics";
const request=require("request");
const cheerio = require("cheerio");
let { getAllPages } = require("./allPages");

request(url,cb);

function cb(err,res,body){
    if(err){
        console.log("error",err);
    }else{
        handleHTML(body)
    }
}

function handleHTML(html){
    let selecTool=cheerio.load(html);
    let anchorelement = selecTool(".no-underline.flex-grow-0");
    for(let i=0;i<3;i++){
        let relativeLinkArr = selecTool(anchorelement[i]).attr("href");
        // console.log(relativeLinkArr);
        let folderName=relativeLinkArr.split("/")[2];
        // console.log(folderName);
        let fullLinkArr = "https://github.com" + relativeLinkArr; 
        // console.log(fullLinkArr);

        getAllPages(fullLinkArr,folderName)
    }
}

