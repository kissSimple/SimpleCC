// 声音管理器


var SoundManager = function () {
    this.bMute = false
    this.bgMusicAudioID = null
    this.bgMusic = null
}

SoundManager._instance = null
SoundManager.getInstance = function(){
    if(!SoundManager._instance)
    {
        SoundManager._instance = new SoundManager()
    }
    return SoundManager._instance
}


SoundManager.prototype = {
    constructor: SoundManager,

    // 静音
    mute()
    {
        if(!this.bMute)
        {
            this.bMute = true
            if(this.bgMusicAudioID != null)
            {
                cc.audioEngine.setVolume(this.bgMusicAudioID,0);
            }
        }
    },
    // 恢复声音
    unmute()
    {
           if(this.bMute)
        {
            this.bMute = false
            if(this.bgMusicAudioID != null)
            {
                cc.audioEngine.setVolume(this.bgMusicAudioID,1);
            }
        } 
    },

    // 播放背景音乐  背景音乐只有一个并且循环播放
    playBackgroundMusic(bgMusicPath)
    {
        if(this.bgMusic != bgMusicPath)
        {
            if(this.bgMusicAudioID != null)// 停掉之前的背景音乐
            {
                cc.audioEngine.stop(this.bgMusicAudioID);
                this.bgMusicAudioID = null
            }

            this.bgMusic = bgMusicPath
            this.bgMusicAudioID = cc.audioEngine.play(cc.url.raw("resources/" + bgMusicPath) + '.mp3',true,1)
            if(this.bMute)
            {
                cc.audioEngine.setVolume(this.bgMusicAudioID,0);
            }
        }
    },

    // 播放音效  短促不循环
    playEffect(filePath)
    {
        if(this.bMute)return

        cc.audioEngine.play(cc.url.raw("resources/" + filePath) + '.mp3',false,1)
    },

    // 预加载
    preload(path)
    {
        cc.audioEngine.preload(cc.url.raw("resources/" + path) + '.mp3');
    },
}

module.exports = SoundManager;
