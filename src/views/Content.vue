<script setup>
import {RouterLink, RouterView, useRoute} from 'vue-router'
import { ref, onMounted, computed } from "vue";
const jsonData = ref([]);


const route = useRoute()

const target = computed(() => {
    let arr = []
    switch (route.name) {
        case 'pet':
            arr = ['兔子鼓手寵物', '玩具鴨寵物', '木馬士兵寵物']
            break;
        case 'hair':
            arr = ['黑色微亂捲捲髮型', '黑色美娜髮型']
            break;
    }
    return arr
})

const path_data = computed(() => {
    let name = ''
    switch (route.name) {
        case 'apple':
            name = 'products'
            break;
        case 'pet':
            name = 'PetRandomBox'
            break;
        case 'hair':
            name = 'RandomHair'
            break;
    }
    return `../../public/${name}.json`
})

const fetchData = async () => {
    try {
        const response = await fetch(path_data.value);
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
    fetchData()
});
</script>

<template>
    <section class="main_nav" v-if="route.name === 'lottery'">
        <nav class="menu">
            <ul>
                <li @click="fetchData()">
                    <RouterLink class="nav_link" to="/lottery/apple">apple</RouterLink>
                </li>
                <li @click="fetchData()">
                    <RouterLink class="nav_link" to="/lottery/pet">Pet</RouterLink>
                </li>
                <li @click="fetchData()">
                    <RouterLink class="nav_link" to="/lottery/hair">hair</RouterLink>
                </li>
            </ul>
        </nav>
    </section>
    <section class="main" v-else>
        <div class="list">
            <h3>機率表</h3>
            <div class="list_item" v-for="(el, index) of jsonData[route.name]" :key="`${index}${el.item}`">
                <span class="title">{{ el.item }}</span>
                <span class="probability">({{ (el.probability * 100).toFixed(2) }}%)</span>
            </div>
        </div>
        <div>
            <RouterView v-if="route.name === 'apple'" :data="jsonData[route.name]" :data_box="jsonData['apple_box']"/>
            <RouterView v-else :data="jsonData[route.name]" :target="target"/>
        </div>
        <div style="width: 30%; max-width: 300px;"></div>
    </section>
</template>


<style lang="scss" scoped>
.main{
    width: 100%;
    display: flex;
    justify-content: space-between;
    .list {
        width: 30%;
        max-width: 300px;
        border: 1px solid #333;
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
.main_nav{
    display: flex;
    justify-content: center;
    .menu {
        width: 100%;
        max-width: 640px;
        ul {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            grid-column-gap: 10px;
            grid-row-gap: 10px;

            li {
                list-style: none;
                background: #5c5c5c;
                &:hover{
                    background: rgba(92, 92, 92, 0.7);
                }
                .nav_link{
                    display: block;
                    width: 100%;
                    height: 100%;
                    padding: 15px;
                    text-align: center;
                    text-decoration: none;
                    font-size: 24px;
                    color: #fff;
                }
            }
        }
    }
}
</style>