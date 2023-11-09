<script setup>
import {ref, inject, computed} from 'vue'
import {getPriceArray, getPrice} from '@/Probability'
import {useItemAbility} from "@/stores/item_ability";

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

// 閃炫機率
const arr = [
    {
        'legend': 1,
        'rare': 0
    },
    {
        'legend': 0.2,
        'rare': 0.8
    },
    {
        'legend': 0.15,
        'rare': 0.85
    },
    {
        'legend': 1,
        'rare': 0
    },
    {
        'legend': 0.2,
        'rare': 0.8
    },
    {
        'legend': 0.15,
        'rare': 0.85
    }
]

const Probability = ref([])

const isDice = ref(false)

const getRandom = () => {
    return Math.round(Math.random() * 1000) / 1000
}

// 決定閃炫6排欄位潛能
const getProbability = () => {
    store.cubeNumObj[props.cube_name] += 1
    Probability.value = []
    for (let i = 0; i < 6; i++) {
        const val = getRandom()
        let itemList = val <= arr[i].legend ? legendList.value : rareList.value
        let item_list = val <= arr[i].legend ? legend_list.value : rare_list.value
        let content = getPrice(itemList, item_list)

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

        Probability.value.push(content)
    }
    isDice.value = true
}

const setProbability = () => {
    if (lock.value.length !== 3) {
        console.log('未選3排')
    } else {
        for (let i = 0; i < store.Ability[props.cube_item].length; i++) {
            store.Ability[props.cube_item][i] = Probability.value[lock.value[i]]
        }
        isDice.value = false
        lock.value = []

    }
}

// 紀錄選擇哪三排
const lock = ref([])
const lockAbility = (idx) => {
    const lockIdx = lock.value.findIndex(el => el === idx)
    if (lockIdx !== -1) {
        lock.value.splice(lockIdx, 1)
    } else if (lock.value.length < 3) {
        lock.value.push(idx)
    }
}

</script>


<template>
    <div class="Hexacube">
        <div class="cubeButton">
            <button :disabled="isDice" @click="getProbability">使用</button>
            <button :disabled="!isDice" @click="setProbability">確定</button>
        </div>
        <h1>{{ cube_name }}方塊</h1>
        <div>顆數 : {{ store.cubeNumObj[props.cube_name] }}</div>
        <div class="cubeBox" v-if="isDice">
            <div
                v-for="(el, idx) of Probability"
                :key="`${idx}${el}`"
                class="ability"
                :class="{ active: lock.findIndex(el => el === idx) >= 0 }"
                @click="lockAbility(idx)"
            >
                {{ el }}
            </div>
        </div>
        <div class="cubeBox" v-else>
            <div
                v-for="(el, idx) of store.Ability[props.cube_item]"
                :key="`${idx}${el}`"
                class="ability"
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
        cursor: pointer;

    }

    .active {
        background-color: rgba(0, 0, 0, 0.2);
    }
}
</style>