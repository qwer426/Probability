// 機率計算參考 https://stella-blog.coderbridge.io/2021/05/17/react/
export function getPriceArray(arr){
    let sortArr = arr.sort((a, b) => a.probability - b.probability)
    return sortArr.map((_, index) => {
        //利用 .map 做一個計數累加
        let count = 0;
        for (let i = 0; i <= index; i++) {
            count += sortArr[i].probability;
        }
        return count;
    });
}
export function getPrice(obj, weightArray){
    //用 Math.random()取得 0~1的值
    let random = Math.random() * weightArray[weightArray.length - 1];
    // 找出機率表內 最接近隨機機率的item
    const index = weightArray.findIndex(el => el >= random)
    return obj[index].item

}