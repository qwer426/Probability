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

const arr = [
    {
        "legend": 0.15,
        "rare": 0.85,
        "set": 0.3333
    },
    {
        "legend": 0.15,
        "rare": 0.85,
        "set": 0.666
    },
    {
        "legend": 0.15,
        "rare": 0.85,
        "set": 0.999
    }
]

// 是否可使用方塊
const isHaveChance = ref(0)

const setProbability = ref(null)

const idx = computed(() => {
    return setProbability.value ? arr.findIndex(el => el.set >= setProbability.value) : null
})

const getRandom = () => {
    return Math.round(Math.random() * 1000) / 1000
}

const getProbability = () => {
    setProbability.value = getRandom()
    store.cubeNumObj[props.cube_name] += 1
    if (isHaveChance.value === 0) isHaveChance.value += 1
}

const setItem = () => {
    // 決定潛能 為 傳說 or 罕見 潛能
    let val = getRandom()
    let itemList = val <= 0.15 ? legendList.value : rareList.value
    let item_list = val <= 0.15 ? legend_list.value : rare_list.value
    let content = getPrice(itemList, item_list)
    isHaveChance.value -= 1

    // 防止 3無 3boss 3道具

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

    // 處理潛能數值顯示
    if (idx) {
        store.Ability[props.cube_item][idx.value] = content
    }
}

</script>


<template>
    <div class="Hexacube">
        <div class="cubeButton">
            <button @click="getProbability">再一次</button>
            <button :disabled="!isHaveChance" @click="setItem">使用</button>
        </div>
        <h1>{{ cube_name }}方塊</h1>
        <div>顆數 : {{ store.cubeNumObj[props.cube_name] }}</div>
        <div class="cubeBox">
            <div
                v-for="(el, index) of store.Ability[props.cube_item]"
                class="ability"
                :key="`${index}${el}`"
                :class="{ active: idx === index }"
            >
                {{ el }}
            </div>
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

    .ability {
        padding: 0 10px;

    }

    .active {
        background-color: rgba(0, 0, 0, 0.2);
    }
}
</style>