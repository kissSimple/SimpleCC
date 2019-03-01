// 事件的 分发 监听

var EventCenter = function () {
    this.eventMap = {};
}


EventCenter._instance = null
EventCenter.getInstance = function(){
    if(!EventCenter._instance)
    {
        EventCenter._instance = new EventCenter()
    }
    return EventCenter._instance
}

EventCenter.prototype = {
    constructor: EventCenter,

    // 监听
    on(eventName,callback,target,bOnce)
    {
        let listenerList = this.eventMap[eventName]
        if(!listenerList){
            listenerList = []
            this.eventMap[eventName] = listenerList
        }

        let listener = {}
        listener.callback = callback
        listener.target = target
        listener.bOnce = bOnce
        listener.eventName = eventName

        listenerList.push(listener)
    },
    once(eventName,callback,target)
    {
        this.on(eventName,callback,target,true)
    },
    // 取消监听
    off(eventName,callback,target)
    {
        let listenerList = this.eventMap[eventName]
        if(listenerList){
            for(let i = listenerList.length - 1; i >=0; --i)
            {
                let listener = listenerList[i]
                if(listener.callback == callback && listener.target == target)
                {
                    listenerList.splice(i,1)
                    return
                }
            }
        }
    },

    // 事件派发
    dispatchEvent(eventName, ...data)// 支持变长参数
    {
        let listenerList = this.eventMap[eventName]
        if(listenerList){
            for(let i = listenerList.length - 1; i >=0; --i)
            {
                let listener = listenerList[i]
                listener.callback.call(listener.target, ...data)
                if(listener.bOnce)
                {
                    listenerList.splice(i,1)
                }
            }
        }
    },
    
    // 下一帧派发事件
    dispatchEventNextFrame(eventName,data)
    {
        cc.error("暂未实现该接口")// fix me
    }
}

module.exports = EventCenter;
