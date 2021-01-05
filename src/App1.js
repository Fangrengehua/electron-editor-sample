//不依赖本地文件，自定义文件树节点
import React from 'react'
import TabsControl from 'tab-code-editor'
import Ztree from 'file-ztree'
//import Terminal from './Terminal'
import Terminal from 'react-terminal1'
import './globalstyles.css'

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
            count: 0
        }
        //this.ztree=React.createRef()
    }
    componentDidMount() {
        const _this = this;
        document.onkeydown = function () {
            var oEvent = window.event;
            if (oEvent.keyCode === 83 && oEvent.ctrlKey) {  //ctrl+s
                let cur_code = _this.tab_control.getValue();
                let path = _this.ztree.getSelectedFiles().filePath;
                inifiles[path].code = cur_code;
                console.log("你按下了ctrl+s", path);
                //_this.props.configure.saveValue(cur_code)
                oEvent.preventDefault();
            }
        }

    }
    readFile(filepath) {
        return new Promise((resolve, reject) => {
            if (1 < 2) {
                resolve(inifiles[filepath].code)
            } else {
                reject("error")
            }
        })
    }
    tab_configure = {
        title: {
            show_title: true,
            //content:'sss'
        },
        tabClick: (tab) => {
            this.ztree.selectFile(tab.id);
            return new Promise((resolve, reject) => {
                if (1 < 2) {
                    resolve()
                } else {
                    reject("保存失败！")
                }
            })
        },
        tabClose: (tab, active_tab) => {
            //console.log("tabClose", tab)
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
    }
    handleOnMouseDown(e) {
        var targetDiv = document.getElementById('tree')
        var vResizeDiv = document.querySelector('.h-resize')
        var rResizeDiv = document.querySelector('.tabsControl')
        var targetDivWidth = targetDiv.offsetWidth
        const _this = this
        var startX = e.clientX
        document.onmousemove = function (e) {
            e.preventDefault()
            var distX = Math.abs(e.clientX - startX)
            if (e.clientX > startX) {
                targetDiv.style.width = targetDivWidth + distX + 'px'
                vResizeDiv.style.left = targetDivWidth + distX + 'px'
                rResizeDiv.style.marginLeft = targetDivWidth + distX + 2 + 'px'
                // if (_this.tab_control.monaco.current)
                // {_this.tab_control.monaco.current.editor.layout()}
            }
            if (e.clientX < startX) {
                targetDiv.style.width = (targetDivWidth - distX) + 'px'
                vResizeDiv.style.left = (targetDivWidth - distX) + 'px'
                rResizeDiv.style.marginLeft = (targetDivWidth - distX) + 2 + 'px'
                // if (_this.tab_control.monaco.current)
                // {_this.tab_control.monaco.current.editor.layout()}
            }
            // 最大高度，也可以通过css  max-height设置
            if (parseInt(targetDiv.style.width) >= 700) {
                targetDiv.style.width = 700 + 'px'
                vResizeDiv.style.left = 700 + 'px'
                rResizeDiv.style.marginLeft = 702 + 'px'
            }
            if (parseInt(targetDiv.style.width) <= 250) {
                targetDiv.style.width = 250 + 'px'
                vResizeDiv.style.left = 250 + 'px'
                rResizeDiv.style.marginLeft = 252 + 'px'
            }
        }
        document.onmouseup = function () {
            document.onmousemove = null
        }
    }
    render() {
        const configure = {
            error: false,
            errorCallBack: () => {
                console.log("error");
            },
            addFile: (parentFolder, newFile) => {
                console.log("APP configure file _source", newFile)
                console.log("APP configure parentNode是：", parentFolder)
                var tab = {
                    id: newFile.tId,
                    name: newFile.filename,
                    value: "new file",
                    filepath: newFile.filePath
                };
                this.tab_control.openInTab(tab);
                var file = {
                    [newFile.filePath]: {
                        //code: tab.value
                        code: "new file"
                    }
                };
                Object.assign(inifiles, file)
                return new Promise((resolve, reject) => {
                    //let num = Math.round(Math.random() * 10);
                    if (1 < 2) {
                        resolve();
                    } else {
                        reject();
                    }
                })
            },
            addFolder: (parentFolder, newFolder) => {
                console.log("APP configure folder _source", newFolder)
                console.log("APP configure parentNode是：", parentFolder)

                return new Promise((resolve, reject) => {
                    let num = Math.round(Math.random() * 10);
                    if (num % 2 === 0) {
                        console.log(num);
                        resolve();
                    } else {
                        console.log(num);
                        reject();
                    }
                })
            },
            rename: (beforeFile, afterFile) => {
                var tabs = this.state.tabs
                var index;
                for (let i = 0; i < tabs.length; i++) {
                    if (tabs[i].id === afterFile.tId) {
                        tabs[i].name = afterFile.filename;
                        //tabs[i].filepath = afterFile.filePath;
                        this.tab_control.tabReset(afterFile.filename, i)
                        index = i;
                        break;
                    }
                }
                //var language = this.tab_control.setLanguage(afterFile.filename)
                //this.tab_control.setEditorLanguage(index, language)
                console.log(tabs[index])
                //this.tab_control.tabReset(afterFile.filename,index)
                return new Promise((resolve, reject) => {
                    //let num = Math.round(Math.random() * 10);
                    if (1 < 2) {
                        resolve();
                    } else {
                        reject();
                    }
                })
            },
            remove: (fileNode) => {
                //console.log("APP remove _source", fileNode);
                var tabs = this.state.tabs
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
            },
            clickFile: (fileNode) => {
                // console.log("APP clickFile _source", fileNode);
                if (!fileNode.isFolder) { //点击文件
                    var tab = {
                        id: fileNode.tId,
                        name: fileNode.filename,
                        value: inifiles[fileNode.filePath].code,
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
        };

        return (
            <div className="App">
                <Ztree
                    configure={configure}
                    filetree={filetree}
                    onRef={(ref) => { this.ztree = ref; }}
                    onMouseDown={this.handleOnMouseDown}
                // ref={this.ztree}
                />
                <div className="h-resize" onMouseDown={e => { this.handleOnMouseDown(e) }}></div>
                <div className="right">
                    <TabsControl
                        theme="vs-dark"
                        tabs={this.state.tabs}
                        readFile={this.readFile}
                        onRef={(ref) => { this.tab_control = ref; }}
                        configure={this.tab_configure}
                        width="300px"
                        height="100%"
                    />
                </div>

            </div>
        );
    }
}


