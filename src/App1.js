import React from 'react'
import TabsControl from 'tab-code-editor'
import Ztree from 'file-ztree'
import Terminal from './Terminal'
import './globalstyles.css'

//this.monacoInstance.layout({width:11,height:22})
const filetree = [
  {
    filename: "pNode0 1",
    isFolder: true,
    extend: true,
    subdirectory: [
      {
        filename: "pNode1 1",
        isFolder: true,
        extend: false,
        subdirectory: [
          {
            filename: "sNode11 1.js",
            isFolder: false,
          },
          {
            filename: "sNode11 2.html",
            isFolder: false,
          },
          {
            filename: "sNode11 3.css",
            isFolder: false,
          }
        ]
      }
    ]
  },
  {
    filename: "pNode0 2",
    isFolder: true,
    extend: false,
    subdirectory: []
  },
  {
    filename: "sNode0 3.js",
    isFolder: false,
  }
]
//const filetree = file.geFileList(OPENDIR)
var inifiles = { //左侧文件树内容
    '/pNode0 1/pNode1 1/sNode11 1.js': {
        code: "document.body.innerHTML = `<div>sNode 111.js</div>`",
    },
    '/pNode0 1/pNode1 1/sNode11 2.js': {
        code: "document.body.innerHTML = `<div>sNode 112.js</div>`",
    },
    '/pNode0 1/pNode1 1/sNode11 2.html': {
        code: "document.body.innerHTML = `<div>sNode 112.html</div>`",
    },
    '/pNode0 1/pNode1 1/sNode11 3.css': {
        code: "document.body.innerHTML = `<div>sNode 113.css</div>`",
    },
    '/sNode0 3.js': {
        code: "document.body.innerHTML = `<div>/sNode0 3.js</div>`",
    },
    '/sNode0 4.js': {
        code: "document.body.innerHTML = `<div>/sNode0 3.js</div>`",
    }
};
export default class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            tabs: [],
            count: 0,
            isShowTerminal: false,
        }
    }
    componentDidMount() {
        const _this = this;
        document.onkeydown = function () {
            var oEvent = window.event;
            if (oEvent.keyCode === 83 && oEvent.ctrlKey) {  //ctrl+s
                let cur_code = _this.tab_control.getValue();
                let path = _this.ztree.getSelectedFiles().filePath;
                //file.writeFile(OPENDIR + path, cur_code)
                inifiles[path].code = cur_code;
                console.log("你按下了ctrl+s", cur_code);
                oEvent.preventDefault();
            }
            if (oEvent.keyCode === 192 && oEvent.ctrlKey) {
                if (_this.state.isShowTerminal) {
                    _this.setState({ isShowTerminal: false })
                } else {
                    _this.setState({ isShowTerminal: true })
                }
                oEvent.preventDefault();
            }
        }
    }
    handleOnMouseDown(e) {
        var targetDiv = document.getElementById('terminal-container')
        var xtermDiv = document.querySelector(".xterm-screen")
        // var tabsDiv = document.querySelector(".tabsControl")
        var targetDivHeight = targetDiv.offsetHeight

        var startY = e.clientY
        document.onmousemove = function (e) {
            e.preventDefault()
            var distY = Math.abs(e.clientY - startY)
            if (e.clientY < startY) {
                targetDiv.style.height = targetDivHeight + distY + 'px'
                xtermDiv.style.height = targetDiv.style.height
                // tabsDiv.style.height = document.body.offsetHeight - (targetDivHeight + distY)+'px'
            }
            if (e.clientY > startY) {
                targetDiv.style.height = (targetDivHeight - distY) + 'px'
                xtermDiv.style.height = targetDiv.style.height
                // tabsDiv.style.height = document.body.offsetHeight + (targetDivHeight - distY)+'px'
            }
            // 最大高度，也可以通过css  max-height设置
            if (parseInt(targetDiv.style.height) >= 700) {
                targetDiv.style.height = 700 + 'px'
                xtermDiv.style.height = 700 + 'px'
            }
        }
        document.onmouseup = function () {
            document.onmousemove = null
        }

    }

    readFile(filepath) {
        return new Promise((resolve, reject) => {
            if (1 < 2) {
                // let code = file.readFile(OPENDIR + filepath)
                // resolve(code)
                resolve(inifiles[filepath].code)
            } else {
                reject("error")
            }
        })
    }
    tabClick = (tab) => {
        //console.log("sd", this.ztree.getSelectedFiles())
        this.ztree.selectFile(tab.id);
        return new Promise((resolve, reject) => {
            if (1 < 2) {
                resolve()
            } else {
                reject("保存失败！")
            }
        })
    }
    tabClose = (tab, active_tab) => {
        console.log("tabClose", tab)
        if (active_tab) {
            this.ztree.selectFile(active_tab.id);
        }
        return new Promise((resolve, reject) => {
            //this.tab_control.openInTab && this.tab_control.openInTab(tab)
            //window.confirm("sf")
            if (1 < 2) {
                resolve()
            } else {
                reject("保存失败！")
            }
        })
    }
    addFile = (parentFolder, newFile) => {
        console.log("APP configure file _source", newFile)
        console.log("APP configure parentNode是：", parentFolder)
        var file = {
          [newFile.filePath]: {
            code: "tab.value"
          }
        };
        Object.assign(inifiles, file)
        //file.writeFile(OPENDIR + newFile.filePath, '')
        var tab = {
            id: newFile.tId,
            name: newFile.filename,
            filepath: newFile.filePath
        };
        this.tab_control.openInTab(tab);

        return new Promise((resolve, reject) => {
            //let num = Math.round(Math.random() * 10);
            if (1 < 2) {
                resolve();
            } else {
                reject();
            }
        })
    }
    addFolder = (parentFolder, newFolder) => {
        console.log("APP configure folder _source", newFolder)
        console.log("APP configure parentNode是：", parentFolder)
        //file.mkdir(OPENDIR + newFolder.filePath)
        return new Promise((resolve, reject) => {
            if (1 < 2) {
                resolve();
            } else {
                reject();
            }
        })
    }
    rename = (beforeFile, afterFile) => {
        console.log("APP configure rename _source:", afterFile)
        console.log("APP configure rename oldsource", beforeFile);

        // let oldpath = OPENDIR + beforeFile.filePath
        // let newpath = OPENDIR + afterFile.filePath
        // file.renameFile(oldpath, newpath)

        var tabs = this.state.tabs
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].id === afterFile.tId) {
                tabs[i].name = afterFile.filename;
                this.tab_control.tabReset(tabs[i])
                break;
            }
        }
        return new Promise((resolve, reject) => {
            //let num = Math.round(Math.random() * 10);
            if (1 < 2) {
                resolve();
            } else {
                reject();
            }
        })
    }
    remove = (fileNode) => {
        //console.log("APP remove _source", fileNode);
        var tabs = this.state.tabs
        // if (fileNode.isFolder) {
        //     file.deleteFolder(OPENDIR + fileNode.filePath)
        // }
        // else {
        //     file.deleteFile(OPENDIR + fileNode.filePath)
        // }

        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].id === fileNode.tId) {
                this.tab_control.tabClose(tabs[i])
                break;
            }
        }
        return new Promise((resolve, reject) => {
            if (1 < 2) {
                resolve();
            } else {
                reject();
            }
        })
    }
    clickFile = (fileNode) => {
        console.log("APP clickFile _source", fileNode);
        if (!fileNode.isFolder) { //点击文件
            var tab = {
                id: fileNode.tId,
                name: fileNode.filename,
                filepath: fileNode.filePath
            }
            var tabs = [...this.state.tabs]
            tabs.push(tab)
            this.setState({ tabs: tabs })
            this.tab_control.openInTab(tab)
        }
        return new Promise((resolve, reject) => {
            if (1 < 2) {
                //console.log(num);
                resolve();
            } else {
                //console.log(num);
                reject();
            }
        })
    }
    render() {
        const tab_configure = {
            title: {
                show_title: true,
                content: 'sss'
            },
            tabClick: this.tabClick,
            tabClose: this.tabClose
        }

        const configure = {
            error: false,
            errorCallBack: () => {
                console.log("error");
            },
            addFile: this.addFile,
            addFolder: this.addFolder,
            rename: this.rename,
            remove: this.remove,
            clickFile: this.clickFile
        };

        return (
            <div className="App">
                <Ztree
                    configure={configure}
                    filetree={filetree}
                    onRef={(ref) => { this.ztree = ref; }}
                // ref={this.ztree}
                />
                <div className="right">
                    <TabsControl
                        tabs={this.state.tabs}
                        readFile={this.readFile}
                        onRef={(ref) => { this.tab_control = ref; }}
                        configure={tab_configure}
                        theme="vs-dark"
                    />
                    {/* <Terminal host="localhost:8080" /> */}
                    <Terminal host="localhost:8080" show={this.state.isShowTerminal} />
                    {/* <div id="terminal-container"
            style={this.state.isShowTerminal ? { visibility: "visible" } : { visibility: "hidden" }}
            onMouseDown={event => {
              this.handleOnMouseDown(event)
            }}
          >
            <div className="showBtn">
              <span onClick={() => {
                this.setState({ isShowTerminal: false })
              }}> 关闭终端 </span>
            </div>
            <Terminal host="localhost:8080" />
          </div> */}
                </div>
            </div>
        );
    }
}


