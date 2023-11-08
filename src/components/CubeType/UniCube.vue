<script setup>
import { ref, computed } from 'vue'
import {inject} from "vue";
import {useItemAbility} from "@/stores/item_ability";
import {getPrice, getPriceArray} from "@/Probability";

const data = inject('data')
const props = defineProps({
    cube_item: 'String',
})
const store = useItemAbility()

// 目前使用哪個部位
const HexaList = computed(() => {
    let arr = []
    for (const el of data.value[props.cube_item]) {
        arr.push({
            item: el['屬性'],
            probability: el['閃炫']
        })
    }
    return arr
})
// 單抽機率表
const box_list = computed(() => {
    return getPriceArray(HexaList.value)
})

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

const realItem = ref(['legend', 'rare', 'rare'])
const isHaveChance = ref(0)

const setProbability = ref(null)
const Probability = ref(null)

const idx = computed(() => {
    return  setProbability.value ? arr.findIndex(el => el.set >= setProbability.value) : null
})

const getRandom = () => {
    return Math.round(Math.random() * 1000) / 1000
}

const getProbability = () => {
    setProbability.value = getRandom()
    if (isHaveChance.value === 0) isHaveChance.value += 1
}

const setItem = () => {
    Probability.value = getRandom()
    let val = Math.random()
    let content = getPrice(HexaList.value, box_list.value)
    if (idx) {
        if (val <= arr[idx.value].legend) {
            if (!content.includes('減少所有技能冷卻時間') && !content.includes('無視') && !content.includes('怪物')) {
                if (content.includes('%')) {
                    if (content.includes('全屬')) content = content.replace('%', '10%')
                    else content = content.replace('%', '13%')

                } else {
                    content += '(傳)'
                }
            }
            store.Ability[idx.value] = content
        } else {
            if (!content.includes('減少所有技能冷卻時間') && !content.includes('無視') && !content.includes('怪物')) {
                if (content.includes('%')) {
                    if (content.includes('全屬')) content = content.replace('%', '7%')
                    else content = content.replace('%', '10%')
                } else {
                    content += '(罕)'
                }
            } else if (content.includes('無視') && content.includes('怪物')) {
                if (content.includes('40%')) content = content.replace('40%', '30%')
                else if (content.includes('35%')) content = content.replace('35%', '30%')
            }
            store.Ability[idx.value] = content
        }
    }
}

</script>


<template>
    <div class="Hexacube">
        <button @click="getProbability">再一次</button>
        <button :disabled="!isHaveChance" @click="setItem">使用</button>
        <h1>Uni</h1>
        <div class="cubeBox">
            <div
                v-for="(el, index) of store.Ability"
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
.cubeBox{
    border: 1px solid #333;
    padding: 5px;
    .ability {
        padding: 0 10px;

    }
    .active {
        background-color: rgba(0,0,0, 0.2);
    }
}
</style>