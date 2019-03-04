// 数据表管理


var TableProvider = function () {
    this.tablesMap = null
}

TableProvider._instance = null
TableProvider.getInstance = function(){
    if(!TableProvider._instance)
    {
        TableProvider._instance = new TableProvider()
    }
    return TableProvider._instance
}


TableProvider.prototype = {
    constructor: TableProvider,

    loadAllTables(completeCB,target)
    {
        if(this.tablesMap)return

        this.tablesMap = {}
        let self = this
        // load all JSONs in "resources/tables/"
		cc.loader.loadResDir(g_resource.tablePath, function (err, objects, urls) {
            if(err) 
            {
                console.error("load config error",err);
                return;
            }
                
            for(let i = 0; i < objects.length; ++i)
            {
                var data = objects[i];
                var url = urls[i];
                self.tablesMap[url] = data
            }
        
            self.init()

            if(completeCB)completeCB.call(target)
		});
    },
    init()
    {
        let tableDatas = this.tablesMap[g_resource.levelTable]
        for(let i = 35; i < 200; ++i)
        {
            let model = tableDatas[i]
            if(model)
            {
                g_config.levelCount = i
            }else
            {
                break
            }
        }
    },
    // 获取表
    getTable (url)
    {
        return this.tablesMap[url]
    },
    // 获取数据
    getData(url,id)
    {
        let tableDatas = this.tablesMap[url]
        if(tableDatas)
            return tableDatas[id]

        return null
    },
}

module.exports = TableProvider;    
