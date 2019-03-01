// 所有事件类型定义

window.g_eventTypes = {
    coreEventType: {
        showUI : "coreEventType_showUI", // 请求打开一个界面
        hideUI  : "coreEventType_hideUI",  //请求关闭一个界面
        closeAllUI  : "coreEventType_closeAllUI",  //请求关闭所有界面
        showTips : "coreEventType_showTips", // 显示一个提示

        share : "coreEventType_share", // 分享
        showVideoAd : "coreEventType_showVideoAd", // 视频广告
        showBannerAd : "coreEventType_showBannerAd", // 横幅广告
        hideBannerAd : "coreEventType_hideBannerAd", // 隐藏横幅广告

        loadStage : "coreEventType_loadStage",// 加载战斗关卡
        loadHall : "coreEventType_loadHall",// 加载大厅
    },

    //加载相关事件
    loadEvent : {
        loadResource : "loadEvent_loadResource",// 请求加载资源
        loadComplete : "loadEvent_loadComplete", // 加载资源完毕
        loadProgress : "loadEvent_loadProgress", // 加载进度更新
    },
    // 登录
    loginEvent : {
        loginRequest : "loginEvent_loginRequest",// 请求登录
        loginSuccess : "loginEvent_loginSuccess",// 登录成功
    },
    
    stageEvent : {
        loadNextStage : "coreEventType_loadNextStage",// 加载下一关
        reloadCurStage : "coreEventType_reloadCurStage",// 重新加载当前关卡
        exitStage : "coreEventType_exitStage",// 退出
        useItem : "stageEvent_useItem", // 使用道具
        stageStart : "stageEvent_stageStart", // 开始
        gameStart : "stageEvent_gameStart", // 开始
        scoreUpdate : "stageEvent_scoreUpdate", // 分数更新了
    },

    playerEvent : {
        diamondUpdate : "playerEvent_diamondUpdate",// 钻石更新
    },

    guideEvent : {
        curGuideStepFinished : "guideEvent_curGuideStepFinished", // 当前导航步骤完成
    },
};
