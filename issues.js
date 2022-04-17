const request = require("request");
const cheerio = require("cheerio");
const path=require("path");
const fs=require("fs");
const pdfkit=require("pdfkit");
function getAllIssues(url,folderName,fileName) {
    request(url, cb);
    function cb(err, res, body) {
        if (err) {
            console.log(err);
        }
        else if (res.statusCode == 404) {
            console.log("Page not found");
        }
        else {
            // console.log("Page found");
            getIssues(body);
        }
    }
    function getIssues(html) {
        let selecTool = cheerio.load(html);
        let issuesarr = selecTool(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");

        let arr=[];
        for(let i=0;i<8;i++){
            let link=selecTool(issuesarr[i]).attr("href");
            // console.log(link);
            arr[i]=link;
        }
        let folderPath=path.join(__dirname,folderName,);
            console.log(folderPath);
        if (!fs.existsSync(folderPath)){
            fs.mkdirSync(folderPath);
        }
        let filePath=path.join(folderName,fileName+".pdf");
        console.log(filePath);
        let data=JSON.stringify(arr);
        let pdfDoc=new pdfkit();
        pdfDoc.pipe(fs.createWriteStream(filePath));
        pdfDoc.text(data);
        pdfDoc.end();
        // fs.writeFileSync(filePath);
        
    }
}
module.exports = {
    getAllIssues: getAllIssues
}