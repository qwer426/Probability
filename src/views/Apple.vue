<script setup>
import { ref, onMounted, computed} from 'vue';
import { getPrice } from '@/Probability'

const props = defineProps({
    data: 'Array',
    data_box: 'Array'
})

// 單抽機率表
const apple =  ref([]);
// 單抽獎品
const apple_item = ref('')
// 百抽獎品
const apple_price =  ref([]);
// 金箱機率表
const apple_box =  ref([]);
// 金箱獎品
const apple_box_item = ref('')


// 機率相關
const big_price = ref(0) // 大獎
const total = ref(0) // 總量
const box_total = ref(0)

// 大獎機率
const probability = computed(() => {
    if (big_price.value === 0 || total.value === 0) {
        return 0
    } else {
        return big_price.value / total.value
    }
})

const getSinglePrice = () => {
    apple_item.value = getPrice(props.data)
    total.value += 1
    box_total.value += 1
    if (apple_item.value === '黑翼胸章')  big_price.value += 1

}
const getHunPrice = () => {
    apple_price.value = []
    for (let i = 0; i < 100; i++) {
        apple_price.value.push(getPrice(props.data))
    }
    big_price.value += apple_price.value.filter(el => el === '黑翼胸章').length
    total.value += 100
    box_total.value += 100
}

const getSingleBox = () => {
    const val = box_total.value / 100
    console.log('val', val)
    if (val >= 1) {
        apple_box_item.value = getPrice(props.data_box)
        box_total.value -= 100
        if (apple_box_item.value === '黑翼胸章')  big_price.value += 1
    } else {
        apple_box_item.value = '不足百抽'
    }
}

const clearCLick = () => {
    apple_price.value = []
    apple_item.value = ''
    big_price.value = 0
    total.value = 0
}

</script>


<template>
    <div class="about">
        <h3>diceeeee~</h3>
        <div class="buttonGroup">
            <button class="btn" @click="getSinglePrice">單抽</button>
            <button class="btn" @click="getHunPrice">百抽</button>
            <button class="btn" @click="getSingleBox">金箱</button>
            <button class="btn" @click="clearCLick">清除</button>
        </div>
        <div>
            大獎: {{ big_price }}
            總抽: {{ total }}
            機率: {{ probability }}
        </div>
        <div>
            單抽: {{ apple_item }}
        </div>
        <div>
            金箱: {{ apple_box_item }}
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
