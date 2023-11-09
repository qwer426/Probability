<script setup>
import {ref, computed} from 'vue'
import {inject} from "vue";
import {useItemAbility} from "@/stores/item_ability";
import {getPrice, getPriceArray} from "@/Probability";

const data = inject('data')

const props = defineProps({
    cube_name: 'String',
    cube_item: 'String',
})

const store = useItemAbility()


// 目前使用哪個部位 傳說機率
const legendList = computed(() => {
    return data.value.legend[props.cube_item].map(el => ({
        item: el.item,
        probability: el[props.cube_name],
    }))
})

// 目前使用哪個部位 罕見機率
const rareList = computed(() => {
    return data.value.rare[props.cube_item].map(el => ({
        item: el.item,
        probability: el[props.cube_name],
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
    if (props.cube_name === '新對等') {
        return Equality
    }
    return normal
})

const idx = ref(-1)

const setIndex = (e, index) => {
    if (props.cube_name !== '恢復') return
    if (idx.value >= 0 && idx.value === index) {
        idx.value = -1
    } else {
        idx.value = index
    }

}


const getRandom = () => {
    return Math.round(Math.random() * 1000) / 1000
}

function setOtherItem() {
    store.cubeNumObj[props.cube_name] += 1
    store.Ability[props.cube_item] = []
    for (let i = 0; i < 3; i++) {
        const val = getRandom()
        let itemList = val <= currArr.value[i].legend ? legendList.value : rareList.value
        let item_list = val <= currArr.value[i].legend ? legend_list.value : rare_list.value

        let content = getPrice(itemList, item_list)

        if (props.cube_name === '閃耀鏡射' && i === 1) {
            const newVal = getRandom()
            if (newVal <= 0.2) {
                content = store.Ability[props.cube_item][0]
            }
        }
        if (props.cube_name !== '閃耀鏡射') {
            const preventRepeat = key => {
                if (store.Ability[props.cube_item].filter(el => el.includes(key)).length === 2) {
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
        store.Ability[props.cube_item].push(content)
    }
}

function setLockItem() {
    store.cubeNumObj[props.cube_name] += 1
    newArr.value = ['', '', '']
    let normalArr = [0, 1, 2]

    normalArr = normalArr.filter(el => el !== idx.value)
    newArr.value[idx.value] = store.Ability[props.cube_item][idx.value]

    for (let i = 0; i < normalArr.length; i++) {
        const val = getRandom()
        let itemList = val <= currArr.value[i].legend ? legendList.value : rareList.value
        let item_list = val <= currArr.value[i].legend ? legend_list.value : rare_list.value

        let content = getPrice(itemList, item_list)
        const preventRepeat = key => {
            if (store.Ability[props.cube_item].filter(el => el.includes(key)).length === 2) {
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
    if (props.cube_name === '恢復') {
        setLockItem()
    } else {
        setOtherItem()
    }
}

function resetArr() {
    newArr.value = ['', '', '']
}

function setAbility() {
    store.Ability[props.cube_item] = newArr.value
    resetArr()
}

</script>


<template>
    <div class="Hexacube">
        <div class="cubeButton">
            <button @click="setItem">使用</button>
        </div>
        <h1>{{ cube_name }}方塊</h1>
        <div>顆數 : {{ store.cubeNumObj[props.cube_name] }}</div>
        <div class="cubeBox">
            <div
                v-for="(el, index) of store.Ability[props.cube_item]"
                class="ability"
                :key="`${index}${el}`"
                :class="{active : index === idx, isH: props.cube_name === '恢復'}"
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
                :class="{isH: props.cube_name === '恢復'}"
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