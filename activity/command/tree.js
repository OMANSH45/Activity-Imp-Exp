let fs=require("fs");
let path=require("path");

let types = {
    media: [".mp4", ".mkv"],
    archives: ['.zip', '.7z', '.rar', '.tar', '.gz', '.ar', '.iso', ".xz"],
    documents: ['.docx', '.doc', '.pdf', '.xlsx', '.xls', '.odt', '.ods', '.odp', '.odg', '.odf', '.txt', '.ps', '.tex'],
    app: ['.exe', '.dmg', '.pkg', ".deb"]
}

function tree(src){
    if(src==undefined){
        src=process.cwd();
        }
    treeHelper(src,"");
        return "tree command executed with path "+"\""+src+"\"";
    }
function treeHelper(src,indent){
    let isFile=fs.lstatSync(src).isFile();
    if(isFile==true){
        let fileName=path.basename(src);
        console.log(indent+"|--"+fileName);

    }else{
        let dirName=path.basename(src);
        console.log(indent+"|__"+dirName+"\t");
        let allEntities=fs.readdirSync(src);
        for(let i=0;i<allEntities.length;i++){
            let newPath=path.join(src,allEntities[i]);
            treeHelper(newPath,indent+"\t");
        }

}

}   

// function tree(src){
//     if(src==undefined){
//         src=process.cwd();
//     }

//     let allEntities=fs.readdirSync(src);
//     let parentFolderName=path.basename(src);

//     let completePath="|__"+parentFolderName;
//     for(let i=0;i<allEntities.length;i++){
//         let statusOfPath=fs.lstatSync(path.join(src,allEntities[i]));
//         if(statusOfPath.isDirectory()){
//             let newPath="C:\\Users\\omansh\\Desktop\\Activity imp_exp\\randomFolder";
//             newPath=path.join(newPath,allEntities[i]);
//             completePath=completePath+"\n\t"+"|--"+allEntities[i];
//             tree(newPath);
//         }else{
//             completePath=completePath+"\n\t"+"|--"+allEntities[i];
//         }
//     }
//     console.log(completePath);

//     return "tree command executed with path "+"\""+src+"\"";
// }

module.exports={
    fxn:tree
}
