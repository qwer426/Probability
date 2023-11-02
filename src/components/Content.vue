<script setup>
import { RouterView, useRoute } from  'vue-router'
import { ref, onMounted } from "vue";
const jsonData = ref([]);

const route = useRoute()
const fetchData = async () => {
    try {
        const response = await fetch('../../public/products.json');
        if (response.ok) {
            jsonData.value = await response.json();
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
</script>

<template>
    <section class="main">
        <div class="list">
            <h3>機率表</h3>
            <div class="list_item" v-for="(el, index) of jsonData[route.name]" :key="`${index}${el.item}`">
                <span class="title">{{ el.item }}</span>
                <span class="probability">({{ (el.probability * 100).toFixed(2) }}%)</span>
            </div>
        </div>
        <section>
            <RouterView v-if="route.name === 'apple'" :data="jsonData[route.name]" :data_box="jsonData['apple_box']"/>
        </section>
    </section>
</template>


<style lang="scss" scoped>
.main{
    width: 100%;
    display: flex;
    .list {
        text-align: center;
        height: 100vh;
        overflow-y: auto;
        h3{
            font-weight: 700;
            text-align: center;
            border-bottom: 1px solid #333;
        }
    }
    > section{
        width: 100%;
        display: flex;
        justify-content: center;
        max-width: 1280px;
    }
}
.main{
    .list {
        width: 30%;
        max-width: 300px;
        border: 1px solid #333;
    }
}
</style>