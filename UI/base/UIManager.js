// 界面管理
let EventCenter = require("EventCenter")
let ResourceLoader = require("ResourceLoader")

var UIManager = function () {
    this.uiRoot = null // 根节点
    this.uiStack = [] // 已经打开的界面栈
    this.panelCache = {} // 缓存的面板
    this.classmap = {}

    let uiRoot = cc.find("Canvas/UIRoot")
    this.setUIRoot(uiRoot)

    this.registeUI()

    EventCenter.getInstance().on(g_eventTypes.coreEventType.showUI,this.showUI,this);
    EventCenter.getInstance().on(g_eventTypes.coreEventType.hideUI,this.onRequestCloseUI,this);
    EventCenter.getInstance().on(g_eventTypes.coreEventType.closeAllUI,this.closeAllUI,this);
}

UIManager._instance = null
UIManager.getInstance = function(){
    if(!UIManager._instance)
    {
        UIManager._instance = new UIManager()
    }
    return UIManager._instance
}



UIManager.prototype = {
    constructor: UIManager,

    setUIRoot(node)
    {
        this.uiRoot = node
    },
    
