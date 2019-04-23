# SimpleCC

一个极简游戏框架

基于Cocos Creator V1.9.3  脚本使用的是js 

采用的是单场景的方式，整个游戏只有一个场景game.fire.

core目录下
			
EventCenter 事件的分发与监听（需要在EventTypes中定义）
			接口： on监听事件 off取消监听 dispatchEvent事件派发 once监听一次（仿照的是cocos的api）
			
Timer	定时器
			schedule启动一个计时器 scheduleOnce只生效一次 unschedule取消计时器 unscheduleAll取消所有
			
SoundManager	声音管理器
			接口：mute静音 unmute取消静音 playBackgroundMusic播放背景音乐，背景音乐只有一个并且循环播放 playEffect播放音效  短促不循环 				preload预加载

TableProvider	数据表管理
			接口：loadAllTables加载所有数据表 getTable获取表 getData获取数据


GameRoot    管理游戏核心模块 包括 EventCenter Timer SoundManager TableProvider ResourceLoader UIManager StageManager
