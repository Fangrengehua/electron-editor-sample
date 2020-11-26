import React from 'react'
//import Ztree from './ztree/test/ztree1'
//import TabsControl from './tabscontrol/TabsControl'
import TabsControl from 'file-code-editor'
//import Ztree from 'file-ztree'

export default class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      tabs: [],
      count: 0
    }
  }
  onRef = (ref) => {
    this.tab_control = ref;
  }
  componentDidMount() {
    const _this = this;
    document.onkeydown = function () {
      var oEvent = window.event;
      if (oEvent.keyCode === 83 && oEvent.ctrlKey) {  //ctrl+s
        let cur_code = _this.tab_control.getValue();
        console.log("你按下了ctrl+s", cur_code);
        //_this.props.configure.saveValue(cur_code)
        oEvent.preventDefault();
      }
    }
  }
  tab_configure = {
    title: {
      show_title: true,
      content: 'fsd'
    },
    tabClick: (tab) => {
      console.log("tabClick", tab)
      return new Promise((resolve, reject) => {
        if (1 < 2) {
          resolve()
        } else {
          reject("保存失败！")
        }
      })
      //this.setState({ currentTabId: tab.id })
    },
    tabClose: (tab, active_tab) => {
      console.log("tabClose", tab, active_tab)
      return new Promise((resolve, reject) => {
        if (1 < 2) {
          resolve()
        } else {
          reject("保存失败！")
        }
      })
    }
  }

  genTab() {
    this.setState({ count: this.state.count + 1 })
    var tab = {
      id: this.state.count,
      name: "file" + this.state.count + ".js",
      value: "file" + this.state.count
    }
    var tabs = [...this.state.tabs]
    tabs.push(tab)
    this.setState({ tabs: tabs })

    this.tab_control.openInTab && this.tab_control.openInTab(tab)
  }
  changeTab() {
    var tabs = this.state.tabs
    var tab = {
      id: this.state.count,
      name: "file" + this.state.count,
      value: "file" + this.state.count
    }
    this.tab_control.openInTab && this.tab_control.openInTab(tabs[1])
    //this.tab_control.openInTab && this.tab_control.openInTab(tab)
    //this.setState({ currentTabId: this.state.currentTabId - 1 })
  }
  closeTab() {
    //console.log(this.tab_control.getValue())
    var tabs = this.state.tabs
    this.tab_control.tabClose && this.tab_control.tabClose(tabs[0])
  }


  render() {
    return (
      <div className="App">
        {/* <Ztree
            configure={configure}
            filetree={filetree}
          /> */}
        <TabsControl
          tabs={this.state.tabs}
          onRef={this.onRef.bind(this)}
          configure={this.tab_configure}
        />
        <div>
          <button
            onClick={
              () => { this.genTab(); }
            }>genTab</button>
          <button
            onClick={
              () => { this.changeTab() }
            }>changeTab</button>
          <button
            onClick={
              () => { this.closeTab() }
            }>closeTab</button>
        </div>

      </div>
    );
  }
}


