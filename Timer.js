// 定时器

var Timer = function () {
    this.timers = [];//
    this.invalidTimers = [];//无效的
}

Timer._instance = null
Timer.getInstance = function(){
    if(!Timer._instance)
    {
        Timer._instance = new Timer()
    }
    return Timer._instance
}

Timer.prototype = {
    constructor: Timer,

    // 启动计时器
    schedule (target,callback,interval,repeatTimes)
    {
        var timer = this.getEntry()
        if(timer)
        {
            timer._interval = interval;
            cc.warn("计时器重复了")
        }else{
            timer = {}
            
            timer.invalid = false

            timer._interval = interval;
            timer._elapsed = 0;

            timer._target = target;
            timer._callback = callback;

            timer._timesExecuted = 0;
            if(repeatTimes){
                timer._repeat = repeatTimes;
                timer._runForever = false;
            }else{
                timer._runForever = true;
                timer._repeat = 99999;
            }

            this.timers.push(timer)
        }
    },
    scheduleOnce(target,callback,interval)
    {
        this.schedule(target,callback,interval,1)
    },
    // 取消计时器
    unschedule(target,callback)
    {
        var timer = this.getEntry(target,callback)
        if(timer)
        {
            timer.invalid = true
            this.invalidTimers.push(timer)
        }
    },

    // 取消所有
    unscheduleAll()
    {
        this.timers = [];//
        this.invalidTimers = [];//无效的
    },

    // 时间更新
    tick(dt)
    {
        for(let i = this.timers.length - 1; i >= 0; --i)
        {
            let timer = this.timers[i]
            if(!timer.invalid)
            {
                timer._elapsed += dt

                if(timer._elapsed >= timer._interval){
                    // timer._elapsed -= timer._interval;
                    timer._elapsed = 0

                    if(timer._target){
                        timer._callback.call(timer._target);
                    }else{
                        timer._callback();
                    }
                    ++timer._timesExecuted;
                    if(!timer._runForever && timer._timesExecuted >= timer._repeat){
                        timer.invalid = true
                        this.invalidTimers.push(timer)
                    }
                }
            }
        }

        // 处理无效计时器
        if(this.invalidTimers.length > 0)
        {
            for(let k in this.invalidTimers){
               let timer = this.invalidTimers[k] 
               let index = this.timers.indexOf(timer)
               if(index != -1)
               {
                   this.timers.splice(index,1)
               }
            }
            this.invalidTimers = []
        }
    },

    // 获取有效的entry
    getEntry(target,callback)
    {
        for(let k in this.timers)
        {
            let timer = this.timers[k]
            if(!timer.invalid &&timer._target == target && timer._callback == callback)
            {
                return timer
            }
        }
        return null
    }
}

module.exports = Timer;
