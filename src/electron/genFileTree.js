const fs = window.require('fs')
//import * as fs from 'fs'
//遍历文件夹，获取所有文件夹里面的文件信息
/*
 * @param path 路径
 *
 */

function geFileList(path) {
    var filesList = []; //最终文件树节点数据
    var targetObj = {}; //当前循环到的文件节点数据
    travelFile(path, filesList, targetObj);
    return filesList;
}

//遍历读取文件
function travelFile(path, filesList, targetObj) {
    var files = fs.readdirSync(path);//需要用到同步读取
    files.forEach(file => {
        var states = fs.statSync(path + '/' + file);
        if (states.isDirectory()) { //文件夹
            var item;
            if (targetObj["subdirectory"]) {
                item = {
                    filename: file,
                    isFolder: true,
                    extend: false,
                    path: path + '/' + file,
                    subdirectory: []
                };
                targetObj["subdirectory"].push(item);
            }
            else {
                item = {
                    filename: file,
                    isFolder: true,
                    extend: false,
                    path:path+'/'+file,
                    subdirectory: []
                };
                filesList.push(item);
            }
            travelFile(path + '/' + file, filesList, item);
        }
        else { //文件
            if (targetObj["subdirectory"]) {
                var item = {
                    filename: file,
                    isFolder: false,
                    path: path + '/' + file
                }
                targetObj["subdirectory"].push(item);
            }
            else {
                var item = {
                    filename: file,
                    isFolder:false,
                    path: path + '/' + file
                };
                filesList.push(item);
            }
        }
    });
}
//读取文件
function readFile(file) {
    //var filedata;
    return fs.readFileSync(file, 'utf-8');
}
//写入文件utf-8格式
function writeFile(fileName, data) {
    fs.writeFile(fileName, data, 'utf-8', complete);
    function complete() {
        console.log("文件生成成功");
    }
}
function renameFile(oldpath,newpath) {
    fs.renameSync(oldpath, newpath)
}
function deleteFile(path) {
    fs.unlink(path, (err) => {
        if (err) {console.log(err);return;}
        console.log(`删除文件成功`);
    })
}
function deleteFolder(path) {
    fs.readdir(path, (err, data) => {
        if (err) {console.log(err);return;}
        for (let i = 0; i < data.length; i++) {
            fs.unlink(path+`/${data[i]}`, (err) => {
                if (err) {console.log(err);return;}
                console.log(`删除文件成功`);
            })
        }
        fs.rmdir(path, (err) => {
            if (err) {console.log(err);return;}
            console.log(`删除文件夹成功`);
        })
        console.log(data);
    })
}
function mkdir(path) {
    fs.mkdir(path, (err) => {
        if (err) {console.log(err);return;}
        console.log(`创建成功`);
    })
}
window.file = {
    geFileList,
    writeFile, //异步写入文件，若存在则覆盖原文件内容，若不存在则新建文件
    readFile, //同步读取文件内容
    mkdir,
    renameFile,
    deleteFile,
    deleteFolder
}
module.exports = window.file