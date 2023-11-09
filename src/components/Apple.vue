<script setup>
import { ref, onMounted, computed} from 'vue';
import { getPriceArray, getPrice } from '@/Probability'
import {useAppleStore} from "@/stores/apple";

const props = defineProps({
    data: 'Array',
    data_box: 'Array'
})
const store = useAppleStore()

// 單抽獎品
const apple_item = ref('')
// 百抽獎品
const apple_price =  ref([]);
// 金箱獎品
const apple_box_item = ref('')


// 大獎機率
const probability = computed(() => {
    if (store.big_price === 0 || store.total === 0) {
        return 0
    } else {
        return store.big_price / store.total
    }
})
// 金箱
const apple_box_probability = computed(() => {
    if (store.box_total === 0) {
        return 0
    } else {
        return Math.floor(store.box_total / 100)
    }
})
// 單抽機率表
const apple_list = computed(() => {
    return getPriceArray(props.data)
})
// 金箱單抽機率表
const apple_box_list = computed(() => {
    return getPriceArray(props.data_box)
})
const getSinglePrice = () => {
    apple_item.value = getPrice(props.data, apple_list.value)
    store.total += 1
    store.box_total += 1
    if (apple_item.value === '黑翼胸章')  store.big_price += 1
}
const getHunPrice = () => {
    apple_price.value = []
    for (let i = 0; i < 100; i++) {
        apple_price.value.push(getPrice(props.data, apple_list.value))
    }
    store.big_price += apple_price.value.filter(el => el === '黑翼胸章').length
    store.total += 100
    store.box_total += 100
}

const getSingleBox = () => {
    const val = store.box_total / 100
    if (val >= 1) {
        apple_box_item.value = getPrice(props.data_box, apple_box_list.value)
        store.box_total -= 100
        if (apple_box_item.value === '黑翼胸章')  store.big_price += 1
    } else {
        apple_box_item.value = '不足百抽'
    }
}

const clearCLick = () => {
    apple_price.value = []
    apple_item.value = ''
    store.$reset()
}

</script>


<template>
    <div class="about">
        <h3>diceeeee~</h3>
        <div class="buttonGroup">
            <div><button class="btn" @click="getSinglePrice">單抽</button></div>
            <div><button class="btn" @click="getHunPrice">百抽</button></div>
            <div><button class="btn" @click="getSingleBox">金箱</button></div>
            <div><button class="btn" @click="clearCLick">清除</button></div>
        </div>
        <div>
            大獎: {{ store.big_price }}
            總抽: {{ store.total }}
            機率: {{ probability }}
        </div>
        <div>
            單抽: {{ apple_item }}
        </div>
        <div>
            <div>金箱次數: {{ apple_box_probability }}</div>
            <div>金箱: {{ apple_box_item }}</div>
        </div>
        <div class="content">
            <div class="item" :class="{ big: el === '黑翼胸章' }" v-for="(el, index) of apple_price" :key="`${index}${el}`">
                <div>第{{index + 1}}抽 {{el}}</div>
            </div>
        </div>
    </div>
</template>

<style>
.about {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .buttonGroup{
        display: flex;
        flex-direction: column;
        .btn{
            width: 100px;
            border: 1px solid #333;
            border-radius: 5px;
            padding: 5px 10px;
            margin-bottom: 5px;
        }
    }
    .content {
        width: 400px;
        height: 200px;
        overflow-y: auto;
        border: 1px solid #333;
        .big{
            background-color: yellow;
        }
    }
}
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
    }
}
</style>
