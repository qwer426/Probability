<script setup>
import { ref, computed} from 'vue';
import { getPriceArray, getPrice } from '@/Probability'
import { useBoxStore } from "@/stores/random";

const props = defineProps({
    data: 'Array',
    target: 'Array'
})


const store = useBoxStore()

// 單抽機率表
const box_list = computed(() => {
    return getPriceArray(props.data)
})

const pet_price = computed(() => {
    let res = []
    for (let item of props.target) {
        const arr = store.box_price.filter(el => el === item)
        res = res.concat(arr)
    }
    return res
})

const is_price = (pet) => {
    return props.target.includes(pet)
}

const getSinglePrice = () => {
    store.box_item = getPrice(props.data, box_list.value)
}
const getHunPrice = () => {
    store.box_price = []
    for (let i = 0; i < 100; i++) {
        store.box_price.push(getPrice(props.data, box_list.value))
    }
}
const clearCLick = () => {
    store.$reset()
}
</script>



<template>
    <div class="about">
        <h3>diceeeee~</h3>
        <div class="buttonGroup">
            <button class="btn" @click="getSinglePrice">單抽</button>
            <button class="btn" @click="getHunPrice">百抽</button>
            <button class="btn" @click="clearCLick">清除</button>
        </div>
        <div>
            單抽: {{ store.box_item }}
        </div>
        <div>
            獎數: {{ pet_price.length }}
        </div>
        <div class="content">
            <div class="item" :class="{ big: is_price(el) }" v-for="(el, index) of store.box_price" :key="`${index}${el}`">
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
            background-color: transparent;
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