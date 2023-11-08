<script setup>
import {ref, inject, computed} from 'vue'
import {getPriceArray, getPrice} from '@/Probability'
import {useItemAbility} from "@/stores/item_ability";

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

// 決定閃炫6排欄位潛能
const getProbability = () => {
    Probability.value = []
    for (let i = 0; i < 6; i++) {
        let val = Math.random()
        let content = getPrice(HexaList.value, box_list.value)
        if (val <= arr[i].legend) {
            if (!content.includes('減少所有技能冷卻時間') && !content.includes('無視') && !content.includes('怪物')) {
                if (content.includes('%')) {
                    if (content.includes('全屬')) content = content.replace('%', '10%')
                    else content = content.replace('%', '13%')

                } else {
                    content += '(傳)'
                }
            }
            Probability.value.push(content)
        } else {
            if (!content.includes('減少所有技能冷卻時間') && !content.includes('無視') && !content.includes('怪物')) {
                if (content.includes('%')) {
                    if (content.includes('全屬')) content = content.replace('%', '7%')
                    else content = content.replace('%', '10%')
                } else {
                    content += '(罕)'
                }
            } else if (content.includes('無視') || content.includes('怪物')) {
                if (content.includes('40%')) content = content.replace('40%', '30%')
                else if (content.includes('35%')) content = content.replace('35%', '30%')
            }
            Probability.value.push(content)
        }

    }
    isDice.value = true
}

const setProbability = () => {
    if (lock.value.length !== 3) {
        console.log('未選3排')
    } else {
        for (let i =0; i < store.Ability.length; i++) {
            store.Ability[i] = Probability.value[lock.value[i]]
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
        <button :disabled="isDice" @click="getProbability">使用</button>
        <button :disabled="!isDice" @click="setProbability">確定</button>
        <h1>Hexa</h1>
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
                v-for="(el, idx) of store.Ability"
                :key="`${idx}${el}`"
                class="ability"
            >
                {{ el }}
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
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