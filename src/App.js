//根据本地文件目录生成文件树节点
import React from 'react'
import TabsControl from 'tab-code-editor'
import Ztree from 'file-ztree'
import Terminal from 'react-terminal1'
import './globalstyles.css'

const file = window.file
const OPENDIR = 'E:/workspace/sandpack/tab-editor-test/src' //指定打开的文件目录
const filetree = file.geFileList(OPENDIR) //生成指定目录的文件树节点
export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      count: 0,
      isShowTerminal:false,
    }
  }
  componentDidMount() {
    const _this = this;
    //console.log(this.tab_control.monaco.current.editor.layout)
    window.onresize = function () {
      if (_this.tab_control.monaco.current) {
        _this.tab_control.monaco.current.editor.layout()
      }
      if (_this.terminal) {
        _this.terminal.layout()
      }
    }
    document.onkeydown = function () {
      var oEvent = window.event;
      if (oEvent.keyCode === 83 && oEvent.ctrlKey) {  //ctrl+s
        let cur_code = _this.tab_control.getValue();
        let path = _this.ztree.getSelectedFiles().filePath;
        file.writeFile(OPENDIR+path,cur_code)
        //inifiles[path].code = cur_code;
        //console.log("你按下了ctrl+s", cur_code);
        oEvent.preventDefault();
      }
      if (oEvent.keyCode === 192 && oEvent.ctrlKey) {
        if (_this.state.isShowTerminal) { //显示
          _this.setState({ isShowTerminal: false })
        } else { //关闭
          //var topDiv = document.querySelector('.tabsControl')
          //topDiv.style.bottom = 0 + 'px'
          _this.setState({ isShowTerminal: true })
        }
        oEvent.preventDefault();
      }
    }
  }
  horizontalResize(e,minWidth,maxWidth) {
    var leftDiv = document.getElementById('tree')
    var hResizeDiv = document.querySelector('.h-resize')
    var rightDiv = document.querySelector('.right')
    var leftDivWidth = leftDiv.offsetWidth
    const _this = this
    var startX = e.clientX
    document.onmousemove = function (e) {
      e.preventDefault()
      var distX = Math.abs(e.clientX - startX)
      if (e.clientX > startX) {
        leftDiv.style.width = leftDivWidth + distX + 'px'
        hResizeDiv.style.left = leftDivWidth + distX + 'px'
        rightDiv.style.left = leftDivWidth + distX + 2 + 'px'
      }
      if (e.clientX < startX) {
        leftDiv.style.width = (leftDivWidth - distX) + 'px'
        hResizeDiv.style.left = (leftDivWidth - distX) + 'px'
        rightDiv.style.left = (leftDivWidth - distX) + 2 + 'px'
      }
      // 最大高度，也可以通过css  max-height设置
      if (parseInt(leftDiv.style.width) >= maxWidth) {
        leftDiv.style.width = maxWidth + 'px'
        hResizeDiv.style.left = maxWidth + 'px'
        rightDiv.style.left = maxWidth+2 + 'px'
      }
      if (parseInt(leftDiv.style.width) <= minWidth) {
        leftDiv.style.width = minWidth + 'px'
        hResizeDiv.style.left = minWidth + 'px'
        rightDiv.style.left = minWidth+2 + 'px'
      }
      if (_this.tab_control.monaco.current) {
        _this.tab_control.monaco.current.editor.layout()
      }
    }
    document.onmouseup = function () {
      document.onmousemove = null
    }
  }
  verticalResize(e, minHeight, maxHeight) {
    const _this = this;
    //var topDiv = document.querySelector('.tabsControl')
    var bottomDiv = document.getElementById('terminal-container')
    var vResizeDiv = document.querySelector('.v-resize')
    var bottomDivHeight = bottomDiv.offsetHeight

    var startY = e.clientY
    document.onmousemove = function (e) {
      e.preventDefault()
      var distY = Math.abs(e.clientY - startY)
      if (e.clientY < startY) {
        bottomDiv.style.height = bottomDivHeight + distY + 'px'
        vResizeDiv.style.bottom = bottomDivHeight + distY + 'px'
        //topDiv.style.bottom = bottomDivHeight + distY +2+ 'px'
      }
      if (e.clientY > startY) {
        bottomDiv.style.height = (bottomDivHeight - distY) + 'px'
        vResizeDiv.style.bottom = (bottomDivHeight - distY) + 'px'
        //topDiv.style.bottom = (bottomDivHeight - distY) + 2 + 'px'
      }
      // 最大高度，也可以通过css  max-height设置
      if (parseInt(bottomDiv.style.height) >= maxHeight) {
        bottomDiv.style.height = maxHeight + 'px'
        vResizeDiv.style.bottom = maxHeight + 'px'
      }
      if (parseInt(bottomDiv.style.height) <= minHeight) {
        bottomDiv.style.height = minHeight + 'px'
        vResizeDiv.style.bottom = minHeight + 'px'
      }
      //resize code-deitor and terminal
      if (_this.tab_control.monaco.current) {
        _this.tab_control.monaco.current.editor.layout()
      }
      _this.terminal.layout()
    }
    document.onmouseup = function () {
      document.onmousemove = null
    }
  }
  closeTerminal() {
    document.getElementById('terminal-container').style.visibility = 'hidden'
    document.querySelector('.v-resize').style.visibility = 'hidden'
  }
  readFile(filepath) {
    return new Promise((resolve, reject) => {
      if (1 < 2) {
        let code = file.readFile(OPENDIR+filepath)
        resolve(code)
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
    // var file = {
    //   [newFile.filePath]: {
    //     code: "tab.value"
    //   }
    // };
    // Object.assign(inifiles, file)
    file.writeFile(OPENDIR+newFile.filePath,'')
    var tab = {
      id: newFile.tId,
      name: newFile.filename,
      filepath:newFile.filePath
    };
    var tabs = this.tab_control.openInTab(tab);
    this.setState({ tabs: tabs })
    
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
    file.mkdir(OPENDIR + newFolder.filePath)
    return new Promise((resolve, reject) => {
      if (1<2) {
        resolve();
      } else {
        reject();
      }
    })
  }
  // rename = (beforeFile, afterFile) => {
  //   console.log("APP configure rename _source:", afterFile)
  //   console.log("APP configure rename oldsource", beforeFile);

  //   let oldpath = OPENDIR + beforeFile.filePath
  //   let newpath = OPENDIR + afterFile.filePath
  //   file.renameFile(oldpath, newpath)
    
  //   var tabs = this.state.tabs
  //   var index;
  //   for (let i = 0; i < tabs.length; i++) {
  //     if (tabs[i].id === afterFile.tId) {
  //       tabs[i].name = afterFile.filename;
  //       //tabs[i].filepath = afterFile.filePath;
  //       this.tab_control.tabReset(afterFile.filename, i)
  //       index = i;
  //       break;
  //     }
  //   }
  //   return new Promise((resolve, reject) => {
  //     //let num = Math.round(Math.random() * 10);
  //     if (1 < 2) {
  //       resolve();
  //     } else {
  //       reject();
  //     }
  //   })
  // }
  rename=(beforeFile, afterFile) => {
    var tabs = this.state.tabs
    for (let i = 0; i < tabs.length; i++) {
        if (tabs[i].id === afterFile.tId) {
            tabs[i].name = afterFile.filename;
            tabs[i].filepath = afterFile.filePath;
            tabs = this.tab_control.tabReset(tabs[i])
            this.setState({tabs:tabs})
            break;
        }
    }
    let oldpath = OPENDIR + beforeFile.filePath
    let newpath = OPENDIR + afterFile.filePath
    file.renameFile(oldpath, newpath)
    
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
    if (fileNode.isFolder) {
      file.deleteFolder(OPENDIR + fileNode.filePath)
    }
    else {
      file.deleteFile(OPENDIR + fileNode.filePath)
    }
    
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].id === fileNode.tId) {
        tabs = this.tab_control.tabClose(tabs[i])
        this.setState({ tabs: tabs })
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
      //tabs.push(tab)
      tabs = this.tab_control.openInTab(tab)
      this.setState({ tabs: tabs })
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
        />
        <div className="h-resize" onMouseDown={event => { this.horizontalResize(event,250,700) }}></div>
        <div className="right">
          <TabsControl
            tabs={this.state.tabs}
            readFile={this.readFile}
            onRef={(ref) => { this.tab_control = ref; }}
            configure={tab_configure}
            theme="vs-dark"
          />
          <div className="v-resize"
            onMouseDown={event => { this.verticalResize(event, 200, 800) }}
            style={this.state.isShowTerminal ? { visibility: "visible" } : { visibility: "hidden" }} 
          ></div>
           <div id="terminal-container"
            style={this.state.isShowTerminal ? { visibility: "visible" } : { visibility: "hidden" }} >
              <div className="showBtn">
                  <span onClick={() => {
                      this.closeTerminal()
                  }}> 关闭终端 </span>
              </div>
              <Terminal host="localhost:8080" onRef={(ref) => { this.terminal = ref; }} />
            </div>
          </div>
      </div>
    );
  }
}


