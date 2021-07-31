let fs=require("fs");
let path=require("path");

let types = {
    media: [".mp4", ".mkv"],
    archives: ['.zip', '.7z', '.rar', '.tar', '.gz', '.ar', '.iso', ".xz"],
    documents: ['.docx', '.doc', '.pdf', '.xlsx', '.xls', '.odt', '.ods', '.odp', '.odg', '.odf', '.txt', '.ps', '.tex'],
    apps: ['.exe', '.dmg', '.pkg', ".deb"]
}

function organize(src){
    if(src==undefined){
        src=process.cwd();
    }
    
    let src2=path.join(src,"OrganisedFiles");
    if(fs.existsSync(src2)==false){
        fs.mkdirSync(src2);
    }
    let allEntities=fs.readdirSync(src);
    for(let i=0;i<allEntities.length;i++){
        let fileName=allEntities[i];
        let fullPath=path.join(src,fileName);
        let statusOfPath=fs.lstatSync(fullPath);
        
        if(statusOfPath.isFile()){
            let ext = path.extname(fullPath);
            if(types.media.includes(ext)){
                if(fs.existsSync(path.join(src2,"media"))==false){
                    let folderPath=path.join(src2,"media");
                    fs.mkdirSync(folderPath);
                    return ;
                }

                let copiedFilePath=path.basename(fullPath);
                let destFilePath=path.join(path.join(src2,"media"),copiedFilePath);
                fs.copyFileSync(fullPath,destFilePath);
            }else if(types.archives.includes(ext)){
                if(fs.existsSync(path.join(src2,"archives"))==false){
                let folderPath=path.join(src2,"archives");
                fs.mkdirSync(folderPath);
                }
                let copiedFilePath=path.basename(fullPath);
                let destFilePath=path.join(path.join(src2,"archives"),copiedFilePath);
                fs.copyFileSync(fullPath,destFilePath);

            }else if(types.documents.includes(ext)){
                if(fs.existsSync(path.join(src2,"documents"))==false){
                    let folderPath=path.join(src2,"documents");
                fs.mkdirSync(folderPath);
                }

                let copiedFilePath=path.basename(fullPath);
                let destFilePath=path.join(path.join(src2,"documents"),copiedFilePath);
                fs.copyFileSync(fullPath,destFilePath);

            }else if(types.apps.includes(ext)){
                if(fs.existsSync(path.join(src2,"apps"))==false){
                    let folderPath=path.join(src2,"apps");
                fs.mkdirSync(folderPath);
                }

                let copiedFilePath=path.basename(fullPath);
                let destFilePath=path.join(path.join(src2,"apps"),copiedFilePath);
                fs.copyFileSync(fullPath,destFilePath);

            }else{
                if(fs.existsSync(path.join(src2,"others"))==false){
                    let folderPath=path.join(src2,"others");
                fs.mkdirSync(folderPath);

                }
                
                let copiedFilePath=path.basename(fullPath);
                let destFilePath=path.join(path.join(src2,"others"),copiedFilePath);
                fs.copyFileSync(fullPath,destFilePath);
            }
        }
    }

    return "organize command executed with path "+"\""+src+"\"";
}

// function organize(srcPath) {
//     if (srcPath == undefined)
//         srcPath = process.cwd();
//     // console.log("organize implemneted", srcPath);
//     // 1 create organized_files -> directory
//     let organizedFilesPath = path.join(srcPath, "organized_files");
//     if (fs.existsSync(organizedFilesPath) == false) {
//         fs.mkdirSync(organizedFilesPath);
//     }
//     // 2 scan whole srcPath 
//     let allTheFiles = fs.readdirSync(srcPath);
//     // console.log(allTheFiles);
//     // 3. extension check -> classify
//     for (let i = 0; i < allTheFiles.length; i++) {
//         let fullOriginalPath = path.join(srcPath, allTheFiles[i]);
//         if (fs.lstatSync(fullOriginalPath).isFile() == true) {

//             let folderName = checkextnTellFolder(allTheFiles[i]);
//             copyFileTOdest(folderName, fullOriginalPath, srcPath);
//         }
//     }
//     //  3. copy to that folder to which it belongs
//     // folder
//     // // file copy 
//     // other
//     // // file copy  
// }
// function copyFileTOdest(folderName, fullOriginalPath, srcPath) {
//     let destFolderPath = path.join(srcPath, "organized_files",folderName);
//     if (fs.existsSync(destFolderPath) == false) {
//         fs.mkdirSync(destFolderPath);
//     }
//     let originalFileName = path.basename(fullOriginalPath);
//     let destFilePath = path.join(destFolderPath, originalFileName)
//     fs.copyFileSync(fullOriginalPath, destFilePath);
//     console.log(originalFileName, "copeid to ", folderName);

// }
// function checkextnTellFolder(fileName) {
//     let extName = path.extname(fileName);
//     extName = extName.slice(1);
//     for (let key in types) {
//         for (let i = 0; i < types[key].length; i++) {
//             if (types[key][i] == extName) {
//                 return key;
//             }
//         }
//     }
//     return "others";
// }


module.exports={
    fxn:organize
}