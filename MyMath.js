// 帧同步
var MyMath = {
    sinTable : [0,17,35,52,70,87,105,122,139,156,174,191,208,225,242,259,276,292,309,326,342,358,375,391,407,423,438,454,469,485,500,515,530,545,559,574,588,602,616,629,643,656,669,682,695,707,719,731,743,755,766,777,788,799,809,819,829,839,848,857,866,875,883,891,899,906,914,921,927,934,940,946,951,956,961,966,970,974,978,982,985,988,990,993,995,996,998,999,999,1000,1000],
    // 生成sinTable
    generateSinTable()
    {
        let table = []
        for(let i = 0; i <= 90; ++i)
        {
            let radians = cc.misc.degreesToRadians(i)
            let floatValue = Math.sin(radians) * 1000
            let intValue = Math.round(floatValue)
            table.push(intValue)
        }
        let str = '[' + table.join() + ']'
        cc.log(str)
    },
    sin(angle)
    {
        if(angle != parseInt(angle))
        {
            cc.error('sin() angle is not integer')
            return 0
        }

        if(angle < 0)angle += 360
        angle %= 360
        if(angle == 0)return 0

        // 象限
        let quadrant = Math.ceil(angle <= 90)
        switch(quadrant)
        {
            case  1:
                return MyMath.sinTable[angle]
            case  2:
                return MyMath.sinTable[180 - angle]
            case  3:
                return -MyMath.sinTable[angle - 180]
            case  4:
                return -MyMath.sinTable[360 - angle]
        }
    },
    cos(angle)
    {
        return MyMath.sin(angle + 90)
    },
    tan(angle)
    {
        return MyMath.divide(MyMath.sin(angle), MyMath.cos(angle))
    },
};

window.MyMath = MyMath
module.exports = MyMath;
