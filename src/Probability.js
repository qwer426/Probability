// 機率計算參考 https://stella-blog.coderbridge.io/2021/05/17/react/
export function getPrice(obj){
    let sortArr = obj.sort((a, b) => a.probability - b.probability)
    let weightArray = sortArr.map((_, index) => {
        //利用 .map 做一個計數累加
        let count = 0;
        for (let i = 0; i <= index; i++) {
            count += sortArr[i].probability;
        }
        return count;
    });
    let random = Math.random() * weightArray[weightArray.length - 1];
    //用 Math.random()取得 0~1的值
    //weightArray[weightArray.length - 1]
    //取得 weightArray 陣列長度的最後一個數
    let index;
    for (let i = 0; i <= weightArray.length; i++) {
        if (weightArray[i] >= random) {
            index = i;
            break;
        }
    }
    return obj[index].item
}