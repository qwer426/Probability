<script setup>
import {RouterLink, RouterView, useRoute} from 'vue-router'
import {ref, computed, watch, onMounted, provide} from "vue";
const jsonData = ref([]);

provide('data', jsonData)

const route = useRoute()

const path_array = ref(['apple', 'pet', 'hair', 'cube', 'additional'])

const childItem = ref('帽子')

const currentPath = ref(route.name)

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
const path_data = ref('')

const getData = async (newName) => {
    let name = ''
    switch (newName) {
        case 'apple':
            name = 'products'
            break;
        case 'pet':
            name = 'PetRandomBox'
            break;
        case 'hair':
            name = 'RandomHair'
            break;
        case 'cube':
            name = 'legend'
            break;
        case 'additional':
            name = 'AdditionalCube'
            break;
    }
    path_data.value =  `../../public/${name}.json`
    if (newName !== 'lottery') await fetchData()
}

watch(
    () => route.name,
    async newName => {
        await getData(newName)
    }
)

const currentPathClick = (path) => {
    currentPath.value = path
}



const fetchData = async () => {
    try {
        const response = await fetch(path_data.value);
        if (response.ok) {
            jsonData.value = await response.json()
            if (route.name !== 'cube' && route.name !== 'additional') jsonData.value[route.name] = jsonData.value[route.name].sort((a, b) => a.probability - b.probability)

        } else {
            console.error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

onMounted(() => {
    getData(route.name)
})
</script>

<template>
    <section class="main_nav" v-if="route.name === 'lottery'">
        <nav class="menu">
            <ul>
                <li v-for="path of path_array" :key="path">
                    <RouterLink class="nav_link" @click="currentPathClick(path)" :to="`/lottery/${path}`">{{ path }}</RouterLink>
                </li>
            </ul>
        </nav>
    </section>
    <section class="main" v-else>
        <div class="list">
            <h3>機率表</h3>
            <div v-if="route.name !== 'cube'" class="list_item" v-for="(el, index) of jsonData[route.name]" :key="`${index}${el.item}`">
               <span class="title">{{ el.item }}</span>
               <span class="probability">({{ (el.probability * 100).toFixed(2) }}%)</span>
            </div>
            <div v-else class="list_item" v-for="(el, index) of jsonData" :key="`${index}`">
                <div>
                    {{ index }}
                </div>
            </div>
        </div>
        <div>
            <RouterView v-if="route.name === 'apple'" :data="jsonData[route.name]" :data_box="jsonData['apple_box']"/>
            <RouterView v-else v-model="childItem" :cubeType="currentPath" :data="jsonData[route.name]" :target="target"/>
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