<script setup>
import { ref, onMounted, computed} from 'vue';
import { getPrice } from '@/Probability'
const jsonData = ref([]);

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

// 大獎機率
const probability = computed(() => {
    if (big_price.value === 0 || total.value === 0) {
        return 0
    } else {
        return big_price.value / total.value
    }
})


const fetchData = async () => {
    try {
        const response = await fetch('../../public/apple.json');
        if (response.ok) {
            jsonData.value = await response.json();
            apple.value = jsonData.value.apple
            apple_box.value = jsonData.value.apple_box
        } else {
            console.error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
onMounted(() => {
    fetchData();
});

const getSinglePrice = () => {
    apple_item.value = getPrice(apple)
    total.value += 1

}
const getHunPrice = () => {
    apple_price.value = []
    for (let i = 0; i < 100; i++) {
        apple_price.value.push(getPrice(apple))
    }
    big_price.value += apple_price.value.filter(el => el === '黑翼胸章').length
    total.value += 100

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
        <div>
            <button @click="getSinglePrice">dice</button>
            <button @click="getHunPrice">dice for 100</button>
            <button @click="clearCLick">clear</button>
        </div>
        <div>
            大獎: {{ big_price }}
            單抽: {{ apple_item }}
            總抽: {{ total }}
            機率: {{ probability }}
        </div>
        <div>百抽:</div>
        <div v-for="(el, index) of apple_price" :key="`${index}${el}`">
            <div>{{el}}</div>
        </div>
    </div>
</template>

<style>
@media (min-width: 1024px) {
    .about {
        min-height: 100vh;
    }
}
</style>
