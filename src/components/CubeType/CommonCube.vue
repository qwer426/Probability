<script setup>
import {ref, computed, watch, inject} from 'vue'
import {useItemAbility} from "@/stores/item_ability";
import {getPrice, getPriceArray} from "@/Probability";

const data = inject('data')

const props = defineProps({
    cubeName: 'String',
    cubeItem: 'String',
})

const store = useItemAbility()


const isUseCube = computed(() => {
    return store.cubeNumObj[props.cubeName] === 0
})

// 目前使用哪個部位 傳說機率
const legendList = computed(() => {
    return data.value.legend[props.cubeItem].map(el => ({
        item: el.item,
        probability: el[props.cubeName],
    }))
})

// 目前使用哪個部位 罕見機率
const rareList = computed(() => {
    return data.value.rare[props.cubeItem].map(el => ({
        item: el.item,
        probability: el[props.cubeName],
    }))
})

// 單抽機率
const legend_list = computed(() => getPriceArray(legendList.value))
const rare_list = computed(() => getPriceArray(rareList.value))

const newArr = ref(['', '', ''])

// 一般方塊
const normal = [
    {
        "legend": 1,
        "rare": 0
    },
    {
        "legend": 0.2,
        "rare": 0.8
    },
    {
        "legend": 0.05,
        "rare": 0.95
    }
]
// 新對等方塊只會出傳說潛能
const Equality = [
    {
        "legend": 1,
        "rare": 0,
    },
    {
        "legend": 1,
        "rare": 0,
    },
    {
        "legend": 1,
        "rare": 0,
    }
]

const currArr = computed(() => {
    if (props.cubeName === '新對等') {
        return Equality
    }
    return normal
})

const idx = ref(-1)

watch(() => props.cubeName, () => {
    idx.value = -1
})

const setIndex = (e, index) => {
    if (props.cubeName !== '恢復') return
    // 點擊潛能列 若 idx >= 0 且 點擊 同一列 則取消標示
    if (idx.value >= 0 && idx.value === index) {
        idx.value = -1
    } else {
        idx.value = index
    }

}


const getRandom = () => {
    return Math.round(Math.random() * 1000) / 1000
}

// 其他方塊
function setOtherItem() {
    store.cubeNumObj[props.cubeName] += 1
    store.Ability[props.cubeItem] = []

    // 每列 隨機取潛能值
    for (let i = 0; i < 3; i++) {
        // 決定潛能 為 傳說 or 罕見 潛能
        const val = getRandom()
        let itemList = val <= currArr.value[i].legend ? legendList.value : rareList.value
        let item_list = val <= currArr.value[i].legend ? legend_list.value : rare_list.value

        let content = getPrice(itemList, item_list)
        // 閃耀鏡射 20%機率可以複製第一排 允許重複3排潛能
        if (props.cubeName === '閃耀鏡射' && i === 1) {
            const newVal = getRandom()
            if (newVal <= 0.2) {
                content = store.Ability[props.cubeItem][0]
            }
        }
        if (props.cubeName !== '閃耀鏡射') {
            const preventRepeat = key => {
                if (store.Ability[props.cubeItem].filter(el => el.includes(key)).length === 2) {
                    let newContent = content
                    while (newContent === content) {
                        newContent = getPrice(itemList, item_list)
                    }
                    content = newContent
                }
            }
            preventRepeat('怪物')
            preventRepeat('無視')
            preventRepeat('道具')
        }
        store.Ability[props.cubeItem].push(content)
    }
}
// 設定 恢復方塊 潛能
// 遊戲內可以鎖定一排潛能
function setLockItem() {
    store.cubeNumObj[props.cubeName] += 1
    newArr.value = ['', '', '']
    let normalArr = [0, 1, 2]

    // 透過 normalArr & idx 排除鎖定列
    normalArr = normalArr.filter(el => el !== idx.value)
    newArr.value[idx.value] = store.Ability[props.cubeItem][idx.value]

    // 每列 隨機取潛能值
    for (let i = 0; i < normalArr.length; i++) {
        // 決定潛能 為 傳說 or 罕見 潛能
        const val = getRandom()
        let itemList = val <= currArr.value[i].legend ? legendList.value : rareList.value
        let item_list = val <= currArr.value[i].legend ? legend_list.value : rare_list.value

        let content = getPrice(itemList, item_list)
        const preventRepeat = key => {
            if (store.Ability[props.cubeItem].filter(el => el.includes(key)).length === 2) {
                let newContent = content
                while (newContent === content) {
                    newContent = getPrice(itemList, item_list)
                }
                content = newContent
            }
        }
        preventRepeat('怪物')
        preventRepeat('無視')
        preventRepeat('道具')

        newArr.value.splice(i, 1, content)
    }
}

function setItem() {
    if (props.cubeName === '恢復') {
        setLockItem()
    } else {
        setOtherItem()
    }
}

function resetArr() {
    newArr.value = ['', '', '']
}

function setAbility() {
    store.Ability[props.cubeItem] = newArr.value
    resetArr()
}

function resetCubeNum () {
    store.resetCubeNum(props.cubeName)
}


</script>


<template>
    <div class="Hexacube">
        <div class="cubeButton">
            <button @click="setItem">使用</button>
            <button :disabled="isUseCube" @click="resetCubeNum">重置顆數</button>
        </div>
        <h1>{{ cubeName }}方塊</h1>
        <div>顆數 : {{ store.cubeNumObj[props.cubeName] }}</div>
        <div class="cubeBox">
            <div
                v-for="(el, index) of store.Ability[props.cubeItem]"
                class="ability"
                :key="`${index}${el}`"
                :class="{active : index === idx, isH: props.cubeName === '恢復'}"
                @click="setIndex($event, index)"
            >
                {{ el }}
            </div>
            <div v-if="newArr.filter(el => !!el).length" class="holeArea" @click="resetArr"></div>
        </div>
        <div class="cubeBox" v-if="newArr.filter(el => !!el).length">
            <div
                v-for="(el, index) of newArr"
                class="ability"
                :class="{isH: props.cubeName === '恢復'}"
                :key="`${index}${el}`"
            >
                {{ el }}
            </div>
            <div v-if="newArr.filter(el => !!el).length" class="holeArea" @click="setAbility"></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.cubeButton {
    width: 100%;
    display: flex;
    justify-content: center;
}

.cubeBox {
    border: 1px solid #333;
    padding: 5px;
    position: relative;

    .ability {
        padding: 0 10px;
    }

    .active {
        background-color: rgba(0, 0, 0, 0.2);
    }

    .isH {
        cursor: pointer;
    }

    .holeArea {
        position: absolute;
        top: 0;
        left: 0;
        order: 2;
        width: 100%;
        height: 100%;
        cursor: pointer;
    }
}

.cubeBox + .cubeBox {
    margin-top: 10px;
}
</style>